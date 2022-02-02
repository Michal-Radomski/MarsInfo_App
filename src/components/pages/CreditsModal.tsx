import React from "react";
import {Button, Modal, Tab, Tabs, Card, ListGroup} from "react-bootstrap";

import "../../styles/App.scss";

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
