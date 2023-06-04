import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GrSearchAdvanced } from "react-icons/gr";
import { Button, Card, CardImg, Col } from "react-bootstrap";
import { IMovieProps } from "../../interfaces/CommonInterfaces";

export const ProgramsCard = ({ program, movie }: IMovieProps) => {
  // fare funzione per retrieve room

  return (
    <Col
      xs={12}
      className="card-column p-0 d-flex flex-column align-items-center"
    >
      <h4 className={`py-2 rounded ${program?.room.name}`}>
        THEATHER: {program?.room.name.toUpperCase()}
      </h4>
      <Card className="program-card">
        <span className="d-flex flex-column flex-md-row align-items-center ">
          <CardImg
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt="movie poster"
            className="card-img"
          ></CardImg>
          <Card.Body className="d-flex flex-column justify-content-around p-lg-0 ps-lg-3">
            <Card.Title>{movie.title}</Card.Title>
            <hr className="card-hr" />
            <div className="d-flex flex-column justify-content-end">
              <Card.Text className="m-0 production">
                <span>Producers:</span>{" "}
                {movie.prodCompany
                  .split("|")
                  .map(
                    (prod, index) =>
                      prod +
                      (index !== movie.prodCompany.split("|").length - 1
                        ? ", "
                        : ".")
                  )}
              </Card.Text>
              <Card.Text className="m-0">
                <span>Length:</span> {`${movie.filmLength} min`}
              </Card.Text>
              <Card.Text className="mt-3">
                <span>Plot:</span> {movie.plot}
              </Card.Text>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly mt-3">
              <Link to={`/focus-movie/${movie.id}`}>
                <Button
                  type="button"
                  className="btn mb-2 mb-md-0 btn-block btn-round"
                >
                  <span className="span-tag">Read more</span>
                  <div className="icon icon-round d-flex align-items-center justify-content-center">
                    <GrSearchAdvanced className="card-btn-icon fs-5" />
                  </div>
                </Button>
              </Link>
              <Link to={`/check-out/${program?.id}`}>
                <Button
                  type="button"
                  className="btn mb-2 mb-md-0 btn-block btn-round"
                >
                  <span className="span-tag">Purchase</span>
                  <div className="icon icon-round d-flex align-items-center justify-content-center">
                    <BsCart4 className="card-btn-icon fs-5" />
                  </div>
                </Button>
              </Link>
            </div>
          </Card.Body>
        </span>
      </Card>
      <hr className="divisor" />
    </Col>
  );
};
