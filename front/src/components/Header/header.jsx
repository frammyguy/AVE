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
          <Modal.Title>Pieslēgties</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-data">
            <label htmlFor="logins">Logins</label>
            <input type="text" id="logins" name="logins" />
            <label htmlFor="parole">Parole</label>
            <input type="password" id="parole" name="parole" />
            <a href="/">aizmirsu paroli</a>
          </div>       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ienākt
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Reģistrēties
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="header-wrap">
        <a href="/">
          <img src={Logo} className="main_logo" alt="main_logo" />
        </a>
        <a href="/">
          <h1>AVE</h1>
        </a>     
      </div>
      <div className="header-links">
        <a href="/">Galvenā</a>
        <a href="/about">Par mums</a>
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
