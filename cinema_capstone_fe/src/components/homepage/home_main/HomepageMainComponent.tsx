import "../HomePage.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { MovieHomeCard } from "./MovieHomeCard";
import { Link } from "react-router-dom";
import { NewsSwiper } from "../home_swiper/NewsSwiper";

export const HomepageMainComponent = () => {
  const store = useSelector((state: RootState) => state);

  return (
    <Container className="homepage">
      <Row className="mt-5">
        <Col xs={12} className="homepage-main-content-column mb-5 py-5">
          <Row className="home-movies-row">
            <Col xs={12} className="p-0">
              <Link to="/programs">
                <h2 className="homepage-mainTitle mb-5 p-3">
                  ON-GOING PROJECTIONS
                  <hr className="m-0 " />
                </h2>
              </Link>
            </Col>
            <Col
              xs={12}
              className="d-flex flex-column flex-md-row flex-wrap align-items-center on-going-card-container"
            >
              {store.movies.inRoom.length > 0 &&
              store.programs.status === "fulfilled"
                ? store.movies.inRoom.map((movie, index) => (
                    <MovieHomeCard
                      movie={movie}
                      program={store.programs.onGoing[index]}
                      key={movie.tmdbId}
                    />
                  ))
                : null}
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="homepage-main-content-column mb-5 py-5">
          <Row>
            <Col xs={12} className="p-0">
              <h5 className="homepage-secondTitle mb-5 p-3">
                NEWS
                <hr className="m-0 " />
              </h5>
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
          <h5 className="homepage-secondTitle mb-5 p-3">
            INCOMING
            <hr className="m-0 " />
          </h5>
          <Row className="home-movies-row">
            <Col
              xs={12}
              className="d-flex flex-column flex-md-row flex-wrap align-items-center on-going-card-container"
            >
              {store.movies.incoming.length > 0 &&
              store.programs.status === "fulfilled"
                ? store.movies.incoming.map((movie) => (
                    <MovieHomeCard movie={movie} key={movie.tmdbId} />
                  ))
                : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
