import "./AuthPage.scss";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import logo from "../../assets/imgs/cinemaLogo.png";
import { Button, Col, Form, Row } from "react-bootstrap";
import { UserDto } from "../../interfaces/iUser";

export const AuthPageComponent = () => {
  const [isCompiled, setIsCompiled] = useState<Boolean>(false);
  const [userDto, setUserDto] = useState<UserDto>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    birthdate: new Date(),
    password: "",
  });

  useEffect(() => {
    userDto.firstname.length > 0 &&
      userDto.lastname.length > 0 &&
      userDto.username.length > 0 &&
      userDto.email.length > 0 &&
      userDto.password.length > 7 &&
      setIsCompiled(true);
  }, [userDto]);

  return (
    <>
      <img src={logo} alt="cinema logo" className="auth-logo" />
      <div className="register-column rounded p-4 d-flex flex-column justify-content-center">
        <h3 className="register-title mb-0">REGISTER</h3>
        <hr />
        <Form>
          <Row>
            <Form.Group as={Col} xs={12} xl={6} controlId="formGridFirstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                placeholder="your firstname"
                value={userDto.firstname}
                onChange={(e) => {
                  setUserDto({
                    ...userDto,
                    firstname: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} xl={6} controlId="formGridLastname">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                placeholder="your lastname"
                value={userDto.lastname}
                onChange={(e) => {
                  setUserDto({
                    ...userDto,
                    lastname: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} xs={12} xl={6} controlId="formGridUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="create a username"
                value={userDto.username}
                onChange={(e) => {
                  setUserDto({
                    ...userDto,
                    username: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              xl={6}
              className="birthdate-input"
              controlId="formGridBirthdate"
            >
              <Form.Label>Birthdate</Form.Label>
              <DatePicker
                value={userDto.birthdate}
                onChange={(value) => {
                  value &&
                    setUserDto({
                      ...userDto,
                      birthdate: value,
                    });
                }}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email address"
                value={userDto.email}
                onChange={(e) => {
                  setUserDto({
                    ...userDto,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="create a password"
                value={userDto.password}
                onChange={(e) => {
                  setUserDto({
                    ...userDto,
                    password: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="d-flex justify-content-center">
            <Button
              variant="outline-light"
              className={`register-button px-0 ${!isCompiled && "disabled"}`}
            >
              Register now
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};
