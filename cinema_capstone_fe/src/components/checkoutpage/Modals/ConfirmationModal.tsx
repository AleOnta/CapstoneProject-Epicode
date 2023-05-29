import { Button, Modal } from "react-bootstrap";
import { ModalProps } from "../../../interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { ConfirmationMovieSection } from "./confirmation/ConfirmationMovieSection";
import { ConfirmationPicksSection } from "./confirmation/ConfirmationPicksSection";
import { ConfirmationTableSection } from "./confirmation/ConfirmationTableSection";
import { ConfirmationPayment } from "./confirmation/ConfirmationPayment";
import {
  RedirectToCheckoutOptions,
  Stripe,
  loadStripe,
} from "@stripe/stripe-js";
import { setPassThrough } from "../../../features/checkoutSlice";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);
  }
  return stripePromise;
};

export const ConfirmationModal = ({ show, setShow }: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkout);

  const item = {
    price: checkoutStore.pickedProgram?.price,
    quantity: checkoutStore.pickedSeats.length,
  };

  const options: RedirectToCheckoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancelled`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    dispatch(setPassThrough(true));
    if (stripe) {
      const { error } = await stripe.redirectToCheckout(options);
      dispatch(setPassThrough(false));
      console.log(error);
    }
  };

  const saveCheckoutData = () => {
    const JsonCheckoutStore = JSON.stringify(checkoutStore);
    sessionStorage.setItem("my-thynk-checkout-cart", JsonCheckoutStore);
  };

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
        <Button
          variant="secondary"
          onClick={() => {
            saveCheckoutData();
            redirectToCheckout();
          }}
        >
          Proceed to payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
