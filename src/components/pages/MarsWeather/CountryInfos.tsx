import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Card, ListGroup, Table, Spinner} from "react-bootstrap";

import {GET_COVID_DATA, GET_RATES_DATA} from "../../../redux/actions";

const CountryInfos = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch();
  const [location_Redux, currency_Redux, covid_Redux] = useSelector((state: State) => [
    state?.rootReducer?.location ?? "No Data",
    state?.rootReducer?.currency ?? "No Data",
    state?.rootReducer?.covid ?? "No Data",
  ]) as State;
  // console.log("location_Redux:", location_Redux);
  console.log("currency_Redux, covid_Redux:", currency_Redux, covid_Redux);

  const {currency_code, country} = location_Redux;
  // console.log("currency_code, country:", currency_code, country);

  React.useEffect(() => {
    async function fetchData() {
      const [covidByCountry, covidGlobal, rates] = await Promise.allSettled([
        fetch(`https://covid19.mathdro.id/api/countries/${country}`).then((response) => response.json()),
        fetch("https://covid19.mathdro.id/api").then((response) => response.json()),
        fetch(`https://open.er-api.com/v6/latest/${currency_code}`).then((response) => response.json()),
      ]);
      // console.log("covidByCountry:", covidByCountry);
      // console.log("covidGlobal:", covidGlobal);
      // console.log("rates:", rates);
      const result = {
        //@ts-ignore
        countryCovid: covidByCountry.value,
        //@ts-ignore
        globalCovid: covidGlobal.value,
        //@ts-ignore
        currencyRates: rates.value,
      };
      // console.log("result:", result);
      const covidData = {
        globalConfirmed: result?.globalCovid?.confirmed?.value ?? "No Data",
        globalDeaths: result?.globalCovid?.deaths?.value ?? "No Data",
        countryConfirmed: result?.countryCovid?.confirmed?.value ?? "No Data",
        countryDeaths: result?.countryCovid?.deaths?.value ?? "No Data",
        lastUpdate: result?.globalCovid?.lastUpdate || result?.countryCovid?.lastUpdate || "No Data",
      };
      const currencyData = {
        lastUpdate: result?.currencyRates?.time_last_update_utc ?? "No Data",
        to_Selected: result?.currencyRates?.rates[`${currency_code}`] ?? "No Data",
        to_USD: result?.currencyRates?.rates?.USD ?? "No Data",
        to_EURO: result?.currencyRates?.rates?.EUR ?? "No Data",
        to_CHF: result?.currencyRates?.rates?.CHF ?? "No Data",
      };
      // await console.log("covidData, currencyData:", covidData, currencyData);
      await dispatch({type: GET_COVID_DATA, payload: covidData});
      await dispatch({type: GET_RATES_DATA, payload: currencyData});
    }
    fetchData();
  });

  return (
    <React.Fragment>
      <Card style={{width: "100%"}}>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With</Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>Text</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>Featured</Card.Footer>
      </Card>
      <Spinner animation={"border"} />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default CountryInfos;
