import "./ProgramsPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ProgramsCard } from "./ProgramsCard";
import { IMovie } from "../../interfaces/iMovies";
import { Col, Container, Row } from "react-bootstrap";
import { ProgramsNewsCard } from "./ProgramsNewsCard";

export const ProgramsPageComponent = () => {
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

  return (
    <Row>
      <Col xs={12}>
        <Container>
          <Row>
            <Col xs={8}>
              <h2 className="py-5 title-program-section">
                CURRENTLY IN PROJECTION:
              </h2>
              <Row>
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
              xs={4}
              className=" py-5 d-flex flex-column news-programs-container"
            >
              <h4>NEWS</h4>
              {store.news.status === "fulfilled"
                ? store.news.allNews.map((news) => (
                    <ProgramsNewsCard news={news} key={news.id} />
                  ))
                : null}
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};
