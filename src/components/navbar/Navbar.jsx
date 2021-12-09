import React, {useEffect, useState} from "react";

import {BiMenuAltRight} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";

import classes from "./Navbar.module.scss";
import {Link, useHistory} from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const ctaClickHandler = () => {
    menuToggleHandler();
    history.push("/page-cta");
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          navbar
        </Link>
        <nav className={`${classes.header__content__nav} ${menuOpen && size.width < 768 ? classes.isMenu : ""}`}>
          <ul>
            <li>
              <Link to="/page-one" onClick={menuToggleHandler}>
                PageOne
              </Link>
            </li>
            <li>
              <Link to="/page-two" onClick={menuToggleHandler}>
                PageTwo
              </Link>
            </li>
            <li>
              <Link to="/page-three" onClick={menuToggleHandler}>
                PageThree
              </Link>
            </li>
          </ul>
          <button onClick={ctaClickHandler}>CTA Page</button>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? <BiMenuAltRight onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// import {Link} from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/money">Money</Link>
//       </li>
//       <li>
//         <Link to="/covid">Covid</Link>
//       </li>
//       <li>
//         <Link to="/weather">Weather</Link>
//       </li>
//     </div>
//   );
// };
// export default Navbar;
