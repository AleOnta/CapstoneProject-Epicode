import "./App.scss";
import "@stripe/stripe-js";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IMovie } from "./interfaces/iMovies";
import { fetchNews } from "./features/newsSlice";
import { fetchRooms } from "./features/roomSlice";
import { AppDispatch, RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms } from "./features/programSlice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { NavbarComponent } from "./components/navbar/NavbarComponent";
import { HomepageComponent } from "./components/homepage/HomepageComponent";
import { AuthPageComponent } from "./components/authpage/AuthPageComponent";
import { MoviePageComponent } from "./components/moviepage/MoviePageComponent";
import { ProgramsPageComponent } from "./components/programspage/ProgramsPageComponent";
import { CheckoutPageComponent } from "./components/checkoutpage/CheckoutPageComponent";
import {
  fetchMovies,
  setInRoomMovies,
  setIncomingMovies,
} from "./features/movieSlice";

function App() {
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
    dispatch(fetchRooms());
    dispatch(fetchNews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    retrieveInRoomMovies();
    retrieveIncomingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.programs.incoming]);

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container fluid className="p-0 app-container">
          <NavbarComponent />
          <Routes>
            <Route path="/home" element={<HomepageComponent />} />
            <Route path="/programs" element={<ProgramsPageComponent />} />
            <Route path="/focus-movie/:id" element={<MoviePageComponent />} />
            <Route path="/check-out/:id" element={<CheckoutPageComponent />} />
            <Route path="/auth/:type" element={<AuthPageComponent />} />
          </Routes>
        </Container>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
