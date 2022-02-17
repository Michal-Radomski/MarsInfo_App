import React from "react";
import axios from "axios";
import {Accordion} from "react-bootstrap";

import Spinner from "../../../Spinner";
import PictureDatePicker from "./PictureDatePicker";

const API_KEY = process.env.REACT_APP_NASA_API_KEY as string;
// console.log("API_KEY:", API_KEY);

const selectedDate = "2020-01-01"; //-temp

const photosOpportunityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Opportunity/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;
const photosCuriosityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;
const photosSpiritUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Spirit/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;

const URLs = [photosOpportunityUrl, photosCuriosityUrl, photosSpiritUrl];

const MarsPictures = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  React.useEffect(() => {
    const fetchMarsPictures = async () => {
      try {
        const response = await axios.all(URLs.map((url) => axios.get(url))).then((data) => {
          // console.log("data:", data);
          return data;
        });
        // await console.log("response:", response);
        const marsRoversPictures = await response.map((marsRoverPictures) => marsRoverPictures.data.photos);
        await console.log("marsRoversPictures:", marsRoversPictures);
        const photosOpportunity =
          marsRoversPictures[0].length > 0 ? marsRoversPictures[0] : "No Photos for the Selected Day";
        const photosCuriosity = marsRoversPictures[1].length > 0 ? marsRoversPictures[1] : "No Photos for the Selected Day";
        const photosSpirit = marsRoversPictures[2].length > 0 ? marsRoversPictures[2] : "No Photos for the Selected Day";
        await console.log(
          "photosOpportunity:",
          photosOpportunity,
          "photosCuriosity:",
          photosCuriosity,
          "photosSpirit:",
          photosSpirit
        );

        // // await console.log("marsWeatherModified:", marsWeatherModified);
        // await this.setState({
        //   PerseveranceWeather: marsWeatherModified.PerseveranceWeather,
        //   CuriosityWeather: marsWeatherModified.CuriosityWeather,
        //   //* Alternative version of partial setState
        //   // InSightWeather: {InSight_Weather_Data: marsWeatherModified.InSightWeather, InSight_sol: this.state.InSightWeather.InSight_sol},
        //   //* Setting the State partially
        //   InSightWeather: {...this.state.InSightWeather, InSight_Weather_Data: marsWeatherModified.InSightWeather},
        //   loaded: true,
        //   userPosition: userPosition,
        // });
        // // await console.log("this.state:", this.state);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarsPictures();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>Accordion Body Text2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>Accordion Body Text2</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <PictureDatePicker />
    </React.Fragment>
  );
};

export default MarsPictures;

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
