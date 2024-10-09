import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "./AuthProvider";
import "./nav.css";
import api from "../api/api";

function ColorSchemesExample() {
  const user = useAuth();
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
            {!user && (
              <>
                <Nav.Item>
                  <Nav.Link
                    href="/signup"
                    active={location.pathname === "/signup"}
                  >
                    Signup
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/login"
                    active={location.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
          {user && (
            <Nav className="ms-auto">
              <Nav.Link onClick={logoutClick}>Logout</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
