import React from "react";
import styled from "styled-components";
import {Table} from "react-bootstrap";

const Div = styled.div`
  background-color: yellow;
`;

const TD = styled.td`
  font-weight: bold;
  float: right;
  font-style: italic;
`;

const VehicleInfo = ({info}: State) => {
  console.log("{info}:", info);
  return (
    <Div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan={2}>Perseverance Mars Rover</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Launch Date: </td>
            <TD>{info.launchDate}</TD>
          </tr>
          <tr>
            <td>Landing Site: </td>
            <TD>{info.landingSite}</TD>
          </tr>
          <tr>
            <td>Coordinates: </td>
            <TD>{info.coordinates}</TD>
          </tr>
          <tr>
            <td>Landing Date: </td>
            <TD>{info.landingDate}</TD>
          </tr>
        </tbody>
      </Table>
    </Div>
  );
};

export default VehicleInfo;
