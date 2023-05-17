import "./MoviePage.scss";
import { Col, Container, Row } from "react-bootstrap";
import { MovieCardComponent } from "./MovieCardComponent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const MoviePageComponent = () => {
  const { id } = useParams();
  const moviesStore = useSelector((state: RootState) => state.movies.allMovies);
  const movieOnFocus = moviesStore.find((movie) => movie.id === Number(id));

  return (
    <Row>
      <Col xs={12}>
        <Container>
          {movieOnFocus && (
            <>
              <MovieCardComponent movie={movieOnFocus} />
              <Row className="movie-trailer-container">
                <Col xs={12}>
                  <h4>Watch "{movieOnFocus.title}" trailer!</h4>
                </Col>
                <Col xs={12}></Col>
              </Row>
            </>
          )}
        </Container>
      </Col>
    </Row>
  );
};
