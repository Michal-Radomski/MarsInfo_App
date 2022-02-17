import React from "react";
import axios from "axios";

import Spinner from "../../../Spinner";

const API_KEY = process.env.REACT_APP_NASA_API_KEY as string;
// console.log("API_KEY:", API_KEY);

const MarsPictures = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     // console.log("fetching covidData and currencyData");
  //     const [covidByCountry, covidGlobal, rates] = await Promise.allSettled([
  //       fetch(`https://covid19.mathdro.id/api/countries/${country}`).then((response) => response.json()),
  //       fetch("https://covid19.mathdro.id/api").then((response) => response.json()),
  //       fetch(`https://open.er-api.com/v6/latest/${currency_code}`).then((response) => response.json()),
  //     ]);
  //     // console.log("covidByCountry:", covidByCountry);
  //     // console.log("covidGlobal:", covidGlobal);
  //     // console.log("rates:", rates);
  //     const result = {
  //       //@ts-ignore
  //       countryCovid: covidByCountry.value,
  //       //@ts-ignore
  //       globalCovid: covidGlobal.value,
  //       //@ts-ignore
  //       currencyRates: rates.value,
  //     };
  //     // console.log("result:", result);
  //     const covidData = {
  //       globalConfirmed: result?.globalCovid?.confirmed?.value ?? "No Data",
  //       globalDeaths: result?.globalCovid?.deaths?.value ?? "No Data",
  //       countryConfirmed: result?.countryCovid?.confirmed?.value ?? "No Data",
  //       countryDeaths: result?.countryCovid?.deaths?.value ?? "No Data",
  //       lastUpdate: result?.globalCovid?.lastUpdate || result?.countryCovid?.lastUpdate || "No Data",
  //     };
  //     const currencyData = {
  //       lastUpdate: result?.currencyRates?.time_last_update_utc ?? "No Data",
  //       to_Selected: result?.currencyRates?.rates[`${currency_code}`] ?? "No Data",
  //       to_USD: result?.currencyRates?.rates?.USD ?? "No Data",
  //       to_EURO: result?.currencyRates?.rates?.EUR ?? "No Data",
  //       to_CHF: result?.currencyRates?.rates?.CHF ?? "No Data",
  //     };
  //     // await console.log("covidData, currencyData:", covidData, currencyData);
  //     await dispatch({type: GET_COVID_DATA, payload: covidData});
  //     await dispatch({type: GET_RATES_DATA, payload: currencyData});
  //     // setting the items to the localStorage
  //     await localStorage.setItem("covidData", JSON.stringify(covidData));
  //     await localStorage.setItem("currencyData", JSON.stringify(currencyData));
  //   }

  return isLoading ? (
    <Spinner />
  ) : (
    <div style={{textAlign: "center"}}>
      <h1>NASA Pictures of Mars</h1>
      <h3>Under Construction...</h3>
    </div>
  );
};

export default MarsPictures;

// const fetchMarsWeather = async () => {
//   try {
//     const response = await axios.all(URLs.map((url) => axios.get(url))).then((data) => {
//       // console.log("data:", data);
//       return data;
//     });
//     // await console.log("response:", response);
//     const marsWeathers = await response.map((marsWeather) => marsWeather.data);
//     // await console.log("marsWeathers:", marsWeathers);
//     const marsWeatherModified = {
//       PerseveranceWeather: marsWeathers[0].sols,
//       CuriosityWeather: marsWeathers[1].soles.slice(0, 7).reverse(),
//       InSightWeather: this.InSight_fetching(marsWeathers[2]),
//     };
//     const userPosition = {
//       latitude: marsWeathers[3].latitude,
//       longitude: marsWeathers[3].longitude,
//     };
//     // await console.log("marsWeatherModified:", marsWeatherModified);
//     await this.setState({
//       PerseveranceWeather: marsWeatherModified.PerseveranceWeather,
//       CuriosityWeather: marsWeatherModified.CuriosityWeather,
//       //* Alternative version of partial setState
//       // InSightWeather: {InSight_Weather_Data: marsWeatherModified.InSightWeather, InSight_sol: this.state.InSightWeather.InSight_sol},
//       //* Setting the State partially
//       InSightWeather: {...this.state.InSightWeather, InSight_Weather_Data: marsWeatherModified.InSightWeather},
//       loaded: true,
//       userPosition: userPosition,
//     });
//     // await console.log("this.state:", this.state);
//   } catch (error) {
//     console.error(error);
//   }
// };
