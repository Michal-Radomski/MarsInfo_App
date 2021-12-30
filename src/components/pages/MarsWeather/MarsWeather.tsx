import React from "react";
import axios from "axios";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import Mars from "./CurrentWeather/Mars";

const Mars2020_URL = process.env.REACT_APP_MARS2020_API as string;
// console.log("Mars2020_URL:", Mars2020_URL);

declare interface Props {}

class MarsWeather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      marsWeather: null,
      marsWeatherLast: null,
      loaded: true,
    };
    console.log(props);
  }

  componentDidMount() {
    const fetchMarsWeather = async () => {
      try {
        const response = await axios.get(Mars2020_URL);
        const marsWeather = response.data;
        const marsWeatherLast = response.data.sols[6];
        // console.log("marsWeather:", marsWeather);
        // console.log("marsWeatherLast:", marsWeatherLast);
        await this.setState({marsWeather: marsWeather, marsWeatherLast: marsWeatherLast, loaded: false});
        // console.log(this.state);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarsWeather();
  }

  render() {
    if (this.state.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <EarthMap />
        {/* @ts-ignore: */}
        <MarsMap weatherLast={this.state.marsWeatherLast} />
        {/* @ts-ignore: */}
        <Mars weather={this.state.marsWeather} />
      </div>
    );
  }
}

export default MarsWeather;
