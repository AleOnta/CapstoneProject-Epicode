import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setBg, setShowCP } from "../../../features/userSlice";

export const UserPreferences = () => {
  const dispatch: AppDispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.user);

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
          defaultValue={userStore.bg}
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
          checked={userStore.showCP}
          onChange={() => dispatch(setShowCP(!userStore.showCP))}
        />
      </Form>
    </Col>
  );
};
