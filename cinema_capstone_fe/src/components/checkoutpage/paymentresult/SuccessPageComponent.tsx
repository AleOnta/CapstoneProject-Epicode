import "./PaymentResults.scss";
import { useState, useEffect } from "react";
import { CheckOutState } from "../../../features/checkoutSlice";
import { Card, Col, Container, Row } from "react-bootstrap";
import QRCode from "react-qr-code";
import { FooterComponent } from "../../footer/FooterComponent";
import axios from "axios";

export const SuccessPageComponent = () => {
  const [result, setResult] = useState<boolean>(false);
  const ticketURL = "http://localhost:8080/api/tickets";
  const [checkoutData, setCheckoutData] = useState<CheckOutState | null>(null);

  // const reserveTicket = async (data: CheckOutState) => {
  //   await axios.post(`${ticketURL}/${""}`)
  // }

  useEffect(() => {
    const receivedData = sessionStorage.getItem("checkoutData");
    receivedData && setCheckoutData(JSON.parse(receivedData));
  }, []);
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center success-container py-5 rounded">
          <Col xs={12} className="d-flex flex-column align-items-center">
            <h2>PAYMENT FULFILLED</h2>
            <h2>THANK YOU FOR YOUR PURCHASE!</h2>
          </Col>
          <Col
            xs={12}
            className="recap-card-container mt-5 mb-4 d-flex flex-column align-items-center"
          >
            <h4>RECAP:</h4>
            {checkoutData?.pickedProgram && (
              <Card className="d-flex flex-column flex-lg-row align-items-center recap-card">
                <Card.Img
                  src={`https://image.tmdb.org/t/p/w500${checkoutData?.pickedProgram.movie.posterPath}`}
                  alt="movie poster"
                />
                <div className="movie-data d-lg-flex flex-column justify-content-center">
                  <Card.Header className="mb-lg-4">
                    <h5>{checkoutData.pickedProgram.movie.title}</h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Theather:{" "}
                      <span
                        className={`px-2 py-1 rounded ${checkoutData.pickedProgram.room.name}`}
                      >
                        {checkoutData.pickedProgram.room.name}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Date and time:{" "}
                      <span>{`${checkoutData.pickedDateAndTime.date} - ${checkoutData.pickedDateAndTime.time}`}</span>
                    </Card.Text>
                    <Card.Text>
                      Movie length:{" "}
                      <span>
                        {checkoutData.pickedProgram.movie.filmLength} min
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Selected seats:{" "}
                      {checkoutData.pickedSeats.map((seat, index) => (
                        <span className="mapped-seat">
                          {seat +
                            (index !== checkoutData.pickedSeats.length - 1
                              ? ","
                              : ".")}
                        </span>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </div>
              </Card>
            )}
          </Col>
          <Col
            xs={12}
            className="mt-5 qr-code-container d-flex flex-column align-items-center"
          >
            <Card className="qr-code-card py-4">
              <Card.Header className="d-flex flex-column align-items-center ">
                <h6>Here is the QR Code</h6>
                <p>Use it at the theather check in!</p>
              </Card.Header>
              <Card.Body className="mx-5 py-4 rounded d-flex justify-content-center">
                <QRCode
                  size={300}
                  bgColor="white"
                  fgColor="black"
                  value={`user: TBD - theather: ${
                    checkoutData?.pickedProgram?.room.name
                  } - movie: ${
                    checkoutData?.pickedProgram?.movie.title
                  } - date: ${checkoutData?.pickedDateAndTime.date} - time: ${
                    checkoutData?.pickedDateAndTime.time
                  } - seats: [${checkoutData?.pickedSeats.map(
                    (seat, index) =>
                      seat +
                      (index !== checkoutData?.pickedSeats.length - 1
                        ? ", "
                        : "")
                  )}]`}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col xs={12} className="mt-5">
          <FooterComponent />
        </Col>
      </Row>
    </>
  );
};
