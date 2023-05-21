import "./Navbar.scss";
import { useEffect } from "react";
import { compareAsc } from "date-fns";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useLocation } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";
import { fetchUser } from "../../features/userSlice";
import { UserCardComponent } from "./UserCardComponent";
import { Navbar, Container, Row } from "react-bootstrap";
import { SearchbarComponent } from "./searchbar/SearchbarComponent";

export const NavbarComponent = () => {
  let location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const jwtStringExp = localStorage.getItem("expiration");

    if (jwtStringExp !== null) {
      const jwtExpDate = new Date(jwtStringExp);
      const isStillValid = compareAsc(jwtExpDate, new Date());
      if (isStillValid === 0 || isStillValid === 1) {
        const username = localStorage.getItem("user");
        username && console.log(username.substring(1, username.length - 1));
        username &&
          dispatch(fetchUser(username.substring(1, username.length - 1)));
      } else {
        localStorage.clear();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navbar
      className={`globalNavbar ${
        (location.pathname === "/auth/login" ||
          location.pathname === "/auth/register") &&
        "d-none"
      }`}
    >
      <Container className="d-flex justify-content-center">
        <Row className="w-100 align-items-center justify-content-between">
          <LogoComponent />
          <SearchbarComponent />
          <UserCardComponent />
        </Row>
      </Container>
    </Navbar>
  );
};
