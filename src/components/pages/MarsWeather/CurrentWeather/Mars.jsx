import React from "react";

const API_KEY = process.env.REACT_APP_NASA_API_KEY; // as string;
const URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

class Mars extends React.Component {
  componentDidMount() {
    const fetchMarsWeather = async () => {
      const marsWeather = await (await fetch(URL)).json();
      console.log("marsWeather:", marsWeather);
    };
    fetchMarsWeather();
  }

  render() {
    return <div>Weather on Mars</div>;
  }
}

export default Mars;
