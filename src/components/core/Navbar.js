import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import MedblockLogo from "../../assets/icons/MedblockLogo.png";

const CustomNavbar = () => {
  const location = useLocation();
  console.log(location);

  return location.pathname === "/" ? (
    <></>
  ) : (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={MedblockLogo}
            width="30"
            className="d-inline-block align-top"
          />{" "}
          &nbsp; Medblock
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="text-center">
          <Nav className="me-auto"></Nav>

          <Nav>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>

            <Button variant="light" onClick="">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
