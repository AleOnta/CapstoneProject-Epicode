import { Button, Modal } from "react-bootstrap";
import { ModalProps } from "../../../interfaces/CommonInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ConfirmationMovieSection } from "./confirmation/ConfirmationMovieSection";
import { ConfirmationPicksSection } from "./confirmation/ConfirmationPicksSection";
import { ConfirmationTableSection } from "./confirmation/ConfirmationTableSection";
import { ConfirmationPayment } from "./confirmation/ConfirmationPayment";
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);
  }
  return stripePromise;
};

export const ConfirmationModal = ({ show, setShow }: ModalProps) => {
  const checkoutStore = useSelector((state: RootState) => state.checkout);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="confirmation-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Summary:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {checkoutStore.pickedProgram && (
          <ConfirmationMovieSection
            movie={checkoutStore.pickedProgram?.movie}
          />
        )}
        <ConfirmationPicksSection />
        <ConfirmationTableSection />
        <ConfirmationPayment />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant={"outline-light"} onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="secondary">Proceed to payment</Button>
      </Modal.Footer>
    </Modal>
  );
};
