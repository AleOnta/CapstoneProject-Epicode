import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDto } from "../../interfaces/iUser";
import { DatePicker } from "@mui/x-date-pickers";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AuthComponentProps } from "../../interfaces/CommonInterfaces";

export const RegisterComponent = ({
  successCallback,
  failureCallback,
}: AuthComponentProps) => {
  const registerURL = "http://localhost:8080/api/auth/register";
  const [validated, setValidated] = useState<boolean | undefined>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [userDto, setUserDto] = useState<UserDto>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    birthdate: new Date(),
    password: "",
    role: ["ROLE_CUSTOMER"],
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    await axios
      .post(
        registerURL,
        JSON.stringify({
          firstname: userDto.firstname,
          lastname: userDto.lastname,
          username: userDto.username,
          email: userDto.email,
          password: userDto.password,
          birthdate: userDto.birthdate.toISOString().slice(0, 10),
          roles: userDto.role,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response?.status === 201) {
          successCallback(response.data);
          setIsSuccessful(true);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          failureCallback(error.response?.data.message);
        }
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
      {isSuccessful ? (
        <Row className="">
          <h3 className="mb-0 mt-5 fs-5">
            Registration completed successfully.
          </h3>
          <h3 className="mt-3 fs-5">Welcome into THYNK Media.</h3>
          <p className="fs-6 mt-5">
            <Link to="/auth/login" className="link-to-login me-1">
              Click here
            </Link>
            to proceed with the
            <Link to="/auth/login" className="link-to-login ms-1">
              Login
            </Link>
            .
          </p>
        </Row>
      ) : (
        <>
          <Row>
            <Form.Group as={Col} xs={12} xl={6} controlId="formGridFirstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                placeholder="your firstname"
                value={userDto.firstname}
                required
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
                required
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
                required
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
                required
                onChange={(e) => {
                  setUserDto({
                    ...userDto,
                    email: e.target.value,
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="create a password"
                value={userDto.password}
                required
                onChange={(e) => {
                  setUserDto({
                    ...userDto,
                    password: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
              <Button
                variant="outline-light"
                className={`register-button px-0`}
                type="submit"
              >
                Register now
              </Button>
            </Col>
            <p className="mt-3 paragraph-link">
              Already have an account? Click
              <Link to="/auth/login" className="link-to-login ms-1">
                here to login
              </Link>
              .
            </p>
          </Row>
        </>
      )}
    </Form>
  );
};
