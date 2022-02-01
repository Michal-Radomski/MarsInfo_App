import React from "react";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const CreditsModal = (): JSX.Element => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} variant="outline-info">
        Credits
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} size="lg" keyboard={true} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Credits and Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign: "center"}}>
            <h1>Credits</h1>
            <h3>Under Construction...</h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreditsModal;
