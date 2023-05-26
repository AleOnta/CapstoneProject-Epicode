import { Col } from "react-bootstrap";
import logo from "../../assets/imgs/cinemaLogo.png";
import { Link } from "react-router-dom";

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
