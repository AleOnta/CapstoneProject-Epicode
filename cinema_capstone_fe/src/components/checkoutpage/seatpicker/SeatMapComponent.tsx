import clsx from "clsx";
import { useEffect } from "react";
import {
  addPickedSeats,
  removePickedSeats,
  setPickedDate,
  setPickedTime,
} from "../../../features/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SeatMapProps } from "../../../interfaces/CommonInterfaces";

export const SeatMapComponent = ({
  seats,
  occupiedSeats,
  selectedSeats,
  setSelectedSeats,
}: SeatMapProps) => {
  const dispatch: AppDispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.user.logged_in);
  const dateAndTimeStore = useSelector(
    (state: RootState) => state.checkout.pickedDateAndTime
  );
  const handleSelectedSeats = (seat: number) => {
    const isSelected = selectedSeats.includes(seat);

    if (isSelected) {
      const updateSelectedSeats = selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
      setSelectedSeats(updateSelectedSeats);
      dispatch(removePickedSeats(updateSelectedSeats));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      dispatch(addPickedSeats(seat));
    }
  };

  const handleClick = (occupied: Boolean, seat: number) => {
    if (!occupied) {
      handleSelectedSeats(seat);
    }
  };

  const determinePointerEvents = () => {
    if (!dateAndTimeStore.date || dateAndTimeStore.time.length === 0) {
      return "unclickable";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setSelectedSeats([]);
    dispatch(removePickedSeats([]));
    dispatch(setPickedDate(""));
    dispatch(setPickedTime(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore]);

  return (
    <OverlayTrigger
      placement="right"
      overlay={
        <Tooltip id="tooltip-disabled">
          {determinePointerEvents() === "unclickable"
            ? "Select date & time"
            : "Select desired seats"}
        </Tooltip>
      }
    >
      <span className="d-flex justify-content-center w-50">
        <Col className={`Cinema p-4 rounded ${determinePointerEvents()}`}>
          <div className="screen"></div>
          <div className="seats">
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat);
              const isOccupied = occupiedSeats.includes(seat);
              // to add if occupied
              return (
                <span
                  tabIndex={0}
                  key={seat}
                  className={clsx(
                    "seat",
                    isSelected && "selected",
                    isOccupied && "occupied"
                  )}
                  onClick={() => handleClick(isOccupied, seat)}
                />
              );
            })}
          </div>
        </Col>
      </span>
    </OverlayTrigger>
  );
};
