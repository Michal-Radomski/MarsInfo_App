import React from "react";
import {BiMenu} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";
import {Link} from "react-router-dom";

import classes from "./Navbar.module.scss";
import Logo from "./image/Logo.png";

const Navbar = (): JSX.Element => {
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
    <header className={classes.navbar}>
      <div className={classes.navbar_content}>
        <Link to="/" className={classes.navbar_content_logo}>
          <img src={Logo} alt="logo" />
          <br />
          Home
          <br />
          <div style={{fontSize: "65%", color: "palevioletred"}}>(APOD)</div>
        </Link>
        <nav className={`${classes.navbar_content_nav} ${menuOpen && size.width < 768 ? classes.isMenu : ""}`}>
          <ul>
            {size.width > 768 ? null : (
              <li>
                <Link to="/" onClick={menuToggleHandler}>
                  Home (APOD)
                </Link>
              </li>
            )}
            <li>
              <Link to="/mars" onClick={menuToggleHandler}>
                (Mars) Weather
              </Link>
            </li>
            <li>
              <Link to="/mars3d" onClick={menuToggleHandler}>
                Mars 3D
              </Link>
            </li>
            <li>
              <Link to="/pictures" onClick={menuToggleHandler}>
                Mars Pictures
              </Link>
            </li>
            <li>
              <Link to="/weather" onClick={menuToggleHandler}>
                Weather
              </Link>
            </li>
          </ul>
        </nav>
        <div className={classes.navbar_content_toggle}>
          {!menuOpen ? <BiMenu onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
