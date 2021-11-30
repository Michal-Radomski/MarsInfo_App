import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/money">Money</Link>
      </li>
      <li>
        <Link to="/covid">Covid</Link>
      </li>
      <li>
        <Link to="/weather">Weather</Link>
      </li>
    </div>
  );
};
export default Navbar;
