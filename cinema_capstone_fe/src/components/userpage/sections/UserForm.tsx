import axios from "axios";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { UserDto } from "../../../interfaces/iUser";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { fetchUser } from "../../../features/userSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { Button, Col, FloatingLabel, Form } from "react-bootstrap";

export const UserForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const usersURL = "http://localhost:8080/api/users";
  const loginURL = "http://localhost:8080/api/auth/login";
  const currentUser = useSelector((state: RootState) => state.user);
  const userPreferences = useSelector((state: RootState) => state.preferences);
  const [validated, setValidated] = useState<boolean>(false);
  const [receivedValues, setReceivedValues] = useState<UserDto>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    birthdate: new Date(),
    role: ["ROLE_CUSTOMER"],
  });

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notifyFailure = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleTkn = () => {
    switch (userPreferences.remember) {
      case true: {
        const tkn = localStorage.getItem("tkn");
        if (tkn) return JSON.parse(tkn);
        break;
      }
      case false: {
        const tkn = sessionStorage.getItem("tkn");
        if (tkn) return JSON.parse(tkn);
        break;
      }
    }
  };

  const handleLocalStorage = (propName: string, value: string) => {
    localStorage.setItem(propName, JSON.stringify(value));
  };

  const handleSessionStorage = (propName: string, value: string) => {
    sessionStorage.setItem(propName, JSON.stringify(value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // validation
    setValidated(true);
    updateUser();
  };

  const updateUser = async () => {
    axios
      .put(
        usersURL,
        JSON.stringify({
          id: currentUser.logged_in?.id,
          firstname: receivedValues.firstname,
          lastname: receivedValues.lastname,
          username: receivedValues.username,
          email: receivedValues.email,
          password: receivedValues.password,
          birthdate: receivedValues.birthdate.toISOString().slice(0, 10),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${handleTkn()}`,
          },
        }
      )
      .then((response) => {
        response.status === 200 && notifySuccess("Credentials updated!");
        switch (userPreferences.remember) {
          case true: {
            handleLocalStorage("user", JSON.stringify(receivedValues.username));
            break;
          }
          case false: {
            handleSessionStorage(
              "user",
              JSON.stringify(receivedValues.username)
            );
            break;
          }
        }
      })
      .then(async () => {
        await dispatch(fetchUser(receivedValues.username));
        if (currentUser.status === "fulfilled") {
          await axios
            .post(
              loginURL,
              JSON.stringify({
                username: receivedValues.username,
                password: receivedValues.password,
              }),
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((response) => {
              if (response.status === 200) {
                const data = response.data;
                switch (userPreferences.remember) {
                  case true: {
                    let expiration = new Date();
                    expiration.setDate(expiration.getDate() + 7);
                    handleLocalStorage("tkn", data.accessToken);
                    handleLocalStorage(
                      "exp",
                      expiration.toISOString().slice(0, 10)
                    );
                    break;
                  }
                  case false: {
                    handleSessionStorage("user", receivedValues.username);
                    handleSessionStorage("tkn", data.accessToken);
                  }
                }
              }
            });
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
          error.response?.status === 401 &&
            notifyFailure("Error with the server, try again later!");
          error.response?.status === 406 && notifyFailure(error.response.data);
          error.response?.status !== 401 &&
            notifyFailure("Error has occured, try again!");
        }
      });
  };

  useEffect(() => {
    currentUser.logged_in &&
      setReceivedValues({
        firstname: currentUser.logged_in.firstname,
        lastname: currentUser.logged_in.lastname,
        username: currentUser.logged_in.username,
        email: currentUser.logged_in.email,
        password: "",
        birthdate: new Date(currentUser.logged_in.birthdate),
        role: ["ROLE_CUSTOMER"],
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col xs={12} className="user-form-container d-flex justify-content-center">
      <Form
        noValidate
        validated={validated}
        className="user-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="Firstname"
          className="mb-2 mb-lg-3"
        >
          <Form.Control
            required
            type="text"
            placeholder="your firstname"
            value={receivedValues?.firstname}
            onChange={(e) =>
              setReceivedValues({
                ...receivedValues,
                firstname: e.target.value,
              })
            }
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingLastname"
          label="Lastname"
          className="mb-2 mb-lg-3"
        >
          <Form.Control
            required
            type="text"
            placeholder="your lastname"
            value={receivedValues?.lastname}
            onChange={(e) =>
              setReceivedValues({
                ...receivedValues,
                lastname: e.target.value,
              })
            }
          />
        </FloatingLabel>
        <span className="d-flex align-items-center justify-content-between mb-2 mb-lg-3">
          <FloatingLabel
            controlId="floatingUsername"
            label="Username"
            className="username-input"
          >
            <Form.Control
              required
              type="text"
              placeholder="NiceName99"
              value={receivedValues?.username}
              onChange={(e) =>
                setReceivedValues({
                  ...receivedValues,
                  username: e.target.value,
                })
              }
            />
          </FloatingLabel>
          <DatePicker
            className="user-date-picker"
            label="Birthdate"
            defaultValue={receivedValues.birthdate}
            onChange={(newValue) =>
              newValue &&
              setReceivedValues({
                ...receivedValues,
                birthdate: newValue,
              })
            }
          />
        </span>
        <FloatingLabel
          controlId="floatingEmail"
          label="Email"
          className="mb-2 mb-lg-3"
        >
          <Form.Control
            required
            type="email"
            placeholder="email@example.com"
            value={receivedValues?.email}
            onChange={(e) =>
              setReceivedValues({
                ...receivedValues,
                email: e.target.value,
              })
            }
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            required
            type="password"
            placeholder="update your password"
            value={receivedValues?.password}
            onChange={(e) =>
              setReceivedValues({
                ...receivedValues,
                password: e.target.value,
              })
            }
          />
        </FloatingLabel>
        <span className="bottom-form-section ">
          <div>
            <div key={"terms-checkbox"} className="mb-2 ">
              <Form.Check
                type={"checkbox"}
                id={"terms-checkbox"}
                label={"Accept Terms & Conditions"}
                required
              />
            </div>
            <div key={"news-checkbox"}>
              <Form.Check
                type={"checkbox"}
                id={"news-checkbox"}
                label={"Subscribe to our newsletter!"}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="outline-light"
            className="form-button px-2 px-sm-4 px-md-5 py-3"
          >
            Update Data
          </Button>
        </span>
      </Form>
      <ToastContainer />
    </Col>
  );
};
