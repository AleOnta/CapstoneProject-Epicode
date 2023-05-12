import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { NavbarComponent } from "./components/navbar/NavbarComponent"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <Container fluid className='p-0'>
      <NavbarComponent/>
    </Container>
    </BrowserRouter>
  );
}

export default App;
