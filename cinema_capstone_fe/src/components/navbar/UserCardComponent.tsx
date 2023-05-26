import "./Navbar.scss";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const UserCardComponent = () => {
  const userStore = useSelector((state: RootState) => state.user);
  return (
    <Col xs={2} className="d-flex justify-content-center">
      {userStore.logged_in ? (
        <Link to={"/reserved-area/user"}>
          <Card className="navbar-userCard p-1">
            <Card.Body className="d-flex align-items-center justify-content-around p-0">
              <div
                className="userCard-pic d-flex align-items-center justify-content-center"
                style={{ backgroundColor: userStore.bg }}
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
                <Card.Text className="userCard-paragraphs">
                  <p>{`${userStore.logged_in.firstname} ${userStore.logged_in.lastname}`}</p>
                  {userStore.showCP && (
                    <p>Points: {userStore.logged_in.cinemaPoints}</p>
                  )}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      ) : (
        <div className="d-flex ">
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
