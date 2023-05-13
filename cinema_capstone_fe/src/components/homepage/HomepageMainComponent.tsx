import "./HomePage.scss";
import { Col, Container, Row } from "react-bootstrap";

export const HomepageMainComponent = () => {
  return (
    <Container className="homepage">
      <Row>
        <Col xs={12}>
          <h2 className="homepage-mainTitle">Ongoing Projections</h2>
        </Col>
        <Col xs={12}>
          <h5 className="homepage-secondTitle">News</h5>
        </Col>
        <Col xs={12}>
          <h5 className="homepage-secondTitle">Incoming</h5>
        </Col>
      </Row>
    </Container>
  );
};
