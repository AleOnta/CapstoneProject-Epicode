import "../HomePage.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../app/store";
import { MovieHomeCard } from "./MovieHomeCard";
import { IMovie } from "../../../interfaces/iMovies";
import { Col, Container, Row } from "react-bootstrap";
import { HomeLoaderProps } from "../HomepageComponent";
import { NewsSwiper } from "../home_swiper/NewsSwiper";

export const HomepageMainComponent = ({ moviesLoad }: HomeLoaderProps) => {
  const store = useSelector((state: RootState) => state);
  const [onGoingMovies, setOnGoingMovies] = useState<IMovie[]>([]);
  const [incomingMovies, setIncomingMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    if (moviesLoad) {
      setOnGoingMovies(store.movies.inRoom);
      setIncomingMovies(store.movies.incoming);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesLoad]);

  return (
    <Container className="homepage">
      <Row className="mt-5">
        <Col xs={12} className="homepage-main-content-column mb-5 py-5">
          <Row className="home-movies-row">
            <Col xs={12} className="p-0">
              <Link to="/programs">
                <h2 className="homepage-mainTitle mb-5 p-3">
                  ON-GOING PROJECTIONS
                </h2>
              </Link>
            </Col>
            <Col
              xs={12}
              className="d-flex flex-column flex-md-row flex-wrap align-items-center on-going-card-container"
            >
              {moviesLoad ? (
                onGoingMovies.map((movie, index) => (
                  <MovieHomeCard
                    movie={movie}
                    program={store.programs.onGoing[index]}
                    key={movie.tmdbId}
                  />
                ))
              ) : (
                <div className="d-flex justify-content-center align-items-center w-100">
                  <span className="loader"></span>
                </div>
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="homepage-main-content-column mb-5 py-5">
          <Row>
            <Col xs={12} className="p-0">
              <h5 className="homepage-secondTitle mb-5 p-3">NEWS</h5>
            </Col>
            <Col
              xs={12}
              className="d-flex justify-content-center px-4 py-5 news-container"
            >
              <NewsSwiper />
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="homepage-main-content-column mb-5 py-5">
          <h5 className="homepage-secondTitle mb-5 p-3">INCOMING</h5>
          <Row className="home-movies-row">
            <Col
              xs={12}
              className="d-flex flex-column flex-md-row flex-wrap align-items-center on-going-card-container"
            >
              {moviesLoad ? (
                incomingMovies.map((movie) => (
                  <MovieHomeCard movie={movie} key={movie.tmdbId} />
                ))
              ) : (
                <div className="d-flex justify-content-center align-items-center w-100">
                  <span className="loader"></span>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
