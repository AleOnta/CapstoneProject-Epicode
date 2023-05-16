import "../HomePage.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { MovieNewsCard } from "./MovieNewsCard";
import { MovieHomeCard } from "./MovieHomeCard";
import { Link } from "react-router-dom";

export const HomepageMainComponent = () => {
  const store = useSelector((state: RootState) => state);

  return (
    <Container className="homepage">
      <Row>
        <Col xs={12} className="homepage-main-content-column mb-5 py-5">
          <Link to="/programs">
            <h2 className="homepage-mainTitle  pb-4">Ongoing Projections</h2>
          </Link>
          <Row>
            <Col xs={12} className="d-flex justify-content-around">
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
          <h5 className="homepage-secondTitle pb-4">News</h5>
          <Row>
            <Col xs={12} className="d-flex justify-content-around">
              {store.news.status === "fulfilled"
                ? store.news.allNews.map((news) => (
                    <MovieNewsCard news={news} key={news.id} />
                  ))
                : null}
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="homepage-main-content-column mb-5 py-5">
          <h5 className="homepage-secondTitle  pb-4">Incoming</h5>
          <Row>
            <Col xs={12} className="d-flex justify-content-around">
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
