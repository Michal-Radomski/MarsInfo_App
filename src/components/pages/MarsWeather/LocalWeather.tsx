import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

import {useSelector, useDispatch} from "react-redux";
import {GET_USER_WEATHER_CONDITIONS} from "../../../redux/actions";

import WindDirection from "./Images/WindDirection.png";

const DivLocalWeather = styled.div`
  background-color: transparent;
  min-width: 400px;
  height: 390px;
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
    country_flag: location_Redux?.country_flag as string,
  };
  // console.log("positionObject:", positionObject);

  const latitude = positionObject?.latitude;
  const longitude = positionObject?.longitude;

  //* Local State is Unnecessary
  // const [localWeather, setLocalWeather] = React.useState<State>({});
  // const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  // console.log("localWeather:", localWeather, "isLoaded:", isLoaded);

  React.useEffect(() => {
    function localWeather() {
      // console.log("function localWeather was called!");
      //* Fetching local weather data
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
              speedOfWind: data.wind.speed.toFixed(1) as number,
              directionOfWind: data.wind.deg as number,
              sunrise: new Date(data.sys.sunrise * 1000).toLocaleString() as string,
              sunset: new Date(data.sys.sunset * 1000).toLocaleString() as string,
              icon: data.weather[0].icon as string,
              calculationTime: new Date(data.dt * 1000).toISOString() as string,
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
    }
    localWeather();

    // Updating weather every one hour
    setInterval(() => {
      localWeather();
    }, 3600000);
  }, [dispatch, latitude, longitude]);

  return (
    <DivLocalWeather>
      <Card border="info" style={{width: "100%", height: "100%", borderRadius: "0 0.25rem 0.25rem 0"}}>
        <Card.Header
          style={{
            color: "white",
            backgroundColor: "#0DCAF0",
            fontWeight: "bolder",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            padding: "0.25rem 1rem",
          }}
        >
          <p style={{marginBottom: 0, float: "left"}}>Current Weather At Your Location:</p>
          {weather_Redux.icon ? (
            <img
              height="60px"
              src={`https://openweathermap.org/img/wn/${weather_Redux.icon}@2x.png`}
              alt="Local Weather Conditions"
            />
          ) : (
            "No Data"
          )}
        </Card.Header>
        {Object.values(weather_Redux).some((value) => value === undefined) ? (
          <Card.Body>
            <Card.Title>Loading...</Card.Title>
            <Card.Text>Wait a moment...</Card.Text>
          </Card.Body>
        ) : (
          <Card.Body style={{padding: "0.5rem 1rem"}}>
            <Card.Title style={{fontWeight: "bold", marginBottom: "0.25rem"}}>
              {positionObject.city}, {positionObject.country}{" "}
              <img
                src={positionObject.country_flag}
                height="16px"
                alt="Country flag"
                style={{marginBottom: "5px", border: "1px solid #666"}}
              />
            </Card.Title>
            <div style={{textTransform: "capitalize"}}>
              <Card.Text style={{marginBottom: "0px"}}>
                General Description:{" "}
                <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.general_description}</span>
              </Card.Text>
              <Card.Text style={{marginBottom: "0px"}}>
                Current Temperature:{" "}
                <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.current_temp} °C</span>
              </Card.Text>
              <Card.Text style={{marginBottom: "0px"}}>
                Min/ Max Temp:{" "}
                <span style={{float: "right", fontWeight: "bold"}}>
                  {weather_Redux.min_temp}/ {weather_Redux.max_temp} °C
                </span>
              </Card.Text>
              <Card.Text style={{textTransform: "none", marginBottom: "0px"}}>
                Pressure: <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.pressure} hPa</span>
              </Card.Text>
              <Card.Text style={{marginBottom: "0px"}}>
                Humidity: <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.humidity} %</span>
              </Card.Text>
              <Card.Text style={{textTransform: "none", marginBottom: "0px"}}>
                Speed of Wind: <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.speedOfWind} m/s</span>
              </Card.Text>
              <Card.Text style={{textTransform: "none", marginBottom: "0px"}}>
                Direction of Wind:{" "}
                <img
                  src={WindDirection}
                  alt="Wind Direction"
                  width="auto"
                  height="27px"
                  style={{transform: `rotate(${180 + weather_Redux.directionOfWind}deg)`, marginBottom: "-5px"}}
                />
                <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.directionOfWind} deg </span>
              </Card.Text>
              <Card.Text style={{marginBottom: "0px"}}>
                Sunrise: <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.sunrise}</span>
              </Card.Text>
              <Card.Text style={{marginBottom: "0px"}}>
                Sunset: <span style={{float: "right", fontWeight: "bold"}}>{weather_Redux.sunset}</span>
              </Card.Text>
            </div>
          </Card.Body>
        )}
        <Card.Footer
          style={{
            color: "white",
            backgroundColor: "#0DCAF0",
            fontWeight: "bolder",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            padding: "0.25rem 1rem",
            fontSize: "80%",
          }}
        >
          <Card.Text style={{marginBottom: "0px"}}>Weather Calculation Time:</Card.Text>
          <Card.Text style={{marginBottom: "0px", fontWeight: "900"}}>
            {weather_Redux.calculationTime ? weather_Redux.calculationTime : "No Data"}
          </Card.Text>
        </Card.Footer>
      </Card>
    </DivLocalWeather>
  );
};

export default LocalWeather;
