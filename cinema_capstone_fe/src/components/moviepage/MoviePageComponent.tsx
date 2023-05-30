import "./MoviePage.scss";
import { Col, Container, Row } from "react-bootstrap";
import { MovieCardComponent } from "./MovieCardComponent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import YouTube from "react-youtube";
import { FooterComponent } from "../footer/FooterComponent";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useEffect } from "react";

export const MoviePageComponent = () => {
  const { id } = useParams();
  const moviesStore = useSelector((state: RootState) => state.movies.allMovies);
  const movieOnFocus = moviesStore.find((movie) => movie.id === Number(id));
  const { width, height } = useWindowDimensions();

  const opts_xs = {
    height: "200",
    width: "290",
  };

  const opts_sm = {
    height: "300",
    width: "450",
  };

  const opts_md = {
    height: "450",
    width: "670",
  };

  const opts_lg = {
    height: "550",
    width: "900",
  };

  const opts_xl = {
    height: "600",
    width: "1100",
  };

  return (
    <Row>
      <Col xs={12}>
        <Container>
          {movieOnFocus && (
            <>
              <MovieCardComponent movie={movieOnFocus} />
              <Row className="movie-trailer-container mt-5 py-3 pb-4 px-md-5">
                {movieOnFocus.trailerID !== "NotFound" ? (
                  <>
                    <Col
                      xs={12}
                      className="mb-2 mb-md-4 d-flex justify-content-center"
                    >
                      <h4>Watch "{movieOnFocus.title}" Official Trailer!</h4>
                    </Col>
                    <Col
                      xs={12}
                      className="youtube-frame-column d-flex justify-content-center"
                    >
                      <YouTube
                        videoId={movieOnFocus.trailerID}
                        opts={
                          width < 476
                            ? opts_xs
                            : width >= 476 && width < 768
                            ? opts_sm
                            : width >= 768 && width < 992
                            ? opts_md
                            : width >= 992 && width < 1200
                            ? opts_lg
                            : opts_xl
                        }
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
