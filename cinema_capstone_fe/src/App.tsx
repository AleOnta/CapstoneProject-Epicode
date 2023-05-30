import "./App.scss";
import "@stripe/stripe-js";
import {
  fetchMovies,
  setInRoomMovies,
  setIncomingMovies,
} from "./features/movieSlice";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IMovie } from "./interfaces/iMovies";
import { fetchNews } from "./features/newsSlice";
import { fetchRooms } from "./features/roomSlice";
import { AppDispatch, RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms } from "./features/programSlice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { NavbarComponent } from "./components/navbar/NavbarComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomepageComponent } from "./components/homepage/HomepageComponent";
import { UserPageComponent } from "./components/userpage/UserPageComponent";
import { AuthPageComponent } from "./components/authpage/AuthPageComponent";
import { MoviePageComponent } from "./components/moviepage/MoviePageComponent";
import { ProgramsPageComponent } from "./components/programspage/ProgramsPageComponent";
import { CheckoutPageComponent } from "./components/checkoutpage/CheckoutPageComponent";
import { CancelPageComponent } from "./components/checkoutpage/paymentresult/CancelPageComponent";
import { SuccessPageComponent } from "./components/checkoutpage/paymentresult/SuccessPageComponent";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const store = useSelector((state: RootState) => state);
  const [moviesLoad, setMoviesLoad] = useState<boolean>(false);

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
    retrieveInRoomMovies();
    retrieveIncomingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.programs.incoming, store.programs.onGoing]);

  useEffect(() => {
    if (store.movies.incoming.length > 0 && store.movies.inRoom.length > 0) {
      setTimeout(() => setMoviesLoad(true), 1500);
    }
  }, [store.movies.incoming, store.movies.inRoom]);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchPrograms());
    dispatch(fetchRooms());
    dispatch(fetchNews());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container fluid className="p-0 app-container">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route
              path="/home"
              element={<HomepageComponent moviesLoad={moviesLoad} />}
            />
            <Route path="/programs" element={<ProgramsPageComponent />} />
            <Route path="/focus-movie/:id" element={<MoviePageComponent />} />
            <Route path="/auth/:type" element={<AuthPageComponent />} />
            <Route path="/reserved-area/user" element={<UserPageComponent />} />
            <Route path="/check-out/:id" element={<CheckoutPageComponent />} />
            <Route path="/success" element={<SuccessPageComponent />} />
            <Route path="/cancelled" element={<CancelPageComponent />} />
          </Routes>
        </Container>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
