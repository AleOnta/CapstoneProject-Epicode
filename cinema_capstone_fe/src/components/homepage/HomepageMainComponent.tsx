import { Col, Container, Row } from "react-bootstrap";

export const HomepageMainComponent = () => {
  return (
    <Container className="">
      <Row>
        <Col xs={12}>
          <h2>Currently in Theathers</h2>
        </Col>
        <Col xs={12}>
          <h5>News</h5>
        </Col>
        <Col xs={12}>
          <h5>Incoming</h5>
        </Col>
      </Row>
    </Container>
  );
};
