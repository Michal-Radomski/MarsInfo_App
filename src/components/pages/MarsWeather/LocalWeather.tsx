import React from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {GET_USER_WEATHER_CONDITIONS} from "../../../redux/actions";

import WindDirection from "./Images/WindDirection.png";

const DivLocalWeather = styled.div`
  background-color: lightyellow;
  min-width: 320px;
  height: 350px;
`;

//* Api Key: ${apiKey} is not hosted on GitHub.com
const apiKey = process.env.REACT_APP_OpenWeatherMap_API_KEY as string;
// console.log("apiKey:", apiKey);

const LocalWeather = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch();

  //* Below the same as commented
  // const location_Redux = useSelector((state: State) => state.rootReducer.location);
  // const weather_Redux = useSelector((state: State) => state.rootReducer.weather);
  const [location_Redux, weather_Redux] = useSelector((state: State) => [
    state.rootReducer.location,
    state.rootReducer.weather,
  ]);
  // console.log("location_Redux:", location_Redux);
  // console.log("weather_Redux:", weather_Redux);

  const positionObject = {
    latitude: location_Redux?.latitude as number,
    longitude: location_Redux?.longitude as number,
    city: location_Redux?.city as number,
    country: location_Redux?.country as number,
  };
  // console.log("positionObject:", positionObject);

  const latitude = positionObject?.latitude;
  const longitude = positionObject?.longitude;

  //* Local State is Unnecessary
  // const [localWeather, setLocalWeather] = React.useState<State>({});
  // const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  // console.log("localWeather:", localWeather, "isLoaded:", isLoaded);

  React.useEffect(() => {
    // Fetching local weather data
    function fetchWeather() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("Weather:", data);

          const weather_Redux = {
            general_description: data.weather[0].description as string,
            current_temp: data.main.temp.toFixed(1) as number,
            max_temp: data.main.temp_max.toFixed(1) as number,
            min_temp: data.main.temp_min.toFixed(1) as number,
            pressure: data.main.pressure as number,
            humidity: data.main.humidity as number,
            speedOfWind: data.wind.speed as number,
            directionOfWind: data.wind.deg as number,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleString() as string,
            sunset: new Date(data.sys.sunset * 1000).toLocaleString() as string,
            icon: data.weather[0].icon as string,
          };
          // console.log("weather_Redux:", weather_Redux);
          // setIsLoaded(true);
          // setLocalWeather(weather_Redux);
          dispatch({type: GET_USER_WEATHER_CONDITIONS, payload: weather_Redux});
          localStorage.setItem("LocalWeather", JSON.stringify(weather_Redux));
        })
        .catch((error) => console.log(error));
    }

    const Local_Weather: State = JSON.parse(localStorage.getItem("LocalWeather") as string);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    Local_Weather !== null
      ? (dispatch({type: GET_USER_WEATHER_CONDITIONS, payload: Local_Weather}),
        console.log("Setting the Store from the localStorage"))
      : (fetchWeather(), console.log("fetchWeather() was called"));
  }, [dispatch, latitude, longitude]);

  return (
    <DivLocalWeather>
      {/* {console.log(
        "Are there any Undefined in weather_Redux? :",
        Object.values(weather_Redux).some((value) => value === undefined)
      )} */}
      Current Weather at your Location:
      {Object.values(weather_Redux).some((value) => value === undefined) ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Weather Description:{weather_Redux.general_description}</p>
          <img src={`https://openweathermap.org/img/wn/${weather_Redux.icon}@2x.png`} alt="Local Weather Conditions" />
          <img
            src={WindDirection}
            alt="Wind Direction"
            width="100px"
            height="auto"
            style={{transform: `rotate(${360 - weather_Redux.directionOfWind}deg)`}}
          />
        </div>
      )}
    </DivLocalWeather>
  );
};

export default LocalWeather;
