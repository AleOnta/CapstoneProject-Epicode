import { Col, Navbar } from "react-bootstrap"
import logo from "../../assets/imgs/cinemaLogo.png"

export const LogoComponent = () => {
    return (
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
    )
}