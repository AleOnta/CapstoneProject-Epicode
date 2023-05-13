import { Col, Row } from "react-bootstrap";
import { SwiperComponent } from "./SwiperComponent";
import { HomepageMainComponent } from "./HomepageMainComponent";

export const HomepageComponent = () => {
  return (
    <Row className="m-0">
      <Col xs={12} className="px-2 py-5 d-flex justify-content-center">
        <SwiperComponent />
      </Col>
      <Col xs={12}>
        <HomepageMainComponent />
      </Col>
    </Row>
  );
};
