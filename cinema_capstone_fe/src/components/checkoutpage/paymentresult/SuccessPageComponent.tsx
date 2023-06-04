import axios from "axios";
import "./PaymentResults.scss";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { IUserSafe } from "../../../interfaces/iUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../features/userSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../app/store";
import { FooterComponent } from "../../footer/FooterComponent";
import { fetchPrograms } from "../../../features/programSlice";
import { CheckOutState } from "../../../features/checkoutSlice";
import { fetchRooms } from "../../../features/roomSlice";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";

export const SuccessPageComponent = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const JSONusername = secureLocalStorage.getItem("my-thynk-username") as
    | string
    | null;
  const receivedData = sessionStorage.getItem("my-thynk-checkout-cart");
  const ticketURL = "http://localhost:8080/api/tickets";
  const [result, setResult] = useState<boolean>(false);
  const [fulfilled, setFulfilled] = useState<boolean>(false);
  const [checkoutData, setCheckoutData] = useState<CheckOutState | null>(null);
  const userData = useSelector((state: RootState) => state.user.logged_in);
  const userPreferences = useSelector((state: RootState) => state.preferences);

  const determinePrice = (priceId: string) => {
    switch (priceId) {
      case "price_1NArYmIBuKJCZStF7phyinwz": {
        return 7.5;
      }
      case "price_1NArZwIBuKJCZStF2JFdiB1J": {
        return 7.5;
      }
      case "price_1NAracIBuKJCZStFRyyt96J1": {
        return 8.2;
      }
      default: {
        return 0.0;
      }
    }
  };

  const determineSeatCode = (seat: string) => {
    let convertedSeatCode = "";
    switch (checkoutData?.pickedProgram?.room.name) {
      case "blue": {
        convertedSeatCode = "B-" + seat;
        break;
      }
      case "green": {
        convertedSeatCode = "G-" + seat;
        break;
      }
      case "red": {
        convertedSeatCode = "R-" + seat;
        break;
      }
    }

    return convertedSeatCode;
  };

  const handleTkn = () => {
    switch (userPreferences.remember) {
      case true: {
        const tkn = secureLocalStorage.getItem("my-thynk-token") as
          | string
          | null;
        if (tkn) return tkn;
        break;
      }
      case false: {
        const tkn = sessionStorage.getItem("my-thynk-token");
        if (tkn) return JSON.parse(tkn);
        break;
      }
    }
  };

  const reserveTicket = (data: CheckOutState, user: IUserSafe) => {
    const responseArray: number[] = [];
    data.pickedSeats.forEach(async (seat) => {
      await axios
        .post(
          `${ticketURL}/${user.id}/${data?.pickedProgram?.id}`,
          JSON.stringify({
            emitDate: new Date().toISOString().slice(0, 10),
            perDate: checkoutData?.pickedDateAndTime.date,
            hours: checkoutData?.pickedDateAndTime.time,
            seatCode: determineSeatCode(seat),
            price:
              data.pickedProgram?.price &&
              determinePrice(data?.pickedProgram?.price),
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${handleTkn()}`,
            },
          }
        )
        .then((response) => {
          responseArray.push(response.status);
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            console.log(error);
          }
        });
    });
    if (!responseArray.includes(404) || !responseArray.includes(401)) {
      setResult(true);
      setFulfilled(true);
      dispatch(fetchPrograms());
      dispatch(fetchRooms);
      JSONusername && dispatch(fetchUser(JSONusername));
    }
  };

  useEffect(() => {
    JSONusername && dispatch(fetchUser(JSONusername));
    receivedData && setCheckoutData(JSON.parse(receivedData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!fulfilled) {
      if (checkoutData && userData) {
        reserveTicket(checkoutData, userData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutData, userData]);

  return (
    <>
      <Container>
        {result && (
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
                    size={200}
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
        )}
      </Container>
      <Row>
        <Col xs={12} className="success-home-btn d-flex justify-content-center">
          <Button
            type="button"
            className="btn mt-5 btn-block btn-round success-home-button success-btn"
            onClick={() => navigate("/redirect-to-home")}
          >
            <span className="span-tag">Get back to homepage</span>
            <div className="icon icon-round d-flex align-items-center justify-content-center">
              <AiOutlineHome className="card-btn-icon fs-5" />
            </div>
          </Button>
        </Col>
        <Col xs={12} className="mt-5">
          <FooterComponent />
        </Col>
      </Row>
    </>
  );
};
