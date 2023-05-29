import "./Modals/Modals.scss";
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
import { AuthenticationModal } from "./Modals/AuthenticationModal";
import { ConfirmationModal } from "./Modals/ConfirmationModal";

export const CheckoutPageComponent = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const store = useSelector((state: RootState) => state);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [toProceed, setToProceed] = useState<Boolean>(false);
  const [confModalShow, setConfModalShow] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] = useState<IProgram>();
  const [selectedDateAndTime, setSelectedDateAndTime] = useState<DateAndTime>({
    date: new Date(),
    time: "",
  });

  const dateAndTimeToString = ({ date, time }: DateAndTime) => {
    if (date) {
      const convertedDate = new Date(date).toISOString().slice(0, 10);
      let convertedTime = time.slice(0, 2);

      if (Number(convertedTime) > 12) {
        return `${convertedDate} | ${time} PM`;
      } else {
        return `${convertedDate} | ${time} AM`;
      }
    }
  };

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

  const handlePickedData = (pick: Date) => {
    const rawDate = new Date(pick);
    rawDate.setDate(rawDate.getDate() + 1);
    const toDispatch = rawDate.toISOString().slice(0, 10);
    dispatch(setPickedDate(toDispatch));
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
  }, [store.programs.onGoing]);

  useEffect(() => {
    setSelectedDateAndTime({ date: null, time: "" });
  }, [store.user.logged_in]);

  return (
    <Row>
      {store.programs.onGoing.length > 0 && (
        <>
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
                              <span
                                className="genre mx-1 p-1 rounded"
                                key={index}
                              >
                                {genre +
                                  (index !==
                                  selectedProgram.movie.genre.split("|")
                                    .length -
                                    1
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
                            .map((company, index) => (
                              <span key={index + "-company"}>{company}</span>
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
                                selectedProgram &&
                                new Date(selectedProgram?.toDate)
                              }
                              value={selectedDateAndTime?.date}
                              onChange={(newValue) => {
                                setSelectedDateAndTime({
                                  date: newValue,
                                  time: "",
                                });
                                newValue && handlePickedData(newValue);
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
                                .map((time, index) => (
                                  <option value={time} key={index + "-time"}>
                                    {time}
                                  </option>
                                ))}
                            </Form.Select>
                          </span>
                        </Col>
                        <Col
                          xs={12}
                          className="recap-container py-4 px-4 rounded"
                        >
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="me-2 mb-0">Selected date:</h6>
                            <p className="mb-0">
                              {selectedDateAndTime.time.length > 0 &&
                                dateAndTimeToString(selectedDateAndTime)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="me-2 mb-0">Selected seats:</h6>
                            <p className="mb-0">
                              {store.checkout.pickedSeats.length > 0
                                ? store.checkout.pickedSeats.map(
                                    (seat, index) => (
                                      <span
                                        className="mapped-seat me-2"
                                        key={index + "-seat"}
                                      >
                                        {seat +
                                          (index !==
                                          store.checkout.pickedSeats.length - 1
                                            ? ","
                                            : ".")}
                                      </span>
                                    )
                                  )
                                : "no seat selected"}
                            </p>
                          </div>
                          <hr />
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="me-2 mb-0">Total costs:</h6>
                            <p className="mb-0">
                              €
                              {selectedProgram?.price &&
                                store.checkout.pickedSeats.length > 0 &&
                                determinePrice(selectedProgram.price) *
                                  store.checkout.pickedSeats.length}
                            </p>
                          </div>

                          <Button
                            variant={`secondary w-100 mt-3 check-out-button ${
                              !toProceed && "disabled"
                            }`}
                            onClick={() => {
                              !store.user.logged_in
                                ? setModalShow(true)
                                : setConfModalShow(true);
                            }}
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
            <AuthenticationModal show={modalShow} setShow={setModalShow} />
            <ConfirmationModal
              show={confModalShow}
              setShow={() => setConfModalShow(false)}
            />
          </Col>
        </>
      )}
    </Row>
  );
};
