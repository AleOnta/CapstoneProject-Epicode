import "./Footer.scss";
import logo from "../../assets/imgs/cinemaLogo.png";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { Col, ListGroup, Row } from "react-bootstrap";

export const FooterComponent = () => {
  return (
    <>
      <Row className="d-flex align-items-start justify-content-center footer-top-row pt-5">
        <Col xs={2}>
          <h5 className="footer-col-title text-center">CONTACTS</h5>
          <ListGroup>
            <ListGroup.Item>FAQ</ListGroup.Item>
            <ListGroup.Item>Send us an email</ListGroup.Item>
            <ListGroup.Item>Call us</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={2}>
          <h5 className="footer-col-title text-center">THYNK MEDIA</h5>
          <ListGroup>
            <ListGroup.Item>About us</ListGroup.Item>
            <ListGroup.Item>Work with us</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={2}>
          <h5 className="footer-col-title text-center">LEGAL PURPOSES</h5>
          <ListGroup>
            <ListGroup.Item>Privacy policy</ListGroup.Item>
            <ListGroup.Item>Cookie policy</ListGroup.Item>
            <ListGroup.Item>Terms & Conditions</ListGroup.Item>
            <ListGroup.Item>Rules</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={2}>
          <h5 className="footer-col-title text-center social">SOCIAL</h5>
          <ListGroup>
            <ListGroup.Item className="d-flex align-items-center justify-content-center">
              <BsFacebook className="icon me-2" />
              <span className="ms-3">Facebook</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center justify-content-center">
              <BsYoutube className="icon me-2" />
              <span className="ms-3">YouTube</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center justify-content-center">
              <BsInstagram className="icon me-2" />
              <span className="ms-3">Instagram</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center justify-content-center">
              <BsTwitter className="icon me-2" />
              <span className="ms-3">Twitter</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="pt-5 mb-5">
        <Col xs={12} className="d-flex justify-content-center">
          <img src={logo} alt="company logo" style={{ width: 280 + "px" }} />
        </Col>
      </Row>
    </>
  );
};
