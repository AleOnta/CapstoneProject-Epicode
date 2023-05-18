import { useEffect, useState } from "react";
import { IRoom } from "../../../interfaces/iRoom";
import { Col, Row } from "react-bootstrap";
import { MdEventSeat } from "react-icons/md";
import { IMovie } from "../../../interfaces/iMovies";
import { SeatMapComponent } from "./SeatMapComponent";
import { IProgram, IProgramMovie } from "../../../interfaces/iProgram";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface SeatPickerProps {
  program: IProgram;
}

export const SeatPickerComponent = ({ program }: SeatPickerProps) => {
  const roomsStore = useSelector((state: RootState) => state.rooms.allRooms);
  const [relatedMovie, setRelatedMovie] = useState<IProgramMovie>();
  const [relatedRoom, setRelatedRoom] = useState<IRoom>();

  useEffect(() => {
    setRelatedMovie(program.movie);
    setRelatedRoom(roomsStore[program.room.id]);
  }, []);

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} className="movie-spec d-flex align-items-center">
        <p>Selected movie</p>
        <p className="movie-name">movie.title</p>
      </Col>
      <Col xs={10} className="legend d-flex align-items-center rounded">
        <ul
          className="d-flex align-items-center"
          style={{ listStyle: "none", padding: 0 }}
        >
          <li className="d-flex align-items-center">
            <MdEventSeat />
            <p>N/A</p>
          </li>
          <li className="d-flex align-items-center">
            <MdEventSeat />
            <p>Selected</p>
          </li>
          <li className="d-flex align-items-center">
            <MdEventSeat />
            <p>Occupied</p>
          </li>
        </ul>
      </Col>
      <Col xs={10} className="recap"></Col>
    </Row>
  );
};

//   const defineRoomSeats = (totalSeats: number) => {
//     switch (totalSeats) {
//       case 100: {
//         return [
//           ["-nnnnnnnnnn-"],
//           ["-nnnnnnnnnn-"],
//           ["-nnnnnnnnnn-"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["nnnnnnnnnnnn"],
//           ["nnnnnnnnnnnn"],
//           ["nnnnnnnnnnnn"],
//           ["vvvvvvvvvvvv"],
//         ];
//       }
//       case 110: {
//         return [
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["vvvvvvvvvvvv"],
//         ];
//       }
//       case 160: {
//         return [
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["nnnnnnnnnnnn"],
//           ["-nnnnnnnnnn-"],
//           ["-nnnnnnnnnn-"],
//           ["-nnnnnnnnnn-"],
//           ["-vvvvvvvvvv-"],
//           ["-vvvvvvvvvv-"],
//         ];
//       }
//     }
//   };
