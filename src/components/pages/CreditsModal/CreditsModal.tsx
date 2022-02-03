import React from "react";
import {Button, Modal, Tab, Tabs, Card, ListGroup} from "react-bootstrap";

import "./../../../styles/App.scss";
import Container from "./Container";
import {modalDataAPIs, modalDataOther} from "./ModalData";

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
            <Tab eventKey="APIs" title="APIs">
              <Card style={{width: "100%"}}>
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic"}}>
                  List of used APIs to built the App
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

            <Tab eventKey="Libraries" title="Libraries"></Tab>
            <Tab eventKey="Other" title="Other">
              <Container data={modalDataOther} />
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
