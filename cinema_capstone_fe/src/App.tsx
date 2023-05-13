import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NavbarComponent } from "./components/navbar/NavbarComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomepageComponent } from "./components/homepage/HomepageComponent";

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="p-0">
        <NavbarComponent />
        <Routes>
          <Route path="/home" element={<HomepageComponent />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
