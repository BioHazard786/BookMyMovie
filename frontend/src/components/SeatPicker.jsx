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
import { telegramMainButton } from "../utils/telegramWebAppComponents";

const SeatPicker = () => {
  // Seat state from store
  const [seats, addSeats, removeSeats] = useSeats((seatStore) => [
    seatStore.seats,
    seatStore.addSeats,
    seatStore.removeSeats,
  ]);

  // Time state from store
  const currentSelectedTime = useSelectTime(
    (timeStore) => timeStore.currentSelectedTime
  );

  // Date state from store
  const currentSelectedDate = useSelectDate(
    (dateStore) => dateStore.currentSelectedDate
  );

  // Snackbar state toggling function
  const snackBarToggle = useSnackBar((snackBarStore) => snackBarStore.toggle);

  const { movieID } = useParams();

  // Checking before fetching payment invoice, date and time has been selected
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

  /**
   * Condition for showing text on main button
   */
  if (seats.length !== 0) {
    window.Telegram.WebApp.MainButton.setParams({
      text: `Pay ₹${seats.length * data[movieID].price_per_ticket}`,
    }).show();
  } else {
    window.Telegram.WebApp.MainButton.setParams({
      text: "Choose Seats",
    }).show();
  }

  /**
   * Mechanism for onClick eventhandler so that they does not pile up when component rerenders multiple time
   * When component rerender the previous onClick is removed and new onCLick is attached
   */
  useEffect(() => {
    // Adding onClick handler when component mounts
    telegramMainButton.onClick(mainButtonClick);

    // Removing onClick handler when component unmounts
    return () => {
      telegramMainButton.offClick(mainButtonClick);
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
