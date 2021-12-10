import React from "react";
import {BiMenu} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";
import {Link} from "react-router-dom";

import classes from "./Navbar.module.scss";
import Logo from "./image/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // console.log("menuOpen:", menuOpen, "size:", size);

  React.useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((booleanState) => !booleanState);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          Home
          <img src={Logo} alt="logo" />
        </Link>
        <nav className={`${classes.header__content__nav} ${menuOpen && size.width < 768 ? classes.isMenu : ""}`}>
          <ul>
            <li>
              <Link to="/money" onClick={menuToggleHandler}>
                Money
              </Link>
            </li>
            <li>
              <Link to="/covid" onClick={menuToggleHandler}>
                Covid
              </Link>
            </li>
            <li>
              <Link to="/weather" onClick={menuToggleHandler}>
                Weather
              </Link>
            </li>
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? <BiMenu onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
