import "./DatePicker.css";
import { motion } from "framer-motion";
import { virtualDateGenerator } from "../utils/virtualDateGenerator";
import { useSelectDate } from "../utils/store";

const DatePicker = () => {
  const virtualDates = virtualDateGenerator();
  const [currentSelectedDate, setCurrentSelectedDate] = useSelectDate(
    (dateStore) => [dateStore.currentSelectedDate, dateStore.selectDate]
  );

  const chooseDate = (currentSelectedElement) => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
    const currentSelectedDate =
      currentSelectedElement.nodeName == "DIV"
        ? currentSelectedElement?.getAttribute("data-value")
        : currentSelectedElement?.parentElement?.getAttribute("data-value");

    setCurrentSelectedDate(currentSelectedDate);
  };

  return (
    <div className="date-picker">
      {virtualDates.map((virtualDate, index) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`date-picker-container ${
            currentSelectedDate ==
            `${virtualDate.day} ${virtualDate.date} ${virtualDate.month}`
              ? "selected-date"
              : ""
          }`}
          key={index}
          data-value={`${virtualDate.day} ${virtualDate.date} ${virtualDate.month}`}
          onClick={(e) => chooseDate(e.target)}
        >
          <p className="date-picker-day">{virtualDate.day}</p>
          <p className="date-picker-date">{virtualDate.date}</p>
          <p className="date-picker-month">{virtualDate.month}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DatePicker;
