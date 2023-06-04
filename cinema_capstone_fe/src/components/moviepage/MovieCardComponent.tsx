import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { MovieDynamicSpecs } from "./MovieDynamicSpecs";
import { Cast, TMDBCast } from "../../interfaces/iMovies";
import { IMovieProps } from "../../interfaces/CommonInterfaces";

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
        <Card className="d-flex flex-column flex-md-row align-items-center border-0">
          <Card.Img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt="movie poster"
            className="movie-poster"
          />
          <Card.Body className="d-flex flex-column justify-content-around ps-md-3 ps-xl-5 pb-0">
            <Card.Title className="text-center text-md-start">
              {movie.title}
            </Card.Title>
            <Card.Text className="genres-container d-flex flex-wrap">
              {movie.genre.split("|").map((genre, index) => (
                <span className="movie-genre p-1 me-2 rounded" key={index}>
                  {genre}
                </span>
              ))}
            </Card.Text>
            <Card.Text className="mb-3 mb-md-1">
              <span className="row-content ">Production Companies:</span>
              {movie.prodCompany.includes("|") ? (
                movie.prodCompany.split("|").map((company, index) => (
                  <span className="movie-company " key={index}>
                    {`${company}${
                      index === movie.prodCompany.split("|").length - 1
                        ? "."
                        : ", "
                    }`}
                  </span>
                ))
              ) : (
                <span className="movie-company">{movie.prodCompany}</span>
              )}
            </Card.Text>
            <Card.Text className="cast-container">
              <span className="row-content">Cast:</span>
              {cast.length > 0 && !isLoading ? (
                cast.map((member, index) => (
                  <span className="movie-cast-member" key={member.credit_id}>
                    {`${member.name}${index === cast.length - 1 ? "." : ", "}`}
                  </span>
                ))
              ) : (
                <span className="movie-cast-member">
                  Not available at the moment: {error}
                </span>
              )}
            </Card.Text>
            <Card.Text>
              <span className="row-content">Plot:</span>
              <span className="actual-plot mb-5">{movie.plot}</span>
            </Card.Text>
            <MovieDynamicSpecs movie={movie} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
