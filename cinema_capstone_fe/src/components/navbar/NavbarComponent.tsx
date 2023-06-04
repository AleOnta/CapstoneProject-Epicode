import "./Navbar.scss";
import { useEffect } from "react";
import { compareAsc } from "date-fns";
import {
  PreferenceState,
  setBg,
  setCommercialConsense,
  setNewsletterConsense,
  setRemember,
  setShowCP,
} from "../../features/preferenceSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useLocation } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";
import { fetchUser } from "../../features/userSlice";
import secureLocalStorage from "react-secure-storage";
import { UserCardComponent } from "./UserCardComponent";
import { Navbar, Container, Row } from "react-bootstrap";
import { SearchbarComponent } from "./searchbar/SearchbarComponent";

export const NavbarComponent = () => {
  let location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // retrieve persisted preferences redux slice and rehydrate it

    const securedPreferences = secureLocalStorage.getItem(
      "my-thynk-preferences"
    ) as PreferenceState | null;
    if (securedPreferences) {
      dispatch(setRemember(securedPreferences.remember));
      dispatch(setBg(securedPreferences.bg));
      dispatch(setShowCP(securedPreferences.showCP));
      dispatch(setCommercialConsense(securedPreferences.commercialConsense));
      dispatch(setNewsletterConsense(securedPreferences.newsletterConsense));

      // if user checked remember data while last login, than automatically try to login

      if (securedPreferences.remember) {
        const securedTokenExpiration = secureLocalStorage.getItem(
          "my-thynk-token-expiration"
        ) as string | null;
        if (securedTokenExpiration) {
          const expiration = new Date(securedTokenExpiration);
          const validation = compareAsc(expiration, new Date());
          switch (validation) {
            case 0 || 1: {
              const securedUsername = secureLocalStorage.getItem(
                "my-thynk-username"
              ) as string | null;
              securedUsername && dispatch(fetchUser(securedUsername));
              break;
            }
            case -1: {
              console.log("expired token");
              break;
            }
          }
        }
      } else {
        const sessionUsername = sessionStorage.getItem("my-thynk-username");
        if (sessionUsername) {
          dispatch(fetchUser(JSON.parse(sessionUsername)));
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
