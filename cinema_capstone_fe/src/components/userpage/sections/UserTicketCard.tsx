import { useState } from "react";
import { format } from "date-fns";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { UserTicketProps } from "../../../interfaces/iUser";

export const UserTicketCard = ({ ticket }: UserTicketProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <Col
      md={6}
      className="user-movie-card p-0"
      onClick={() => setClicked(!clicked)}
    >
      {!clicked ? (
        <img
          className="user-movie-img"
          src={`https://image.tmdb.org/t/p/w500/${ticket.boundFilm.posterPath}`}
          alt="movie poster"
        />
      ) : (
        <div className="user-movie-img qr-container d-flex align-items-center justify-content-center">
          <QRCode
            className="user-qr-code"
            size={175}
            bgColor="white"
            fgColor="black"
            value={`user: TBD - theather: ${ticket.boundRoom.name} - movie: ${ticket.boundFilm.title} - date: ${ticket.perDate} - time: ${ticket.hours} - seats: [${ticket.seatCode}]`}
          />
        </div>
      )}
      <Row className="user-movie-content px-0">
        <Col className="user-movie-content-header px-2 d-flex justify-content-between align-items-center">
          <Link to="">
            <h3 className="user-movie-title">{ticket.boundFilm.title}</h3>
          </Link>
          <div className="our-logo"></div>
        </Col>
        <div className="user-movie-info">
          <div className="user-info-section">
            <label>Date & Time</label>
            <span>{format(new Date(ticket.perDate), "ccc',   'd/L/u")}</span>
          </div>
          <div className="user-info-section">
            <label>Screen</label>
            <span>{ticket.boundRoom.name}</span>
          </div>

          <div className="user-info-section">
            <label>Seat</label>
            <span>{ticket.seatCode.split("-")[1]}</span>
          </div>
        </div>
      </Row>
    </Col>
  );
};
