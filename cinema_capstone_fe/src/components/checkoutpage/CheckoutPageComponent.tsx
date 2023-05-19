import "./CheckoutPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { IProgram } from "../../interfaces/iProgram";
import { FooterComponent } from "../footer/FooterComponent";
import { DateAndTime } from "../../interfaces/CommonInterfaces";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { SeatPickerComponent } from "./seatpicker/SeatPickerComponent";
import {
  setPickedDate,
  setPickedProgram,
  setPickedTime,
} from "../../features/checkoutSlice";

export const CheckoutPageComponent = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const store = useSelector((state: RootState) => state);
  const [selectedProgram, setSelectedProgram] = useState<IProgram>();
  const [toProceed, setToProceed] = useState<Boolean>(false);
  const [selectedDateAndTime, setSelectedDateAndTime] = useState<DateAndTime>({
    date: new Date(),
    time: "",
  });

  const dateAndTimeToString = ({ date, time }: DateAndTime) => {
    if (date) {
      const convertedDate = new Date(date).toISOString().slice(0, 10);
      let convertedTime = time;
      if (Number(time.slice(0, 1)) > 12) {
        convertedTime += " PM";
      } else {
        convertedTime += " AM";
      }
      return convertedDate + " | " + convertedTime;
    }
  };

  useEffect(() => {
    if (
      selectedDateAndTime.date &&
      selectedDateAndTime.time !== "" &&
      store.checkout.pickedSeats.length > 0
    ) {
      setToProceed(true);
    } else {
      setToProceed(false);
    }
  }, [selectedDateAndTime, store.checkout.pickedSeats]);

  useEffect(() => {
    const program = store.programs.onGoing.find(
      (program) => program.id === Number(id)
    );
    setSelectedProgram(program);
    dispatch(setPickedProgram(program));
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
              {selectedProgram && (
                <Card className="check-out-card d-flex flex-row align-items-center">
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/w500${selectedProgram.movie.posterPath}`}
                    alt="movie poster"
                  />
                  <Card.Body className="movie-data h-100">
                    <Card.Title>{selectedProgram.movie.title}</Card.Title>
                    <Card.Text className="card-genres mb-5">
                      {selectedProgram.movie.genre
                        .split("|")
                        .map((genre, index) => (
                          <span className="genre mx-1 p-1 rounded">
                            {genre +
                              (index !==
                              selectedProgram.movie.genre.split("|").length - 1
                                ? ", "
                                : ".")}
                          </span>
                        ))}
                    </Card.Text>
                    <Card.Text className="card-data ">
                      {selectedProgram.movie.plot}
                    </Card.Text>
                    <Card.Text className="card-data mb-0">
                      Length: {selectedProgram.movie.filmLength} min
                    </Card.Text>
                    <Card.Text className="card-data mb-0">
                      Produced by:
                      {selectedProgram.movie.prodCompany
                        .split("|")
                        .map((company) => (
                          <span>{company}</span>
                        ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
              <hr />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="check-out-main">
              <h5 className="p-3">Seats selection:</h5>
              <Row className="d-flex justify-content-around align-items-center">
                <Col xs={7} className="map-seats-container">
                  {selectedProgram && (
                    <SeatPickerComponent program={selectedProgram} />
                  )}
                </Col>
                <Col xs={4} className="h-100">
                  <Row className="d-flex flex-column justify-content-between h-100">
                    <Col
                      xs={12}
                      className="date-container py-4 px-4 rounded mb-5"
                    >
                      <span className="d-flex align-items-center justify-content-between mb-3">
                        <Form.Label className="me-3 mb-0">
                          Select a date:
                        </Form.Label>
                        <DatePicker
                          className="mb-3 date-picker-custom"
                          disablePast
                          maxDate={
                            selectedProgram && new Date(selectedProgram?.toDate)
                          }
                          value={selectedDateAndTime?.date}
                          onChange={(newValue) => {
                            setSelectedDateAndTime({
                              date: newValue,
                              time: "",
                            });
                            dispatch(
                              setPickedDate(
                                newValue?.toISOString().slice(0, 10)
                              )
                            );
                          }}
                        />
                      </span>
                      <span className="d-flex align-items-center justify-content-between">
                        <Form.Label className=" mb-0">
                          Select an hour:
                        </Form.Label>
                        <Form.Select
                          className="hour-select"
                          value={selectedDateAndTime.time}
                          onChange={(e) => {
                            setSelectedDateAndTime({
                              ...selectedDateAndTime,
                              time: e.target.value,
                            });
                            dispatch(setPickedTime(e.target.value));
                          }}
                        >
                          <option>available hours</option>
                          {selectedProgram?.room.timetables
                            .split("|")
                            .map((time) => (
                              <option value={time}>{time}</option>
                            ))}
                        </Form.Select>
                      </span>
                    </Col>
                    <Col xs={12} className="recap-container py-4 px-4 rounded">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="me-2 mb-0">Selected date:</h6>
                        <p className="mb-0">
                          {dateAndTimeToString(selectedDateAndTime)}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="me-2 mb-0">Selected seats:</h6>
                        <p className="mb-0">
                          {store.checkout.pickedSeats.length > 0
                            ? store.checkout.pickedSeats.map((seat, index) => (
                                <span className="mapped-seat me-2">
                                  {seat +
                                    (index !==
                                    store.checkout.pickedSeats.length - 1
                                      ? ","
                                      : ".")}
                                </span>
                              ))
                            : "no seat selected"}
                        </p>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="me-2 mb-0">Total costs:</h6>
                        <p className="mb-0">
                          €
                          {store.checkout.pickedSeats.length > 0 &&
                          selectedProgram
                            ? store.checkout.pickedSeats.length *
                              selectedProgram?.price
                            : "0.00"}
                        </p>
                      </div>

                      <Button
                        variant={`secondary w-100 mt-3 check-out-button ${
                          !toProceed && "disabled"
                        }`}
                      >
                        Confirm and pay
                      </Button>
                    </Col>
                  </Row>
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
