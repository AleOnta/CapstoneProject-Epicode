import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NavbarComponent } from "./components/navbar/NavbarComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomepageComponent } from "./components/homepage/HomepageComponent";
import { ProgramsPageComponent } from "./components/programspage/ProgramsPageComponent";
import { MoviePageComponent } from "./components/moviepage/MoviePageComponent";

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="p-0 app-container">
        <NavbarComponent />
        <Routes>
          <Route path="/home" element={<HomepageComponent />} />
          <Route path="/programs" element={<ProgramsPageComponent />} />
          <Route path="/focus-movie/:id" element={<MoviePageComponent />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
