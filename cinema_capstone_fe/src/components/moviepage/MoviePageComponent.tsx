import "./MoviePage.scss";
import { Col, Container, Row } from "react-bootstrap";
import { MovieCardComponent } from "./MovieCardComponent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import YouTube from "react-youtube";
import { FooterComponent } from "../footer/FooterComponent";

export const MoviePageComponent = () => {
  const { id } = useParams();
  const moviesStore = useSelector((state: RootState) => state.movies.allMovies);
  const movieOnFocus = moviesStore.find((movie) => movie.id === Number(id));
  const opts = {
    height: "600",
    width: "950",
  };

  return (
    <Row>
      <Col xs={12}>
        <Container>
          {movieOnFocus && (
            <>
              <MovieCardComponent movie={movieOnFocus} />
              <Row className="movie-trailer-container mt-5 p-5">
                {movieOnFocus.trailerID !== "NotFound" ? (
                  <>
                    <Col xs={12} className="mb-4 d-flex justify-content-center">
                      <h4>Watch "{movieOnFocus.title}" Official Trailer!</h4>
                    </Col>
                    <Col
                      xs={12}
                      className="youtube-frame-column d-flex justify-content-center"
                    >
                      <YouTube
                        videoId={movieOnFocus.trailerID}
                        opts={opts}
                        className="frame"
                      />
                    </Col>
                  </>
                ) : (
                  <Col xs={12}>
                    <h4>
                      No trailers were found for "{movieOnFocus.title}" movie.
                    </h4>
                  </Col>
                )}
              </Row>
            </>
          )}
        </Container>
      </Col>
      <Col xs={12} className="mt-5">
        <FooterComponent />
      </Col>
    </Row>
  );
};
