import React from "react";
import styled from "styled-components";
import {Table} from "react-bootstrap";
// import Spinner from "../../../Spinner";

const Div = styled.div`
  background-color: yellow !important;
  border: 2px solid red;
`;

const td_Style: State = {
  fontWeight: "bold",
  float: "right",
  fontStyle: "italic",
  color: "whiteSmoke",
};

const VehicleInfo = ({info, name}: {info: State; name: string}): JSX.Element => {
  // console.log("{info}:", info);

  return (
    <Div>
      <Table striped bordered hover variant="dark" width="100%">
        <thead>
          <tr>
            <th style={{float: "left"}}>Vehicle Name:</th>
            <th style={{float: "right", color: "lightgray", fontStyle: "italic"}}>{name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Launch Date: </td>
            <td style={td_Style}>{info.launchDate}</td>
          </tr>
          <tr>
            <td>Landing Site: </td>
            <td style={td_Style}>{info.landingSite}</td>
          </tr>
          <tr>
            <td>Coordinates: </td>
            <td style={td_Style}>{info.coordinates}</td>
          </tr>
          <tr>
            <td>Landing Date: </td>
            <td style={td_Style}>{info.landingDate}</td>
          </tr>
        </tbody>
      </Table>
    </Div>
  );
};

export default VehicleInfo;
