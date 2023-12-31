import { motion } from "framer-motion";
import "./SeatArrangement.css";
import { checkLowContrast } from "../utils/colorComparision";
import { bgColor, secondaryBgColor } from "../utils/themeParams";
import { telegramHapticFeedback } from "../utils/telegramWebAppComponents";

// Data for Numbers of seats available
const seatArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

/**
 * Component for seat arrangement in grid pattern
 */
const SeatArrangement = ({ arrangement, seats, addSeats, removeSeats }) => {
  return (
    <div className="seats-grid">
      {seatArray.map((seat, index) => (
        <Seats
          key={index}
          seatNumber={`${seat}${arrangement}`}
          seats={seats}
          addSeats={addSeats}
          removeSeats={removeSeats}
        />
      ))}
    </div>
  );
};

const Seats = ({ seatNumber, seats, addSeats, removeSeats }) => {
  const removeSelectedSeats = (selectedSeat) => {
    // haptic feedback funciton for telegram mini app
    telegramHapticFeedback.impactOccurred("light");
    removeSeats(selectedSeat);
  };

  const chooseSeats = (chosenSeat) => {
    // haptic feedback funciton for telegram mini app
    telegramHapticFeedback.impactOccurred("light");
    addSeats(chosenSeat);
  };

  return seats.some((seat) => seat == seatNumber) ? (
    <motion.div
      /**
       * Condional styling to add border when contrast is too low
       */
      style={
        checkLowContrast(bgColor, secondaryBgColor)
          ? { border: "1px solid var(--button-color)" }
          : null
      }
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => removeSelectedSeats(e.target.getAttribute("data-value"))}
      className="seat selected"
      data-value={seatNumber}
    >
      {seatNumber}
    </motion.div>
  ) : (
    <motion.div
      /**
       * Condional styling to add border when contrast is too low
       */
      style={
        checkLowContrast(bgColor, secondaryBgColor)
          ? { border: "1px solid var(--button-color)" }
          : null
      }
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => chooseSeats(e.target.getAttribute("data-value"))}
      className="seat not-selected"
      data-value={seatNumber}
    ></motion.div>
  );
};

export default SeatArrangement;
