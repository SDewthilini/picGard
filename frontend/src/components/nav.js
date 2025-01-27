import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./nav.css";
import api from "../api/api";
import { SignInButton, useAuth, UserButton } from "@clerk/clerk-react";

function ColorSchemesExample() {
  const {isSignedIn} = useAuth();
  const location = useLocation(); // Hook to get the current route path

  const logoutClick = () => {
    api.get("/logout")
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">PicGuard</Navbar.Brand>
          <Nav
            className="me-auto"
            variant="pills"
            activeKey={location.pathname}
          >
            <Nav.Item>
              <Nav.Link href="/" active={location.pathname === "/"}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/features"
                active={location.pathname === "/features"}
              >
                Features
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/Gallery"
                active={location.pathname === "/Gallery"}
              >
                Gallery
              </Nav.Link>
            </Nav.Item>
            {isSignedIn ? <UserButton /> : <SignInButton />}
          </Nav>
          
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
