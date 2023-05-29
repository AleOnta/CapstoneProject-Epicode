import axios from "axios";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { IMovieProps } from "../../interfaces/CommonInterfaces";
import { useEffect, useState } from "react";
import { Cast, TMDBCast } from "../../interfaces/iMovies";
import { MovieDynamicSpecs } from "./MovieDynamicSpecs";

export const MovieCardComponent = ({ movie }: IMovieProps) => {
  const defaultCast: Cast[] = [];
  const [cast, setCast] = useState<Cast[]>(defaultCast);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string>("");

  const castURL = `https://api.themoviedb.org/3/movie${movie.castPath}`;

  useEffect(() => {
    axios
      .get<TMDBCast>(castURL, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
        },
      })
      .then((response) => {
        const castToSort = response.data.cast.sort((a, b) =>
          a.popularity < b.popularity ? 1 : -1
        );
        setCast(castToSort.slice(0, 8));
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((ex) => {
        const error =
          ex.response.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
        setError(error);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="movie-card-container">
      <Col xs={12}>
        {cast.length > 0 && !isLoading ? (
          <Card className="d-flex flex-row align-items-center border-0">
            <Card.Img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt="movie poster"
              className="movie-poster"
            />
            <Card.Body className="d-flex flex-column justify-content-around ps-5 pb-0">
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text className="genres-container">
                {movie.genre.split("|").map((genre, index) => (
                  <span className="movie-genre p-1 me-2 rounded" key={index}>
                    {genre}
                  </span>
                ))}
              </Card.Text>
              <Card.Text className="mb-1">
                <span className="row-content">Production Companies:</span>
                {movie.prodCompany.includes("|") ? (
                  movie.prodCompany.split("|").map((company, index) => (
                    <span className="movie-company ms-1" key={index}>
                      {`${company}${
                        index === movie.prodCompany.split("|").length - 1
                          ? "."
                          : ","
                      }`}
                    </span>
                  ))
                ) : (
                  <span className="movie-company">{movie.prodCompany}</span>
                )}
              </Card.Text>
              <h6 className="card-subtitle text-muted mb-4">
                Cast:
                {cast.map((member, index) => (
                  <span
                    className="movie-cast-member ms-1"
                    key={member.credit_id}
                  >
                    {`${member.name}${index === cast.length - 1 ? "." : ","}`}
                  </span>
                ))}
              </h6>
              <Card.Text>
                <span className="row-content">Plot:</span>
                <span className="actual-plot mb-5"> {movie.plot}</span>
              </Card.Text>
              <MovieDynamicSpecs movie={movie} />
            </Card.Body>
          </Card>
        ) : (
          <Alert variant="danger">
            Error creating the movie's card: {error}
          </Alert>
        )}
      </Col>
    </Row>
  );
};
