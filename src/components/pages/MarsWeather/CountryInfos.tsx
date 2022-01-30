import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Card, ListGroup, Table, Spinner} from "react-bootstrap";

const CountryInfos = (): JSX.Element => {
  const storedData = useSelector((state: State) => state?.rootReducer?.location ?? "No Data") as State;
  // console.log("storedData:", storedData);
  const {currency_code, country} = storedData;
  console.log("currency_code, country:", currency_code, country);

  React.useEffect(() => {
    async function fetchData() {
      const [covidByCountry, covidGlobal, rates] = await Promise.allSettled([
        fetch(`https://covid19.mathdro.id/api/countries/${country}`).then((response) => response.json()),
        fetch("https://covid19.mathdro.id/api").then((response) => response.json()),
        fetch(`https://open.er-api.com/v6/latest/${currency_code}`).then((response) => response.json()),
      ]);

      console.log("covidByCountry:", covidByCountry);
      console.log("covidGlobal:", covidGlobal);
      console.log("rates:", rates);
      const result = {
        //@ts-ignore
        countryCovid: covidByCountry.value,
        //@ts-ignore
        globalCovid: covidGlobal.value,
        //@ts-ignore
        currencyRates: rates.value,
      };
      console.log("result:", result);
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
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>Featured</Card.Footer>
      </Card>

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
