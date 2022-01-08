import React from "react";
import axios from "axios";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import Mars from "./CurrentWeather/Mars";

const Mars2020_URL = process.env.REACT_APP_MARS2020_API as string;
// console.log("Mars2020_URL:", Mars2020_URL);
const MSL_URL = process.env.REACT_APP_MSL_API as string;
// console.log("MSL_URL:", MSL_URL);
const InSight_URL = process.env.REACT_APP_InSight_API as string;
// console.log("InSight:", InSight);
const URLs = [Mars2020_URL, MSL_URL, InSight_URL];
// console.log("URLs:", URLs);

declare interface Props {}

class MarsWeather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      PerseveranceWeather: null,
      CuriosityWeather: null,
      InSightWeather: null,
      loaded: false,
    };
  }

  InSight_fetching = (fetchObj: any) => {
    const solKeys = fetchObj?.sol_keys ?? "No Data";
    // console.log("solKeys:", solKeys);
    const solKeysMax = Math.max.apply(null, solKeys).toString();
    // console.log("solKeysMax:", solKeysMax);
    const result = fetchObj[solKeysMax];
    // console.log("result:", result);
    return result;
  };

  componentDidMount() {
    const fetchMarsWeather = async () => {
      try {
        const response = await axios.all(URLs.map((url) => axios.get(url))).then((data) => {
          // console.log("data:", data);
          return data;
        });
        // await console.log("response:", response);
        const marsWeathers = await response.map((marsWeather) => marsWeather.data);
        // await console.log("marsWeathers:", marsWeathers);
        const marsWeatherModified = {
          PerseveranceWeather: marsWeathers[0].sols,
          CuriosityWeather: marsWeathers[1].soles.slice(0, 7).reverse(),
          InSightWeather: this.InSight_fetching(marsWeathers[2]),
        };
        // await console.log("marsWeatherModified:", marsWeatherModified);
        await this.setState({
          PerseveranceWeather: marsWeatherModified.PerseveranceWeather,
          CuriosityWeather: marsWeatherModified.CuriosityWeather,
          InSightWeather: marsWeatherModified.InSightWeather,
          loaded: true,
        });
        await console.log("this.state:", this.state);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarsWeather();
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <EarthMap />
        <MarsMap
          //@ts-ignore:
          Perseverance_Weather={this.state.PerseveranceWeather.at(-1)}
          Curiosity_Weather={this.state.CuriosityWeather.at(-1)}
          InSight_Weather={this.state.InSightWeather}
        />
        {/* @ts-ignore: */}
        <Mars Perseverance_Weather={this.state.PerseveranceWeather} Curiosity_Weather={this.state.CuriosityWeather} />
      </div>
    );
  }
}

export default MarsWeather;
