import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/cinemaLogo.png";

export const LogoComponent = () => {
  return (
    <Col xs={4} md={2} className="d-flex justify-content-center">
      <Link to="/home" className="navbar-brand m-0">
        <img
          src={logo}
          className="d-inline-block align-top logo"
          alt="React Bootstrap logo"
        />
      </Link>
    </Col>
  );
};
