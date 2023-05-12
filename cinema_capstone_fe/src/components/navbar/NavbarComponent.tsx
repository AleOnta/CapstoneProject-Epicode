import "./Navbar.scss"
import logo from "../../assets/imgs/cinemaLogo.png"
import { Navbar, Container, Row, Col } from "react-bootstrap"
import { UserCardComponent } from "./UserCardComponent"

export const NavbarComponent = () => {

    return (
        <Navbar className="globalNavbar">
        <Container className="d-flex justify-content-center">
          <Row className="w-100 align-items-center justify-content-between">
          <Col xs={2}>
            <Navbar.Brand href="#home">
              <img
                src={logo}
                width="125"
                height="70"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            </Col>
            <Col xs={6} className="d-flex justify-content-center navbar-search">
              <input type="text" placeholder="Search movies by a keyword" className="rounded-3"/>
              
            </Col>
            <Col xs={2}>
              <UserCardComponent/>
            </Col>
          </Row>
        </Container>
      </Navbar>
    )

}