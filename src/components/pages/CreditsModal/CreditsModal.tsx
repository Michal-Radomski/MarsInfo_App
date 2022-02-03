import React from "react";
import {Button, Modal, Tab, Tabs, Card, ListGroup} from "react-bootstrap";

import "./../../../styles/App.scss";
import Container from "./Container";
import {modalDataAPIs, modalDataOther, modalDataLibraries} from "./ModalData";

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
          <Modal.Title style={{fontWeight: "bold", fontStyle: "italic"}}>Credits and Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight: "520px"}}>
          <Tabs defaultActiveKey="APIs">
            {/* //- Tab Apis */}
            <Tab eventKey="APIs" title="APIs">
              <Card style={{width: "100%"}}>
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic"}}>
                  List of APIs used to built the App
                </Card.Header>
                <ListGroup variant="flush">
                  <Container data={modalDataAPIs} />
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
            {/* //- Tab Libraries */}
            <Tab eventKey="Libraries" title="Libraries">
              <Card style={{width: "100%"}}>
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic"}}>
                  List of libraries used to built the App
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Card.Link href="https://www.typescriptlang.org" target="_blank">
                      TypeScript
                    </Card.Link>{" "}
                    and
                    <Card.Link href="https://reactjs.org" target="_blank">
                      React
                    </Card.Link>{" "}
                    are used to built the App.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Link href="https://cesium.com" target="_blank">
                      Cesium
                    </Card.Link>{" "}
                    and
                    <Card.Link href="https://resium.reearth.io" target="_blank">
                      Resium
                    </Card.Link>{" "}
                    are used to render the 3D model of Mars.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Link href="https://leafletjs.com" target="_blank">
                      Leaflet
                    </Card.Link>{" "}
                    and
                    <Card.Link href="https://openlayers.org" target="_blank">
                      OpenLayers
                    </Card.Link>{" "}
                    are used to render 2D maps of Earth and Mars.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Link href="https://styled-components.com" target="_blank">
                      Styled-Components
                    </Card.Link>{" "}
                    and
                    <Card.Link href="https://sass-lang.com" target="_blank">
                      Sass
                    </Card.Link>{" "}
                    are used to customize the UI.
                  </ListGroup.Item>
                  <Container data={modalDataLibraries} />
                </ListGroup>
              </Card>
            </Tab>
            {/* //- Tab Other Staff*/}
            <Tab eventKey="Other Staff" title="Other Staff">
              <Card style={{width: "100%"}}>
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic"}}>
                  List of other staff used to built the App
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Package{" "}
                    <Card.Link
                      href="https://www.npmjs.com/package/@craco/craco"
                      target="_blank"
                      style={{fontWeight: "bold", fontStyle: "italic"}}
                    >
                      @craco/craco
                    </Card.Link>{" "}
                    is used to override the standard
                    <Card.Link
                      href="https://create-react-app.dev/"
                      target="_blank"
                      style={{fontWeight: "bold", fontStyle: "italic"}}
                    >
                      Create React App
                    </Card.Link>
                    .
                  </ListGroup.Item>
                  <Container data={modalDataOther} />
                  <ListGroup.Item>
                    Information is taken from:{" "}
                    <Card.Link href="https://www.nasa.gov" target="_blank">
                      NASA
                    </Card.Link>{" "}
                    and
                    <Card.Link href="https://en.wikipedia.org/wiki/Main_Page" target="_blank">
                      Wikipedia
                    </Card.Link>
                    .
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
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
