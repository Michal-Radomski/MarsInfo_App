import React from "react";
import {Button, Modal, Tab, Tabs, Card, ListGroup} from "react-bootstrap";

import "../../styles/App.scss";

const modalDataAPIs = [
  {
    id: 1,
    content: "NASA Astronomy Picture of the Day and Mars Weather Conditions are taken from from: ",
    link: "https://api.nasa.gov",
    label: "NASA APIs",
  },
  {id: 2, content: "Maps of Mars are provided by: ", link: "https://www.openplanetary.org", label: "OpenPlanetary.org"},
  {
    id: 3,
    content: "World Imagery is provided by: ",
    link: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    label: "ArcGIS",
  },
  {
    id: 4,
    content: "Local weather conditions are provided by: ",
    link: "https://openweathermap.org",
    label: "OpenWeatherMap",
  },
  {
    id: 5,
    content: "Mars Imagery is provided by: ",
    link: "https://www.usgs.gov/centers/astrogeology-science-center/maps",
    label: "USGS - Astrogeology Science Center",
  },
  {
    id: 6,
    content: "Covid Data is provided by: ",
    link: "https://github.com/mathdroid/covid-19-api",
    label: "mathdroid/covid-19-api",
  },
  {
    id: 7,
    content: "Currency Exchange Rates are provided by: ",
    link: "https://www.exchangerate-api.com",
    label: "ExchangeRate-API",
  },
  {
    id: 8,
    content: "IP Geolocation API is provided by: ",
    link: "https://ipwhois.io",
    label: "IPWHOIS.IO",
  },
];

const modalDataOther = [
  {
    id: 1,
    content: "Nasa's Mars Lander and Rovers transparent icons were taken from: ",
    link: "https://www.pngaaa.com",
    label: "PngAAA.com",
  },
  {
    id: 2,
    content: "Wind Direction Icon was taken from: ",
    link: "hhttps://www.flaticon.com/free-icons/direction",
    label: "flaticon.com",
  },
];

const Container = (props: any) => {
  return <div style={{backgroundColor: "blue"}}>{props.children}</div>;
};

const CreditsModal = (): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderedListItems = modalDataAPIs.map((item) => {
    return (
      <ListGroup.Item key={item.id}>
        {item.content}
        <Card.Link href={item.link} target="_blank">
          {item.label}
        </Card.Link>
        .
      </ListGroup.Item>
    );
  });

  return (
    <>
      <Button onClick={handleShow} variant={!show ? "outline-info" : "primary"} className="credits-button">
        Credits
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} size="xl" keyboard={true} centered>
        <Modal.Header closeButton closeVariant="white" style={{backgroundColor: "#0B5ED7", color: "whitesmoke"}}>
          <Modal.Title style={{fontWeight: "bold", fontStyle: "italic"}}>Credits and Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight: "520px"}}>
          <Tabs defaultActiveKey="APIs">
            <Tab eventKey="APIs" title="APIs">
              <Card style={{width: "100%"}}>
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic"}}>
                  List of used APIs to built the App
                </Card.Header>
                <ListGroup variant="flush">
                  {renderedListItems}
                  <ListGroup.Item>
                    Earth maps are provided by:{" "}
                    <Card.Link href="https://maps.stamen.com" target="_blank">
                      Stamen Maps
                    </Card.Link>{" "}
                    and
                    <Card.Link href="https://www.openstreetmap.org" target="_blank">
                      OpenStreetMap
                    </Card.Link>
                    .
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
            <Tab eventKey="Libraries" title="Libraries"></Tab>
            <Tab eventKey="Other" title="Other"></Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#0B5ED7"}}>
          <Button variant="outline-light" onClick={handleClose} size="lg" style={{fontWeight: "bold", fontStyle: "italic"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreditsModal;
