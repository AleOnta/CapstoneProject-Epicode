import axios from "axios";
import { useEffect, useState } from "react";
import { LoginDto } from "../../interfaces/iUser";
import { fetchUser } from "../../features/userSlice";
import secureLocalStorage from "react-secure-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AuthComponentProps } from "../../interfaces/CommonInterfaces";
import { PreferenceState, setRemember } from "../../features/preferenceSlice";

export const LoginComponent = ({
  successCallback,
  failureCallback,
  redirectCallback,
}: AuthComponentProps) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const loginURL = "http://localhost:8080/api/auth/login";
  const dispatch: AppDispatch = useDispatch();
  const preferencesStore = useSelector((state: RootState) => state.preferences);
  const [validated, setValidated] = useState<boolean | undefined>(false);
  const [loginDto, setLoginDto] = useState<LoginDto>({
    username: "",
    password: "",
    remember: false,
  });

  const handleSecureStorage = (
    propName: string,
    value: string | PreferenceState
  ) => {
    secureLocalStorage.setItem(propName, value);
  };

  const handleSessionStorage = (propName: string, value: string) => {
    sessionStorage.setItem(propName, JSON.stringify(value));
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
    dispatch(setRemember(loginDto.remember));
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
          successCallback("Logged in!");
          redirectCallback &&
            redirectCallback("You'll be redirected in a few moments");
          const data = response.data;
          // always save username in LS
          handleSecureStorage("my-thynk-username", loginDto.username);

          switch (loginDto.remember) {
            case true: {
              let expiration = new Date();
              expiration.setDate(expiration.getDate() + 7);
              handleSecureStorage("my-thynk-token", data.accessToken);
              handleSecureStorage(
                "my-thynk-token-expiration",
                expiration.toISOString().slice(0, 10)
              );
              handleSecureStorage("my-thynk-preferences", preferencesStore);
              break;
            }
            case false: {
              handleSessionStorage("my-thynk-username", loginDto.username);
              handleSessionStorage("my-thynk-token", data.accessToken);
            }
          }
        }
      })
      .then(() => {
        dispatch(fetchUser(loginDto.username));
        if (location.includes("/auth/login-ch")) {
          setTimeout(() => {
            navigate(-1);
          }, 4000);
        } else {
          setTimeout(() => {
            navigate("/home");
          }, 4000);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
          error.response?.status === 401 &&
            failureCallback("Wrong username or password!");
          error.response?.status !== 401 &&
            failureCallback("Error has occured, try again!");
        }
      });
  };

  useEffect(() => {
    const localUsername = secureLocalStorage.getItem("my-thynk-username") as
      | string
      | null;
    if (localUsername) {
      setLoginDto({
        ...loginDto,
        username: localUsername,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Form.Group
          as={Col}
          controlId="formGridRemember"
          className="mb-1 mt-3 d-flex aling-items-center"
        >
          <InputGroup.Checkbox
            className="m-0"
            aria-label="Checkbox for following text input"
            value={loginDto.remember}
            onChange={() => {
              setLoginDto({
                ...loginDto,
                remember: !loginDto.remember,
              });
              dispatch(setRemember(!loginDto.remember));
            }}
          />
          <Form.Label className="m-0 ps-2 checkbox-label">
            Remember me
          </Form.Label>
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
          <p className="mt-3 paragraph-link">
            Don't have an account? Click
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
