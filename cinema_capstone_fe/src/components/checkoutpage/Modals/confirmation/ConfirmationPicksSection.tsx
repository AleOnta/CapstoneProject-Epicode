import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

export const ConfirmationPicksSection = () => {
  const checkoutStore = useSelector((state: RootState) => state.checkout);

  return (
    <>
      <h4 className="modal-section mt-3">Your Picks</h4>
      <div className="p-3 picks-section-container rounded">
        <div className="d-flex aling-items-center">
          <p className="modal-data picks title me-2">Theater: </p>
          <p
            className={`modal-data picks rounded ${
              checkoutStore.pickedProgram?.room.name === "green"
                ? "green"
                : checkoutStore.pickedProgram?.room.name === "blue"
                ? "blue"
                : "red"
            }`}
          >
            {checkoutStore.pickedProgram?.room.name}
          </p>
        </div>
        <div className="d-flex aling-items-center">
          <p className="modal-data picks title me-2">Seats:</p>
          <p className="modal-data picks title me-2">
            {checkoutStore.pickedSeats.map((el, index) => (
              <span key={index + "-seat"} className="picked-seat">
                {el}
                {index !== checkoutStore.pickedSeats.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
        <div className="d-flex aling-items-center">
          <p className="modal-data picks title me-2  mb-0">
            Date:{" "}
            <span className="ms-1 picked-date">
              {checkoutStore.pickedDateAndTime.date}
            </span>
          </p>
          <span>|</span>
          <p className="modal-data picks title ms-2 mb-0">
            Time:{" "}
            <span className="ms-1 picked-time">
              {checkoutStore.pickedDateAndTime.time}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
