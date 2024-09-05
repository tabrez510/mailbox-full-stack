import React, { useState } from "react";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { logOut } from "../../features/mail/mailSlice";
import "./SideNav.css";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

const SideNavbar = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    navigate("/auth/login");
  };

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
            <NavLink
              to="/send-mail"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Compose Mail
            </NavLink>
            <NavLink
              to="/received-mail"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Received Mail
            </NavLink>
            <NavLink
              to="/sent-mail"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Sent Mail
            </NavLink>
          </Nav>
          <Nav className="mt-auto w-100">
            <Button variant="danger" className="w-100" onClick={handleLogout}>
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
            <NavLink
              to="/send-mail"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Compose Mail
            </NavLink>
            <NavLink
              to="/received-mail"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={handleClose}
            >
              Received Mail
            </NavLink>
            <NavLink
              to="/sent-mail"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={handleClose}
            >
              Sent Mail
            </NavLink>
          </Nav>
          <Nav className="mt-auto">
            <Button variant="danger" className="w-100" onClick={handleLogout}>
              Log Out
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideNavbar;
