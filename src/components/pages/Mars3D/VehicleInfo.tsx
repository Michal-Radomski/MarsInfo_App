import React from "react";
import styled from "styled-components";
import {Card, Table} from "react-bootstrap";

const VehicleInfo = () => {
  return (
    <Card as="div">
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title> Card Title </Card.Title>
        <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          color: "white",
          backgroundColor: "#0DCAF0",
          fontWeight: "bolder",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          padding: "0.25rem 1rem",
          fontSize: "80%",
        }}
      >
        <Card.Text style={{marginBottom: "0px"}}>Weather Calculation Time:</Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default VehicleInfo;
