import "./CheckoutPage.scss";
import { DatePicker } from "@mui/x-date-pickers";
import { Card, Col, Container, Row } from "react-bootstrap";
import { CheckOutProps } from "../../interfaces/CommonInterfaces";
import { FooterComponent } from "../footer/FooterComponent";
import { SeatPickerComponent } from "./seatpicker/SeatPickerComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "../../interfaces/iMovies";
import { IProgram } from "../../interfaces/iProgram";

export const CheckoutPageComponent = () => {
  const { id } = useParams();
  const store = useSelector((state: RootState) => state);
  const [selectedProgram, setSelectedProgram] = useState<IProgram>();

  useEffect(() => {
    setSelectedProgram(store.programs.allprograms[Number(id)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col xs={12}>
        <Container className="check-out-container">
          <Row>
            <Col xs={12} className="mt-5">
              <h3 className="check-out-title mt-3">Check-Out:</h3>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="check-out-card d-flex flex-row align-items-center">
                <Card.Img src="" alt="movie poster" />
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="movie-data">
                    <Card.Title>
                      Titolo del movie più o meno lungo quanto
                    </Card.Title>
                    <Card.Text className="card-genres">
                      Paura tremenda aiut ciao
                    </Card.Text>
                    <Card.Text className="card-data">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Totam sed illo, eaque a voluptatem pariatur in vero
                      consequatur rem nihil eius molestias! Laudantium explicabo
                      ipsam, fugit commodi cupiditate sint iure!
                    </Card.Text>
                  </div>
                  <div className="purchase-costs">
                    <p className="mb-1">Tickets n: 2</p>
                    <p className="mb-1">Price: €14,60</p>
                  </div>
                </Card.Body>
              </Card>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="check-out-main">
              <h5>Seats selection:</h5>
              <Row className="d-flex justify-content-around align-items-center">
                <Col xs={8} className="map-seats-container">
                  {selectedProgram && (
                    <SeatPickerComponent program={selectedProgram} />
                  )}
                </Col>
                <Col xs={3} className="date-container">
                  <DatePicker />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row>
                <h5 className="payments-title">Payment methods:</h5>
                <Col className="payments-container"></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col xs={12}>
        <FooterComponent />
      </Col>
    </Row>
  );
};
