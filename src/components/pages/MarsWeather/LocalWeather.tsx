import React from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {GET_USER_WEATHER_CONDITIONS} from "../../../redux/actions";

const DivLocalWeather = styled.div`
  background-color: lightyellow;
  min-width: 150px;
  height: 350px;
`;

//* Api Key: ${apiKey} is not hosted on GitHub.com
const apiKey = process.env.REACT_APP_OpenWeatherMap_API_KEY as string;
// console.log("apiKey:", apiKey);

const LocalWeather = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch();
  const location_Redux = useSelector((state: State) => state.location);
  console.log("location_Redux:", location_Redux);

  const positionObject = {
    latitude: location_Redux?.latitude as number,
    longitude: location_Redux?.longitude as number,
    city: location_Redux?.city as number,
    country: location_Redux?.country as number,
  };
  // console.log("positionObject:", positionObject);

  const latitude = positionObject?.latitude;
  const longitude = positionObject?.longitude;

  const [localWeather, setLocalWeather] = React.useState<State>({});
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  console.log("localWeather:", localWeather, "isLoading:", isLoaded);

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
          };
          console.log("weather_Redux:", weather_Redux);
          setIsLoaded(true);
          setLocalWeather(weather_Redux);
          dispatch({type: GET_USER_WEATHER_CONDITIONS, payload: weather_Redux});
        })
        .catch((error) => console.log(error));
    }
    fetchWeather();
  }, [dispatch, latitude, longitude]);

  return <DivLocalWeather>Local Weather</DivLocalWeather>;
};

export default LocalWeather;
