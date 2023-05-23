import { Button, Modal } from "react-bootstrap";
import { ModalProps } from "../../../interfaces/CommonInterfaces";
import { useNavigate } from "react-router-dom";

export const AuthenticationModal = ({ show, setShow }: ModalProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} className="authModal">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Proceeding with check-out requires to be registered
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex aling-items-center justify-content-around py-5">
          <Button className="px-5" onClick={() => navigate("/auth/register")}>
            Sign-up
          </Button>
          <Button className="px-5" onClick={() => navigate("/auth/login-ch")}>
            Sign-in
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
