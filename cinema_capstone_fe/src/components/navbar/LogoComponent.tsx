import { Col } from "react-bootstrap";
import logo from "../../assets/imgs/cinemaLogo.png";
import { Link } from "react-router-dom";

export const LogoComponent = () => {
  return (
    <Col xs={2}>
      <Link to="/home" className="navbar-brand">
        <img
          src={logo}
          width="125"
          height="70"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Link>
    </Col>
  );
};
