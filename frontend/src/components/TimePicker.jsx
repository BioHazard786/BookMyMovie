import "./TimePicker.css";
import { motion } from "framer-motion";
import { useSelectTime } from "../utils/store";

const TimePicker = () => {
  const virtualTime = ["9:00", "13:10", "15:50", "19:30", "22:00"];
  const [currentSelectedTime, setCurrentSelectedTime] = useSelectTime(
    (timeStore) => [timeStore.currentSelectedTime, timeStore.selectTime]
  );
  const pickTime = (selectedTime) => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
    setCurrentSelectedTime(selectedTime);
  };

  return (
    <div className="time-picker">
      {virtualTime.map((time, index) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => pickTime(e.target.getAttribute("data-value"))}
          className={`time-picker-container ${
            currentSelectedTime == time ? "selected-time" : ""
          }`}
          key={index}
          data-value={time}
        >
          {time}
        </motion.div>
      ))}
    </div>
  );
};

export default TimePicker;
