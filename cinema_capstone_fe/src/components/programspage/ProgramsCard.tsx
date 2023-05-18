import { BsCart4 } from "react-icons/bs";
import { GrSearchAdvanced } from "react-icons/gr";
import { Button, Card, CardImg, Col } from "react-bootstrap";
import { IMovieProps } from "../../interfaces/CommonInterfaces";
import { Link } from "react-router-dom";

export const ProgramsCard = ({ program, movie }: IMovieProps) => {
  // fare funzione per retrieve room

  return (
    <Col xs={12} className="card-column">
      <h4 className={`py-2 rounded ${program?.room.name}`}>
        THEATHER: {program?.room.name.toUpperCase()}
      </h4>
      <Card className="d-flex flex-row align-items-center program-card">
        <CardImg
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt="movie poster"
          className="card-img"
        ></CardImg>
        <Card.Body className="d-flex flex-column justify-content-around">
          <Card.Title>{movie.title}</Card.Title>
          <hr className="card-hr" />
          <div className="d-flex flex-column justify-content-end">
            <Card.Text className="m-0">
              <span>Producers:</span> {movie.prodCompany}
            </Card.Text>
            <Card.Text className="m-0">
              <span>Length:</span> {movie.filmLength}
            </Card.Text>
            <Card.Text className="mt-3">
              <span>Plot:</span> {movie.plot}
            </Card.Text>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button className="p-3 card-button cart">
            <Link to={`/check-out/${program?.id}`}>
              <BsCart4 className="card-btn-icon" />
            </Link>
          </Button>
          <Button className="p-3 card-button go-spec">
            <Link to={`/focus-movie/${movie.id}`}>
              <GrSearchAdvanced className="card-btn-icon" />
            </Link>
          </Button>
        </Card.Footer>
      </Card>
      <hr className="divisor" />
    </Col>
  );
};
