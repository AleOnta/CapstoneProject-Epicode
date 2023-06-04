import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ModalProps } from "../../../interfaces/CommonInterfaces";

export const AuthenticationModal = ({ show, setShow }: ModalProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal
        show={show}
        centered
        onHide={() => setShow(false)}
        className="auth-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            To proceed with the check-out,<br></br> you need to be logged in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex aling-items-center justify-content-around pt-5 pb-4 mt-2">
          <div className="d-flex flex-column aling-items-center justify-content-center">
            <Button
              variant="outline-light"
              className="px-5"
              onClick={() => navigate("/auth/register")}
            >
              Sign-up
            </Button>
            <p className="desc">Create a new account</p>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-4 pb-2">OR</p>
          </div>
          <div className="d-flex flex-column aling-items-center justify-content-center">
            <Button
              variant="outline-secondary"
              className="px-5"
              onClick={() => navigate("/auth/login-ch")}
            >
              Sign-in
            </Button>
            <p className="desc">Login into your account</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
