import "./MoviePage.scss";
import { Col, Container, Row } from "react-bootstrap";
import { MovieCardComponent } from "./MovieCardComponent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import YouTube from "react-youtube";
import { FooterComponent } from "../footer/FooterComponent";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useEffect, useState } from "react";

export const MoviePageComponent = () => {
  const { id } = useParams();
  const { width } = useWindowDimensions();
  const [letLoad, setLetLoad] = useState<boolean>(true);
  const [letTrailerLoad, setLetTrailerLoad] = useState<boolean>(true);
  const moviesStore = useSelector((state: RootState) => state.movies.allMovies);
  const movieOnFocus = moviesStore.find((movie) => movie.id === Number(id));

  const opts_xs = {
    height: "200",
    width: "290",
  };

  const opts_sm = {
    height: "250",
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
    width: "1080",
  };

  const opts_xxl = {
    height: "700",
    width: "1250",
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => setLetLoad(false), 1000);
    setTimeout(() => setLetTrailerLoad(false), 1800);
  }, []);
  return (
    <Row>
      <Col xs={12}>
        <Container>
          {movieOnFocus && (
            <>
              {!letLoad ? (
                <MovieCardComponent movie={movieOnFocus} />
              ) : (
                <div className="moviepage-loader-container d-flex align-items-center justify-content-center">
                  <span className="loader"></span>
                </div>
              )}

              {!letTrailerLoad ? (
                <Row className="movie-trailer-container mt-5 py-3 pb-3 pb-md-5 px-md-5">
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
                              : width >= 1200 && width < 1400
                              ? opts_xl
                              : opts_xxl
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
              ) : (
                <div className="trailer-loader-container d-flex align-items-center justify-content-center">
                  <span className="loader"></span>
                </div>
              )}
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
