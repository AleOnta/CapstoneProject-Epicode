import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { RootState } from "../../../app/store";
import { IRoom } from "../../../interfaces/iRoom";
import { SeatMapComponent } from "./SeatMapComponent";
import { ITicket } from "../../../interfaces/iTicket";
import { IProgram, IProgramMovie } from "../../../interfaces/iProgram";

interface SeatPickerProps {
  program: IProgram;
}

export const SeatPickerComponent = ({ program }: SeatPickerProps) => {
  const roomsStore = useSelector((state: RootState) => state.rooms.allRooms);
  const pickedDateAndTime = useSelector(
    (state: RootState) => state.checkout.pickedDateAndTime
  );
  const [relatedMovie, setRelatedMovie] = useState<IProgramMovie>();
  const [relatedRoom, setRelatedRoom] = useState<IRoom | null>();
  const [seats, setSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const generateMapArray = (totalSeats: number) => {
    switch (totalSeats) {
      case 96: {
        setSeats(Array.from({ length: 8 * 12 }, (_, i) => i));
        break;
      }
      case 120: {
        setSeats(Array.from({ length: 8 * 15 }, (_, i) => i));
        break;
      }
      case 160: {
        setSeats(Array.from({ length: 8 * 20 }, (_, i) => i));
        break;
      }
      default: {
        setSeats(Array.from({ length: 8 * 12 }, (_, i) => i));
      }
    }
  };

  const findOccupiedSeats = (ticketsArray: ITicket[]) => {
    const newOccupiedSeatsArray: number[] = [];
    ticketsArray
      .filter(
        (ticket) =>
          new Date(ticket.perDate).toISOString().slice(0, 10) ===
          pickedDateAndTime.date
      )
      .filter((ticket) => ticket.hours === pickedDateAndTime.time)
      .forEach((ticket) => {
        const seatCodeArray = ticket.seatCode.split("-");
        newOccupiedSeatsArray.push(Number(seatCodeArray[1]));
        setOccupiedSeats(newOccupiedSeatsArray);
      });
    console.log("new", newOccupiedSeatsArray);
  };

  const handleSelectedSeats = (seatsArray: number[]) => {
    setSelectedSeats(seatsArray);
  };

  useEffect(() => {
    setRelatedMovie(program.movie);
    setRelatedRoom(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (roomsStore.length > 0) {
      setRelatedRoom(
        roomsStore.find((room) => room.name === program.room.name)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsStore]);

  useEffect(() => {
    if (relatedRoom) {
      generateMapArray(relatedRoom.totalSeats);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatedRoom]);

  useEffect(() => {
    setOccupiedSeats([]);
    relatedRoom && findOccupiedSeats(relatedRoom.tickets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedDateAndTime]);

  return (
    <Row className="d-flex justify-content-center">
      <Col
        xs={8}
        md={6}
        className="movie-spec mb-3 rounded d-flex align-items-center justify-content-center"
      >
        <p className="movie-name p-2 mb-0 text-center">{relatedMovie?.title}</p>
      </Col>
      <Col
        xs={10}
        className="legend d-flex align-items-center justify-content-center rounded"
      >
        <ul
          className="d-flex align-items-center justify-content-center p-2 mb-3 rounded "
          style={{ listStyle: "none" }}
        >
          <li className="d-flex align-items-center">
            <span className="seat me-1" />
            <p className="mb-0 me-3">N/A</p>
          </li>
          <li className="d-flex align-items-center">
            <span className="seat me-1 selected" />
            <p className="mb-0 me-3">Selected</p>
          </li>
          <li className="d-flex align-items-center">
            <span className="seat me-1 occupied" />
            <p className="mb-0 me-3">Occupied</p>
          </li>
        </ul>
      </Col>
      {relatedMovie &&
        selectedSeats &&
        occupiedSeats &&
        seats.length > 0 &&
        !isLoading && (
          <SeatMapComponent
            seats={seats}
            selectedMovie={relatedMovie}
            occupiedSeats={occupiedSeats}
            selectedSeats={selectedSeats}
            setSelectedSeats={handleSelectedSeats}
          />
        )}
    </Row>
  );
};
