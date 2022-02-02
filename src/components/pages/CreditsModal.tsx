import React from "react";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

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
          <div style={{textAlign: "center"}}>
            <h1>Credits</h1>
            <h3>Under Construction...</h3>
          </div>
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
