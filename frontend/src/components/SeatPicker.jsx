import {
  useSeats,
  useSelectDate,
  useSelectTime,
  useSnackBar,
} from "../utils/store";
import { useParams } from "react-router-dom";
import { bookTickets } from "../utils/ticketBookingHelperFunctions";
import SeatArrangement from "./SeatArrangement";
import "./SeatPicker.css";
import { useEffect } from "react";
import data from "../data/data.json";

const SeatPicker = () => {
  const [seats, addSeats, removeSeats] = useSeats((seatStore) => [
    seatStore.seats,
    seatStore.addSeats,
    seatStore.removeSeats,
  ]);

  const currentSelectedTime = useSelectTime(
    (timeStore) => timeStore.currentSelectedTime
  );
  const currentSelectedDate = useSelectDate(
    (dateStore) => dateStore.currentSelectedDate
  );

  // Snackbar state toggling function
  const snackBarToggle = useSnackBar((snackBarStore) => snackBarStore.toggle);

  const { movieID } = useParams();

  // Checking before fetching payment invoice
  const mainButtonClick = () => {
    if (!currentSelectedDate) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
      return snackBarToggle("Please select Date");
    } else if (!currentSelectedTime) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
      return snackBarToggle("Please select Time");
    } else {
      return bookTickets(
        movieID,
        seats.length,
        snackBarToggle,
        `${currentSelectedDate} ${currentSelectedTime}`
      );
    }
  };

  // Condition for showing main button
  if (seats.length !== 0) {
    window.Telegram.WebApp.MainButton.setParams({
      text: `Pay ₹${seats.length * data[movieID].price_per_ticket}`,
    }).show();
  } else {
    window.Telegram.WebApp.MainButton.hide();
  }

  // Mechanism for onClick handler so that htey does not pile up when component rerenders
  useEffect(() => {
    // Adding onClick handler when component mounts
    window.Telegram.WebApp.MainButton.onClick(mainButtonClick);

    // Removing onClick handler when component unmounts
    return () => {
      window.Telegram.WebApp.MainButton.offClick(mainButtonClick);
    };
  }, [seats.length, currentSelectedDate, currentSelectedTime]);

  return (
    <div className="seat-picker-container">
      <SeatArrangement
        arrangement={"A"}
        seats={seats}
        addSeats={addSeats}
        removeSeats={removeSeats}
      />
      <div className="space">
        <SeatArrangement
          arrangement={"B"}
          seats={seats}
          addSeats={addSeats}
          removeSeats={removeSeats}
        />
      </div>
    </div>
  );
};

export default SeatPicker;
