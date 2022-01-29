import React from "react";
import {useSelector} from "react-redux";
import {Card, ListGroup, Table} from "react-bootstrap";

const CountryInfoPopover = (): JSX.Element => {
  const storedData = useSelector((state: State) => state?.rootReducer?.location ?? "No Data") as State;
  // console.log("storedData:", storedData);
  const {currency_code, country} = storedData;
  console.log("currency_code, country:", currency_code, country);

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

export default CountryInfoPopover;
