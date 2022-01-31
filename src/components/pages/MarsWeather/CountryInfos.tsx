// Todo: sources, localStorage

import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Card, Table, Spinner, Dropdown} from "react-bootstrap";

import {GET_COVID_DATA, GET_RATES_DATA} from "../../../redux/actions";

const CountryInfos = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch();
  const [location_Redux, currency_Redux, covid_Redux] = useSelector((state: State) => [
    state?.rootReducer?.location ?? "No Data",
    state?.rootReducer?.currency ?? "No Data",
    state?.rootReducer?.covid ?? "No Data",
  ]) as State;
  // console.log("location_Redux:", location_Redux);
  // console.log("currency_Redux, covid_Redux:", currency_Redux, covid_Redux);

  const {currency_code, country} = location_Redux;
  // console.log("currency_code, country:", currency_code, country);

  const [localStorageSize, setLocalStorageSize] = React.useState(0);

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

    setTimeout(() => {
      fetchData();
    }, 1200);

    //- localStorage Size
    setTimeout(() => {
      function showLocalStorageSize() {
        let totalSize = 0;
        for (let item in localStorage) {
          let amount = (localStorage[item].length * 2) / 1024;
          if (!isNaN(amount) && localStorage.hasOwnProperty(item)) {
            // console.log(item, localStorage.getItem(item), amount);
            totalSize = totalSize + amount;
          }
        }
        setLocalStorageSize(Number(totalSize.toFixed(2)));
      }
      showLocalStorageSize();
    }, 1800);
  }, [country, currency_code, dispatch]);

  return (
    <>
      <Card style={{width: "100%", margin: "12px auto"}}>
        <Card.Header style={{textAlign: "center", fontWeight: "bold"}} as="h5">
          Local Info for <span style={{color: "maroon", fontStyle: "italic"}}>{country}</span>
        </Card.Header>
        <Card.Body style={{width: "100%", padding: "0px"}}>
          {/* //* Covid Info */}
          <Card.Title style={{textAlign: "center", margin: "8px"}}>Covid Info</Card.Title>
          <Table striped bordered hover size="sm" style={{width: "100%", padding: "0px"}}>
            <thead>
              <tr>
                <th style={{backgroundColor: "lightyellow"}}>SOURCE</th>
                <th style={{color: "maroon", fontStyle: "italic"}}>{country}</th>
                <th>World</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Confirmed</td>
                <td style={{fontWeight: "bold"}}>
                  {covid_Redux.countryConfirmed ? (
                    covid_Redux.countryConfirmed.toLocaleString()
                  ) : (
                    <Spinner animation="border" variant="primary" size="sm" />
                  )}
                </td>
                <td style={{fontWeight: "bold"}}>
                  {covid_Redux.globalConfirmed ? (
                    covid_Redux.globalConfirmed.toLocaleString()
                  ) : (
                    <Spinner animation="border" variant="secondary" size="sm" />
                  )}
                </td>
              </tr>
              <tr>
                <td>Deaths</td>
                <td style={{fontWeight: "bold"}}>
                  {covid_Redux.countryDeaths ? (
                    covid_Redux.countryDeaths.toLocaleString()
                  ) : (
                    <Spinner animation="border" variant="warning" size="sm" />
                  )}
                </td>
                <td style={{fontWeight: "bold"}}>
                  {covid_Redux.globalDeaths ? (
                    covid_Redux.globalDeaths.toLocaleString()
                  ) : (
                    <Spinner animation="border" variant="info" size="sm" />
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <Card.Text style={{width: "100%", padding: "4px"}} as="div">
            Last Update:{" "}
            <span style={{fontWeight: "bold", float: "right"}}>
              {covid_Redux.lastUpdate ? (
                new Date(covid_Redux.lastUpdate).toUTCString()
              ) : (
                <React.Fragment>
                  <Spinner animation="border" variant="dark" size="sm" /> Loading...
                </React.Fragment>
              )}
            </span>
          </Card.Text>
          <Dropdown.Divider style={{border: "solid 2px maroon", margin: "5px auto"}} />
          {/* //* Currency Info */}
          <Card.Title style={{textAlign: "center", margin: "8px"}}>Local Currency Info</Card.Title>
          <Table striped bordered hover size="sm" style={{width: "100%", padding: "0px"}}>
            <thead>
              <tr>
                <th style={{backgroundColor: "lightyellow"}}>source</th>
                <th>
                  Local Currency: <span style={{color: "maroon", fontStyle: "italic"}}>{currency_code}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  USD to <span style={{color: "maroon", fontStyle: "italic"}}>{currency_code}</span>
                </td>
                <td style={{fontWeight: "bold"}}>
                  {currency_Redux.to_USD ? (
                    (1 / currency_Redux.to_USD).toFixed(3)
                  ) : (
                    <Spinner animation="grow" variant="primary" size="sm" />
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  EURO to <span style={{color: "maroon", fontStyle: "italic"}}>{currency_code}</span>
                </td>
                <td style={{fontWeight: "bold"}}>
                  {currency_Redux.to_EURO ? (
                    (1 / currency_Redux.to_EURO).toFixed(3)
                  ) : (
                    <Spinner animation="grow" variant="secondary" size="sm" />
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  CHF to <span style={{color: "maroon", fontStyle: "italic"}}>{currency_code}</span>
                </td>
                <td style={{fontWeight: "bold"}}>
                  {currency_Redux.to_CHF ? (
                    (1 / currency_Redux.to_CHF).toFixed(3)
                  ) : (
                    <Spinner animation="grow" variant="warning" size="sm" />
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <Card.Text style={{width: "100%", padding: "4px"}} as="div">
            Last Update:{" "}
            <span style={{fontWeight: "bold", float: "right"}}>
              {currency_Redux.lastUpdate ? (
                new Date(currency_Redux.lastUpdate).toUTCString()
              ) : (
                <React.Fragment>
                  <Spinner animation="grow" variant="dark" size="sm" /> Loading...
                </React.Fragment>
              )}
            </span>
          </Card.Text>
          <Dropdown.Divider style={{border: "solid 2px maroon", margin: "5px auto", marginBottom: "0px"}} />
        </Card.Body>
        <Card.Footer style={{width: "100%", marginTop: "px"}}>
          Size of localStorage for the site:{" "}
          <span style={{float: "right", fontWeight: "bolder", color: "maroon"}}>
            {localStorageSize === 0 ? <Spinner animation="grow" variant="info" size="sm" /> : `${localStorageSize} KB`}
          </span>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CountryInfos;
