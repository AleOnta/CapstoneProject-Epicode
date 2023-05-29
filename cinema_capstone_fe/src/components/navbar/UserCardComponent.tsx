import "./Navbar.scss";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const UserCardComponent = () => {
  const userStore = useSelector((state: RootState) => state.user);
  const preferencesStore = useSelector((state: RootState) => state.preferences);

  return (
    <Col
      xs={6}
      md={2}
      className="d-flex justify-content-center aling-items-center p-0"
    >
      {userStore.logged_in ? (
        <Link to={"/reserved-area/user"} className="user-card-a-wrapper ">
          <Card className="navbar-userCard">
            <Card.Body className="d-flex align-items-center justify-content-around p-0 p-xl-1">
              <div
                className="userCard-pic mx-1 mx-md-0 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: preferencesStore.bg }}
              >
                <span>
                  {userStore.logged_in.firstname.charAt(0) +
                    " " +
                    userStore.logged_in.lastname.charAt(0)}
                </span>
              </div>
              <div className="userCard-data">
                <Card.Title className="userCard-title">
                  {userStore.logged_in.username}
                </Card.Title>
                <Card.Text className="userCard-paragraphs d-flex flex-column">
                  <span>{`${userStore.logged_in.firstname} ${userStore.logged_in.lastname}`}</span>
                  {preferencesStore.showCP && (
                    <span>Points: {userStore.logged_in.cinemaPoints}</span>
                  )}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      ) : (
        <div className="d-flex align-items-center">
          <h5 className="navbar-userLinks mb-0">
            <Link to="/auth/register">Sign-up</Link>
          </h5>
          <h5 className="px-2 mb-0 divider"> | </h5>
          <h5 className="navbar-userLinks mb-0">
            <Link to="/auth/login">Sign-in</Link>
          </h5>
        </div>
      )}
    </Col>
  );
};
