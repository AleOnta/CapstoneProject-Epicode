import "./Navbar.scss";
import { Navbar, Container, Row } from "react-bootstrap";
import { UserCardComponent } from "./UserCardComponent";
import { SearchbarComponent } from "./searchbar/SearchbarComponent";
import { LogoComponent } from "./LogoComponent";
import { useEffect } from "react";

export const NavbarComponent = () => {
  useEffect(() => {}, []);

  return (
    <Navbar className="globalNavbar">
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
