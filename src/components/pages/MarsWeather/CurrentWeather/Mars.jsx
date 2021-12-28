import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_NASA_API_KEY; // as string;
const URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

const options = {weekday: "short", year: "numeric", month: "long", day: "numeric"};
const formatDate = (date) => date.toLocaleDateString(undefined, options); //-  According to local timezone and default locale

class Mars extends React.Component {
  state = {marsWeatherFetched: null, selectedSol: undefined};
  componentDidMount() {
    // async function fetchMarsWeather() { //- first version
    const fetchMarsWeather = async () => {
      try {
        const response = await axios.get(URL);
        const marsWeather = response.data;
        console.log("marsWeather:", marsWeather);
        const marsWeatherFetched = marsWeather.sol_keys.map((sol_key) => {
          return {
            sol: sol_key,
            maxTemp: marsWeather[sol_key].AT?.mx || "No Data",
            mixTemp: marsWeather[sol_key].AT?.mn || "No Data",
            windSpeed: Math.round(marsWeather[sol_key].HWS?.av) || 0,
            windDirection: marsWeather[sol_key].WD?.most_common?.compass_point || 0,
            pressure: marsWeather[sol_key].PRE?.av || "No Data",
            date: formatDate(new Date(marsWeather[sol_key].First_UTC)),
          };
        });
        // console.log("marsWeatherFetched:", marsWeatherFetched);
        this.setState({marsWeatherFetched: marsWeatherFetched, selectedSol: marsWeatherFetched.length - 1});
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarsWeather();
  }
  componentDidUpdate() {
    console.log("state:", this.state);
  }

  render() {
    return <div>Weather on Mars</div>;
  }
}

export default Mars;
