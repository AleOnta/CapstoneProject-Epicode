import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setBg, setShowCP } from "../../../features/preferenceSlice";
import { useEffect } from "react";
import { setRemember } from "../../../features/preferenceSlice";
import { logout } from "../../../features/userSlice";
import { useNavigate } from "react-router";

export const UserPreferences = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const preferenceStore = useSelector((state: RootState) => state.preferences);

  const userLogout = () => {
    // set of remember user data in local storage as false / prevents self login
    dispatch(setRemember(false));
    // return userSlice redux store as initialState
    dispatch(logout());
    // clearance of local storage from keys such as jwt token and its expiration
    localStorage.removeItem("my-thynk-token");
    localStorage.removeItem("my-thynk-token-expiration");
    // clearance of session storage from keys such as jwt token
    sessionStorage.removeItem("my-thynk-token");

    // navigate to homepage
    setTimeout(() => navigate("/home"), 500);
  };

  useEffect(() => {
    // save in local storage preferences update, if presents
    localStorage.setItem(
      "my-thynk-preferences",
      JSON.stringify(preferenceStore)
    );
  }, [preferenceStore]);

  return (
    <Col xs={12} className="preferences-container p-1">
      <h5 className="preferences-title mb-5">
        In this section, you can customize your experience and yours
        preferences:
      </h5>

      <Form>
        <h6 className="preference-item rounded">Account color:</h6>
        <p className="preference-desc mb-1">
          Pick a color form the color picker below as the background color of
          your account.
        </p>
        <Form.Label htmlFor="ColorInput" className="color-picker">
          Select a color:
        </Form.Label>
        <Form.Control
          type="color"
          id="ColorInput"
          defaultValue={preferenceStore.bg}
          title="Choose your color"
          onChange={(e) => dispatch(setBg(e.target.value))}
        />
        <h6 className="switch-items-title mt-5 rounded">Further options:</h6>
        <Form.Check
          type="switch"
          id="newsletter-switch"
          label="Subscribe to our newsletter!"
        />
        <Form.Check
          type="switch"
          id="discounts-switch"
          label="Receive offers and discounts updates!"
        />
        <Form.Check
          type="switch"
          id="cinema-points-switch"
          label="Show cinema point in your user card"
          checked={preferenceStore.showCP}
          onChange={() => dispatch(setShowCP(!preferenceStore.showCP))}
        />
      </Form>

      <Button
        variant="outline"
        className="logout-button mt-5 px-4"
        onClick={() => {
          userLogout();
        }}
      >
        Logout
      </Button>
    </Col>
  );
};
