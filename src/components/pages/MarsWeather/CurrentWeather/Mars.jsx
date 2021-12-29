import React from "react";
import axios from "axios";

const Mars2020_URL = process.env.REACT_APP_MARS2020_API; //as string
// console.log("Mars2020_URL:", Mars2020_URL);

// const options = {weekday: "short", year: "numeric", month: "long", day: "numeric"};
// const formatDate = (date) => date.toLocaleDateString(undefined, options); //-  According to local timezone and default locale

class Mars extends React.Component {
  state = {marsWeather: null};
  componentDidMount() {
    // async function fetchMarsWeather() { //- first version
    const fetchMarsWeather = async () => {
      try {
        const response = await axios.get(Mars2020_URL);
        const marsWeather = response.data.sols[6];
        console.log("marsWeather:", marsWeather);
        this.setState({marsWeather: marsWeather});
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
