import { Form } from "react-bootstrap";
import { FaCcPaypal } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export const ConfirmationPayment = () => {
  return (
    <>
      <h4 className="modal-section mt-5">Payment Methods</h4>
      <div className="payment-method-section">
        <Form>
          <div className="d-flex align-items-center">
            <MdPayment className="fs-3 me-2" />
            <Form.Check
              type="radio"
              id="cc-debit"
              name="payment"
              label="C/c - Debit card"
            />
          </div>
          <div className="d-flex align-items-center mt-3 mb-2">
            <FaCcPaypal className="fs-3 me-2" />
            <Form.Check
              type="radio"
              id="paypal"
              name="payment"
              label="Paypal"
              disabled
            />
          </div>
        </Form>
      </div>
    </>
  );
};
