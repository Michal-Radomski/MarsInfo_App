import React from "react";
import {Button, Modal, Tab, Tabs, Card, ListGroup} from "react-bootstrap";

import "../../styles/App.scss";

const modalData = [
  {
    id: 1,
    content: "NASA Astronomy Picture of the Day and Mars Weather Conditions are taken from from:",
    link: "https://api.nasa.gov",
    label: "NASA APIs",
  },
  {id: 2, content: "Maps of Mars are provided by:", link: "https://www.openplanetary.org", label: "OpenPlanetary.org"},
  {id: 3, content: "", link: ""},
  {
    id: 4,
    content: "World Imagery is provided by:",
    link: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    label: "ArcGIS",
  },
  {id: 5, content: "Local weather conditions are provided by:", link: "https://openweathermap.org", label: "OpenWeatherMap"},
  {
    id: 6,
    content: "Mars Imagery is provided by:",
    link: "https://www.usgs.gov/centers/astrogeology-science-center/maps",
    label: "USGS - Astrogeology Science Center",
  },
  {
    id: 7,
    content: "Covid Data is provided by:",
    link: "https://github.com/mathdroid/covid-19-api",
    label: "mathdroid/covid-19-api",
  },
  {
    id: 8,
    content: "Currency Exchange Rates are provided by:",
    link: "https://www.exchangerate-api.com",
    label: "ExchangeRate-API",
  },
];

const CreditsModal = (): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} variant={!show ? "outline-info" : "primary"} className="credits-button">
        Credits
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} size="xl" keyboard={true} centered>
        <Modal.Header closeButton closeVariant="white" style={{backgroundColor: "#0B5ED7", color: "whitesmoke"}}>
          <Modal.Title>Credits and Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="APIs">
            <Tab eventKey="APIs" title="APIs">
              <Card style={{width: "100%"}}>
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic"}}>Used APIs to built the App</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    NASA Astronomy Picture of the Day and Mars Weather Conditions are taken from from{" "}
                    <Card.Link href="https://api.nasa.gov" target="_blank">
                      NASA APIs
                    </Card.Link>
                    .
                  </ListGroup.Item>
                  <ListGroup.Item>
                    xxxxxxxxxxxx{" "}
                    <Card.Link href="#" target="_blank">
                      NASA APIs
                    </Card.Link>
                    .
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
            <Tab eventKey="Other" title="Other"></Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#0B5ED7"}}>
          <Button variant="outline-light" onClick={handleClose} size="lg">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreditsModal;
