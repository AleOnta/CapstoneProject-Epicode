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
import {
  PreferenceState,
  setBg,
  setRemember,
  setShowCP,
} from "../../features/preferenceSlice";

export const NavbarComponent = () => {
  let location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // retrieve persisted preferences redux slice and rehydrate it
    let persistedPreferences = localStorage.getItem("my-thynk-preferences");
    if (persistedPreferences) {
      let preferences: PreferenceState = JSON.parse(persistedPreferences);
      dispatch(setRemember(preferences.remember));
      dispatch(setBg(preferences.bg));
      dispatch(setShowCP(preferences.showCP));

      // if user checked remember data while last login, than automatically try to login
      if (preferences.remember) {
        let persistedTokenExpiration = localStorage.getItem(
          "my-thynk-token-expiration"
        );
        if (persistedTokenExpiration) {
          let expiration = new Date(JSON.parse(persistedTokenExpiration));
          let validation = compareAsc(expiration, new Date());
          switch (validation) {
            case 0 || 1: {
              const persistedUsername =
                localStorage.getItem("my-thynk-username");
              persistedUsername &&
                dispatch(fetchUser(JSON.parse(persistedUsername)));
              break;
            }
            case -1: {
              console.log("expired token");
              break;
            }
          }
        }
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
