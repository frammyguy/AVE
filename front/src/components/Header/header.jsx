import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./header.sass";
import Logo from "./logo_ave.png";

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header>
      <Modal show={show} onHide={handleClose} className="modal-wrap">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="header-wrap">
        <img src={Logo} class="main_logo" alt="main_logo" />
        <h1>AVE</h1>
      </div>
      <div class="header-links">
        <a href="/">Galvenā</a>
        <a href="/">Par mums</a>
        <Button
          className="header-connect"
          variant="danger"
          onClick={handleShow}
        >
          Pieslēgties
        </Button>
      </div>
    </header>
  );
}
