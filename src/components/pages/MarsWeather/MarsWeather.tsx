import React from "react";
import {useDispatch} from "react-redux";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";

const MarsWeather = () => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = React.useState({});

  React.useEffect(() => {
    fetch("https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched geolocation data:", data);
        setUserInfo(data);
      });
  }, []);

  console.log("userInfo:", userInfo);

  return (
    <div>
      <EarthMap />
      <MarsMap />
    </div>
  );
};

export default MarsWeather;
