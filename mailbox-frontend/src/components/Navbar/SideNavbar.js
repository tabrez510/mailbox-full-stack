import React, { useState } from "react";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./SideNav.css";

const SideNavbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand={false} className="d-lg-none">
        <Button variant="light" onClick={handleShow}>
          <FaBars />
        </Button>
        <Navbar.Brand href="#">Mail</Navbar.Brand>
      </Navbar>

      <div className="d-none d-lg-block sidebar">
        <Navbar className="flex-column align-items-start p-3 h-100">
          <Navbar.Brand href="#">Mail</Navbar.Brand>
          <Nav className="flex-column w-100">
            <Nav.Link href="#sent-mail">Sent Mail</Nav.Link>
            <Nav.Link href="#received-mail">Received Mail</Nav.Link>
          </Nav>
          <Nav className="mt-auto w-100">
            <Button variant="danger" className="w-100">
              Log Out
            </Button>
          </Nav>
        </Navbar>
      </div>

      <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mail</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#sent-mail" onClick={handleClose}>
              Sent Mail
            </Nav.Link>
            <Nav.Link href="#received-mail" onClick={handleClose}>
              Received Mail
            </Nav.Link>
          </Nav>
          <Nav className="mt-auto">
            <Button variant="danger" className="w-100">
              Log Out
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideNavbar;
