import { Col } from "react-bootstrap";
import clsx from "clsx";
import { SeatMapProps } from "../../../interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  addPickedSeats,
  removePickedSeats,
  setPickedDate,
  setPickedTime,
} from "../../../features/checkoutSlice";
import { useEffect } from "react";

export const SeatMapComponent = ({
  seats,
  occupiedSeats,
  selectedSeats,
  setSelectedSeats,
}: SeatMapProps) => {
  const dispatch: AppDispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.user.logged_in);

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

  useEffect(() => {
    setSelectedSeats([]);
    dispatch(removePickedSeats([]));
    dispatch(setPickedDate(""));
    dispatch(setPickedTime(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore]);

  return (
    <Col xs={6} className="Cinema p-4 rounded">
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
  );
};
