import { Col, Row } from "react-bootstrap";
import { SwiperComponent } from "./home_swiper/SwiperComponent";
import { HomepageMainComponent } from "./home_main/HomepageMainComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchMovies, setIncomingMovies } from "../../features/movieSlice";
import { fetchPrograms } from "../../features/programSlice";
import { fetchNews } from "../../features/newsSlice";
import { IMovie } from "../../interfaces/iMovies";
import { setInRoomMovies } from "../../features/movieSlice";
import { FooterComponent } from "../footer/FooterComponent";

export const HomepageComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const store = useSelector((state: RootState) => state);

  const getMoviesById = (idsArray: number[]) => {
    const moviesArray: IMovie[] = [];
    idsArray.forEach((id) => {
      const movieFound = store.movies.allMovies.find(
        (movie) => movie.id === id
      );
      if (movieFound !== undefined) {
        moviesArray.push(movieFound);
      }
    });
    console.log(moviesArray);
    return moviesArray;
  };

  const retrieveInRoomMovies = () => {
    const onGoingMoviesIDs = store.programs.onGoing.map((p) => p.movie.id);
    const onGoingMovies = getMoviesById(onGoingMoviesIDs);
    dispatch(setInRoomMovies(onGoingMovies));
  };

  const retrieveIncomingMovies = () => {
    const incomingMoviesIDs = store.programs.incoming.map((p) => p.movie.id);
    const incomingMovies = getMoviesById(incomingMoviesIDs);
    dispatch(setIncomingMovies(incomingMovies));
  };

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchPrograms());
    dispatch(fetchNews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    retrieveInRoomMovies();
    retrieveIncomingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.programs.incoming]);

  return (
    <Row className="m-0">
      <Col xs={12} className="px-0 py-5 d-flex justify-content-center">
        <SwiperComponent />
      </Col>
      <Col xs={12}>
        <HomepageMainComponent />
      </Col>
      <Col xs={12}>
        <FooterComponent />
      </Col>
    </Row>
  );
};
