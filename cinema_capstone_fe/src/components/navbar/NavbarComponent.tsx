import "./Navbar.scss";
import { Navbar, Container, Row } from "react-bootstrap";
import { UserCardComponent } from "./UserCardComponent";
import { SearchbarComponent } from "./searchbar/SearchbarComponent";
import { LogoComponent } from "./LogoComponent";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const NavbarComponent = () => {
  let location = useLocation();
  console.log(location);
  useEffect(() => {}, []);

  return (
    <Navbar
      className={`globalNavbar ${
        (location.pathname === "/auth/login" ||
          location.pathname === "/auth/register") &&
        "d-none"
      }`}
    >
      <Container className="d-flex justify-content-center">
        <Row className="w-100 align-items-center justify-content-between">
          <LogoComponent />
          <SearchbarComponent />
          <UserCardComponent />
        </Row>
      </Container>
    </Navbar>
  );
};
