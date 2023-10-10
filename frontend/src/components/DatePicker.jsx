import "./DatePicker.css";
import { motion } from "framer-motion";
import { virtualDateGenerator } from "../utils/virtualDateGenerator";
import { useSelectDate } from "../utils/store";
import { checkLowContrast } from "../utils/colorComparision";
import { bgColor, secondaryBgColor } from "../utils/themeParams";
import { telegramHapticFeedback } from "../utils/telegramWebAppComponents";

const DatePicker = () => {
  const virtualDates = virtualDateGenerator();

  // State for Date picker
  const [currentSelectedDate, setCurrentSelectedDate] = useSelectDate(
    (dateStore) => [dateStore.currentSelectedDate, dateStore.selectDate]
  );

  const chooseDate = (currentSelectedElement) => {
    // haptic feedback funciton for telegram mini app
    telegramHapticFeedback.impactOccurred("medium");
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
