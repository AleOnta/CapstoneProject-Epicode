import { Button, Col, Container, Row } from "react-bootstrap";
import { FooterComponent } from "../../footer/FooterComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const CancelPageComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 6000);
  }, []);

  return (
    <>
      <Container className="cancel-page-container rounded mb-5 d-flex flex-column justify-content-center">
        <Row className="d-flex justify-content-center">
          <Col
            xs={12}
            xl={8}
            className="d-flex justify-content-center mt-5 pt-2"
          >
            <h2 className="cancel-title text-center">
              OPERATION CANCELLED SUCCESSFULLY!
            </h2>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5 pt-4">
          <Col
            xs={12}
            md={10}
            xl={8}
            className="d-flex flex-column align-items-center"
          >
            <p className="cancel-desc text-center">
              Dear customer, the purchase operation has been correctly cancelled
              as you requested. <br />
              No funds were whitdrawn from your balance. <br />
              <br />
              Please note that the operation has been completly cancelled and
              non tickets were emitted at your name. <br />
              If you want to assists at the movie projection, please repeat the
              check-out process and complete the payment.
            </p>
            <p className="cancel-desc pt-3 text-center">
              Click on the button below to get back to the homepage or wait 5s
              to be automatically redirected to it.
            </p>
            <Button
              variant="outline-light"
              className="mt-3 mb-5"
              onClick={() => {
                setTimeout(() => {
                  navigate("/home");
                }, 500);
              }}
            >
              Homepage
            </Button>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col xs={12}>
          <FooterComponent />
        </Col>
      </Row>
    </>
  );
};
