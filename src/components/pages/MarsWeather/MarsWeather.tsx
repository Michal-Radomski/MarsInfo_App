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
      marsWeather: null,
      marsWeatherLast: null,
      loaded: false,
    };
  }

  componentDidMount() {
    const fetchMarsWeather = async () => {
      try {
        // const response = await axios.all(URLs.map((url) => axios.get(url))).then((data) => {
        const response = await axios.all(URLs.map((url) => axios.get(url))).then((data) => {
          console.log("data:", data);
          return data;
        });
        await console.log("response:", response);
        const marsWeathers = await response.map((marsWeather) => marsWeather.data);
        await console.log("marsWeather:", marsWeathers);

        // const marsWeather = response.data;
        // const marsWeatherLast = response.data.sols[6];
        // console.log("marsWeather:", marsWeather);
        // console.log("marsWeatherLast:", marsWeatherLast);
        // await this.setState({marsWeather: marsWeather, marsWeatherLast: marsWeatherLast, loaded: true});
        // console.log(this.state);
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
        {/* @ts-ignore: */}
        <MarsMap weatherLast={this.state.marsWeatherLast} />
        {/* @ts-ignore: */}
        <Mars weather={this.state.marsWeather} />
      </div>
    );
  }
}

export default MarsWeather;

//+ Old version
// import React from "react";
// import axios from "axios";

// import MarsMap from "./MarsMap";
// import EarthMap from "./EarthMap";
// import Mars from "./CurrentWeather/Mars";

// const Mars2020_URL = process.env.REACT_APP_MARS2020_API as string;
// // console.log("Mars2020_URL:", Mars2020_URL);
// const MSL_URL = process.env.REACT_APP_MSL_API as string;
// // console.log("MSL_URL:", MSL_URL);
// const InSight = process.env.REACT_APP_InSight_API as string;
// // console.log("InSight:", InSight);

// declare interface Props {}

// class MarsWeather extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       marsWeather: null,
//       marsWeatherLast: null,
//       loaded: false,
//     };
//   }

//   componentDidMount() {
//     const fetchMarsWeather = async () => {
//       try {
//         const response = await axios.get(Mars2020_URL);
//         const marsWeather = response.data;
//         const marsWeatherLast = response.data.sols[6];
//         // console.log("marsWeather:", marsWeather);
//         // console.log("marsWeatherLast:", marsWeatherLast);
//         await this.setState({marsWeather: marsWeather, marsWeatherLast: marsWeatherLast, loaded: true});
//         // console.log(this.state);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMarsWeather();
//   }

//   render() {
//     if (!this.state.loaded) {
//       return <div>Loading...</div>;
//     }
//     return (
//       <div>
//         <EarthMap />
//         {/* @ts-ignore: */}
//         <MarsMap weatherLast={this.state.marsWeatherLast} />
//         {/* @ts-ignore: */}
//         <Mars weather={this.state.marsWeather} />
//       </div>
//     );
//   }
// }

// export default MarsWeather;
