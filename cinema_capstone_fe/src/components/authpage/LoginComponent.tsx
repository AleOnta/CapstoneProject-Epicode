import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { LoginDto } from "../../interfaces/iUser";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AuthComponentProps } from "../../interfaces/CommonInterfaces";
import { fetchUser } from "../../features/userSlice";

export const LoginComponent = ({
  successCallback,
  failureCallback,
}: AuthComponentProps) => {
  const loginURL = "http://localhost:8080/api/auth/login";
  const dispatch: AppDispatch = useDispatch();
  const [validated, setValidated] = useState<boolean | undefined>(false);
  const [loginDto, setLoginDto] = useState<LoginDto>({
    username: "",
    password: "",
  });

  const handleStorage = (propName: string, value: string) => {
    localStorage.setItem(propName, JSON.stringify(value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // validation
    setValidated(true);
    await axios
      .post(
        loginURL,
        JSON.stringify({
          username: loginDto.username,
          password: loginDto.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response?.status === 200) {
          console.log(response);
          successCallback("Logged in!");
          const data = response.data;
          let expiration = new Date();
          expiration.setDate(expiration.getDate() + 7);
          handleStorage("user", loginDto.username);
          handleStorage("tkn", data.accessToken);
          handleStorage("expiration", expiration.toISOString().slice(0, 10));
        }
      })
      .then(() => {
        dispatch(fetchUser(loginDto.username));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
          failureCallback(error.response?.data.message);
        }
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
      <Row>
        <Form.Group
          as={Col}
          xs={12}
          controlId="formGridUsername"
          className="login"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="create a username"
            value={loginDto.username}
            required
            onChange={(e) => {
              setLoginDto({
                ...loginDto,
                username: e.target.value,
              });
            }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formGridPassword" className="login">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="create a password"
            value={loginDto.password}
            required
            onChange={(e) => {
              setLoginDto({
                ...loginDto,
                password: e.target.value,
              });
            }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center" xs={12}>
          <Button
            variant="outline-light"
            className={`register-button`}
            type="submit"
          >
            Login
          </Button>
          <p className="mt-4 paragraph-link">
            Don't have an account? Click{" "}
            <Link to="/auth/register" className="link-to-login">
              here to register
            </Link>
            .
          </p>
        </Col>
      </Row>
    </Form>
  );
};
