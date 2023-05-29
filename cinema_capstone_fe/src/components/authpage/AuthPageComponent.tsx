import "./AuthPage.scss";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginComponent } from "./LoginComponent";
import logo from "../../assets/imgs/cinemaLogo.png";
import { ToastContainer, toast } from "react-toastify";
import { RegisterComponent } from "./RegisterComponent";

export const AuthPageComponent = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notifyRedirect = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3200,
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
      autoClose: 3200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <img
        src={logo}
        alt="cinema logo"
        className="auth-logo"
        onClick={() => navigate("/home")}
      />
      <div
        className={`register-column rounded p-4 d-flex flex-column justify-content-start ${
          (location === "/auth/login" || location.includes("/auth/login-ch")) &&
          "login"
        }`}
      >
        <span>
          <h3 className="register-title mb-0">
            {location === "/auth/register" ? "REGISTER" : "LOGIN"}
          </h3>
          <hr className="mb-1" />
        </span>
        {location === "/auth/register" ? (
          <RegisterComponent
            successCallback={notifySuccess}
            failureCallback={notifyFailure}
          />
        ) : (
          <LoginComponent
            successCallback={notifySuccess}
            failureCallback={notifyFailure}
            redirectCallback={notifyRedirect}
          />
        )}
        <div className="lower-section text-center mt-4">
          <p className="mb-2">OR</p>
          <Link to="/home" className="link-to-home">
            return to homepage
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
