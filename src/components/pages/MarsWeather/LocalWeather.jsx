import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";

const DivLocalWeather = styled.div`
  background-color: lightyellow;
  min-width: 150px;
  height: 350px;
`;

//* Api Key: ${apiKey} is not hosted on GitHub.com
const apiKey = process.env.REACT_APP_OpenWeatherMap_API_KEY;
// console.log("apiKey:", apiKey);

const LocalWeather = (props) => {
  // console.log("props:", props);
  const positionObject = {
    latitude: props?.state?.location?.latitude,
    longitude: props?.state?.location?.longitude,
    city: props?.state?.location?.city,
    country: props?.state?.location?.country,
  };
  // console.log("positionObject:", positionObject);

  const latitude = positionObject?.latitude;
  const longitude = positionObject?.longitude;

  const [localWeather, setLocalWeather] = React.useState({});
  console.log("localWeather:", localWeather);

  React.useEffect(() => {
    // Fetching local weather data
    function fetchWeather() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("Weather:", data);
          setLocalWeather(data);
        });
    }
    fetchWeather();
  }, [latitude, longitude]);

  return <DivLocalWeather>Local Weather</DivLocalWeather>;
};

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, null)(LocalWeather);
