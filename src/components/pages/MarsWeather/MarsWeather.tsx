import React from "react";
import axios from "axios";
import styled from "styled-components";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import MarsWeatherCharts from "./CurrentWeather/MarsWeatherCharts";
import Spinner from "../../../Spinner";

const Mars2020_URL = process.env.REACT_APP_MARS2020_API as string;
// console.log("Mars2020_URL:", Mars2020_URL);
const MSL_URL = process.env.REACT_APP_MSL_API as string;
// console.log("MSL_URL:", MSL_URL);
const InSight_URL = process.env.REACT_APP_InSight_API as string;
// console.log("InSight:", InSight);
const URLs = [Mars2020_URL, MSL_URL, InSight_URL];
// console.log("URLs:", URLs);

const Div = styled.div`
  width: "auto";
  height: "auto";
  left: 50%;
  transform: translate(-50%);
  margin: 0;
`;

declare interface Props {}

class MarsWeather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      PerseveranceWeather: {},
      CuriosityWeather: {},
      InSightWeather: {InSight_Weather_Data: {}, InSight_sol: undefined},
      loaded: false,
    };
  }

  InSight_fetching = (fetchObj: State) => {
    const solKeys = fetchObj?.sol_keys ?? "No Data";
    // console.log("solKeys:", solKeys, solKeys.length, typeof solKeys);
    let solKeysMax = solKeys !== "No Data" ? Math.max.apply(null, solKeys).toString() : "No Data";
    if (solKeys.length === 0) {
      solKeysMax = "No Data";
    }
    // console.log("solKeysMax:", solKeysMax);
    const result = solKeysMax !== "No Data" ? fetchObj[solKeysMax] : "No Data";
    // console.log("result:", result);
    //* Setting the State partially
    this.setState({InSightWeather: {...this.state.InSightWeather, InSight_sol: solKeysMax}});
    return result;
  };

  componentDidMount() {
    setTimeout(() => {
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
            //* Alternative version of partial setState
            // InSightWeather: {InSight_Weather_Data: marsWeatherModified.InSightWeather, InSight_sol: this.state.InSightWeather.InSight_sol},
            //* Setting the State partially
            InSightWeather: {...this.state.InSightWeather, InSight_Weather_Data: marsWeatherModified.InSightWeather},
            loaded: true,
          });
          // await console.log("this.state:", this.state);
        } catch (error) {
          console.error(error);
        }
      };

      const savedNasaData: State = JSON.parse(localStorage.getItem("fetchedDataFromNasa") as string);
      // console.log("savedNasaData:", savedNasaData);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      savedNasaData !== null
        ? (this.setState(savedNasaData), console.log("setting the State from the localStorage"))
        : (fetchMarsWeather(), console.log("fetchingMarsWeather"));
    }, 1200);
  }

  componentDidUpdate() {
    localStorage.setItem("fetchedDataFromNasa", JSON.stringify(this.state));
    // console.log("fetchedDataFromNasa was set in the localStorage");
  }

  render() {
    if (!this.state.loaded) {
      // return <div>Loading...</div>; //* Previous version
      return <Spinner />;
    }
    return (
      <>
        <div style={{position: "absolute", top: "110px", width: "100%", height: "auto"}}>
          <EarthMap />
          <MarsMap
            //@ts-ignore:
            Perseverance_Weather={this.state.PerseveranceWeather.at(-1)}
            Curiosity_Weather={this.state.CuriosityWeather.at(-1)}
            InSight_Weather={this.state.InSightWeather}
          />
        </div>
        <Div
          style={{
            position: "absolute",
            top: "1190px",
          }}
        >
          <MarsWeatherCharts
            //@ts-ignore:
            Perseverance_Weather={this.state.PerseveranceWeather}
            Curiosity_Weather={this.state.CuriosityWeather}
          />
          <br />
        </Div>
        <br />
      </>
    );
  }
}

export default MarsWeather;
