import "./Navbar.scss";
import avatar from "../../assets/imgs/avatar_placeholder.svg";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const UserCardComponent = () => {
  const user = useSelector((state: RootState) => state.user.logged_in);

  return (
    <Col xs={2} className="d-flex justify-content-center">
      {user ? (
        <Link to={"/reserved-area/user"}>
          <Card className="navbar-userCard p-1">
            <Card.Body className="d-flex align-items-center justify-content-around p-0">
              <img
                src={avatar}
                alt="user-pic"
                height={45}
                width={45}
                className="userCard-pic"
              />
              <div className="userCard-data">
                <Card.Title className="userCard-title">
                  {user.username}
                </Card.Title>
                <Card.Text className="userCard-paragraphs">
                  <p>{`${user.firstname} ${user.lastname}`}</p>
                  <p>Points: {user.cinemaPoints}</p>
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
