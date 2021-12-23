import React from "react";
import {connect} from "react-redux";

// import {useDispatch} from "react-redux";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import {GetUserGeoDate} from "../../../redux/actions";

const MarsWeather = () => {
  // const dispatch = useDispatch();

  // const [userInfo, setUserInfo] = React.useState({});

  React.useEffect(() => {
    // fetch("https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Fetched geolocation data:", data);
    //     setUserInfo(data);
    //   });
    GetUserGeoDate();
  }, []);

  // console.log("userInfo:", userInfo);

  return (
    <div>
      <EarthMap />
      <MarsMap />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  location: state.location,
});

// export default MarsWeather;
export default connect(mapStateToProps, {GetUserGeoDate})(MarsWeather);
