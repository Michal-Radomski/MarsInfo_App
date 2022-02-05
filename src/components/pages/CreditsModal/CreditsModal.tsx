import React from "react";
import {Button, Modal, Tab, Tabs, Card, ListGroup} from "react-bootstrap";

import "./../../../styles/App.scss";
import Container from "./Container";
import {modalDataAPIs, modalDataOther, modalDataLibraries, modalDataLibraries2} from "./ModalData";
import FramerMotionModal from "./FramerMotionModal";

const CreditsModal = (): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderedListLibraries2: JSX.Element[] = modalDataLibraries2.map(
    (item: {id: number; link_1: string; link_2: string; label_1: string; label_2: string; content: string}) => {
      return (
        <ListGroup.Item key={item.id}>
          <Card.Link href={item.link_1} target="_blank">
            {item.label_1}
          </Card.Link>{" "}
          and
          <Card.Link href={item.link_2} target="_blank">
            {item.label_2}
          </Card.Link>{" "}
          {item.content}
        </ListGroup.Item>
      );
    }
  );

  return (
    <>
      <Button onClick={handleShow} variant={!show ? "outline-info" : "primary"} className="credits-button">
        Credits & Info
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} size="xl" keyboard={true} centered>
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{backgroundColor: "#0B5ED7", color: "whitesmoke", borderRadius: "12px 12px 0 0 "}}
        >
          <Modal.Title style={{fontWeight: "bold", fontStyle: "italic"}}>Credits and Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight: "550px"}}>
          <Tabs defaultActiveKey="APIs">
            {/* //- Tab Apis */}
            <Tab eventKey="APIs" title="APIs">
              <Card style={{width: "100%"}} border="primary">
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic", borderBottom: "1px solid #0B5ED7"}}>
                  List of APIs used to built the App
                </Card.Header>
                <Card.Body style={{padding: "0"}}>
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
                </Card.Body>
              </Card>
            </Tab>
            {/* //- Tab Libraries */}
            <Tab eventKey="Libraries" title="Libraries">
              <Card style={{width: "100%"}} border="primary">
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic", borderBottom: "1px solid #0B5ED7"}}>
                  List of libraries used to built the App
                </Card.Header>
                <Card.Body style={{padding: "0"}}>
                  {" "}
                  <ListGroup variant="flush">
                    {renderedListLibraries2}
                    <Container data={modalDataLibraries} />
                  </ListGroup>
                </Card.Body>
              </Card>
            </Tab>
            {/* //- Tab Other Staff*/}
            <Tab eventKey="Other Staff" title="Other Staff">
              <Card style={{width: "100%"}} border="primary">
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic", borderBottom: "1px solid #0B5ED7"}}>
                  List of other staff used to built the App
                </Card.Header>
                <Card.Body style={{padding: "0"}}>
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
                </Card.Body>
              </Card>
            </Tab>
            {/* //- Tab Repo Link*/}
            <Tab eventKey="Repo Link" title="Repo Link">
              <Card style={{width: "100%"}} border="primary">
                <Card.Header style={{fontWeight: "bold", fontStyle: "italic", borderBottom: "1px solid #0B5ED7"}}>
                  Link to the Repo of the App
                </Card.Header>
                <Card.Body style={{width: "100%", height: "420px", backgroundColor: "lightyellow", padding: 0}} as="div">
                  <FramerMotionModal />
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#0B5ED7", borderRadius: "0 0 12px 12px"}}>
          <Button variant="outline-light" onClick={handleClose} size="lg" style={{fontWeight: "bold", fontStyle: "italic"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreditsModal;
