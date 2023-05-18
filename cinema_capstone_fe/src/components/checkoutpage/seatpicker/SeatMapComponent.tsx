import { Col } from "react-bootstrap";
import { IMovie } from "../../../interfaces/iMovies";
import { IRoom } from "../../../interfaces/iRoom";
import { IProgram } from "../../../interfaces/iProgram";

interface SeatMapProps {
  movie: IMovie;
  room: IRoom;
  program: IProgram;
}

export const SeatMapComponent = ({ movie, room, program }: SeatMapProps) => {
  const handleSeatClick = () => {};

  return (
    <Col xs={8}>
      <div className="screen"></div>
      <div className="seats"></div>
    </Col>
  );
};
