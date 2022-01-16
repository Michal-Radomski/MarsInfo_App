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

  // Fetching local weather data
  function fetchWeather(object) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${object.latitude}&lon=${object.longitude}&${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Weather:", data);
        setLocalWeather(data);
      });
  }

  const [localWeather, setLocalWeather] = React.useState({});

  React.useEffect(() => {
    if (props.state.location.latitude) {
      fetchWeather(positionObject);
    }
    console.log("localWeather:", localWeather);
  }, []);

  return <DivLocalWeather>Local Weather</DivLocalWeather>;
};

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, null)(LocalWeather);
