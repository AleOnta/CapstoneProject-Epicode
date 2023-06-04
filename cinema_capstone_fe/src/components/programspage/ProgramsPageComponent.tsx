import "./ProgramsPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ProgramsCard } from "./ProgramsCard";
import { IMovie } from "../../interfaces/iMovies";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProgramsNewsCard } from "./ProgramsNewsCard";
import { FooterComponent } from "../footer/FooterComponent";
import { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router";

export const ProgramsPageComponent = () => {
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => state);

  const getRelatedMovie = (movieId: number) => {
    let relatedMovie: IMovie | undefined = store.movies.allMovies.find(
      (movie) => movie.id === movieId
    );
    if (relatedMovie === undefined) {
      return (relatedMovie = {
        id: -1,
        tmdbId: -1,
        title: "to be defined",
        plot: "...",
        genre: "to be defined",
        prodCompany: "to be defined",
        posterPath:
          "https://events.isc2.org/assets/images/image_placeholder.jpg",
        castPath: "to be defined",
        trailerID: "notFound",
        budget: 0,
        revenue: 0,
        filmLength: 0,
        popularity: 0,
        releaseDate: new Date(),
        vote: 0,
      });
    } else {
      return relatedMovie;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Row>
      <Col xs={12} className="p-0">
        <Container className="p-0 mb-5">
          <div className="top-btn-container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between px-3">
            <h2 className="title-program-section p-3 ">
              CURRENTLY IN PROJECTION:
            </h2>
            <Button
              type="button"
              className="btn mt-3 mt-lg-0 btn-block btn-round program-home-button program-btn"
              onClick={() => navigate("/redirect-to-home/programs")}
            >
              <span className="span-tag">Homepage</span>
              <div className="icon icon-round d-flex align-items-center justify-content-center">
                <AiOutlineHome className="card-btn-icon fs-5" />
              </div>
            </Button>
          </div>
          <Row className="row-container-program m-0 d-flex justify-content-center justify-content-lg-between">
            <Col xs={12} lg={8} className="programs-container px-4 rounded">
              <Row className="p-0 d-flex flex-column align-items-center">
                {store.programs.status === "fulfilled"
                  ? store.programs.onGoing.map((program) => (
                      <ProgramsCard
                        program={program}
                        movie={getRelatedMovie(program.movie.id)}
                        key={program.id}
                      />
                    ))
                  : null}
              </Row>
            </Col>
            <Col
              xs={10}
              md={8}
              lg={4}
              className="d-flex flex-column aling-items-center news-programs-container py-3 px-4 mt-4 mt-lg-0 rounded"
            >
              <h4 className="px-2 py-1 mb-3 rounded">NEWS</h4>
              {store.news.status === "fulfilled"
                ? store.news.allNews.map((news) => (
                    <ProgramsNewsCard news={news} key={news.id} />
                  ))
                : null}
            </Col>
          </Row>
        </Container>
        <FooterComponent />
      </Col>
    </Row>
  );
};
