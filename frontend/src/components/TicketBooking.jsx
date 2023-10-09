import { useParams, useNavigate } from "react-router-dom";
import data from "../data/data.json";
import "./TicketBooking.css";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import SeatPicker from "./SeatPicker";
import SnackBar from "./SnackBar";
import { AnimatedPage } from "./AnimatedPage";

const TicketBooking = () => {
  const { movieID } = useParams();
  const navigate = useNavigate();

  window.Telegram.WebApp.BackButton.show().onClick(() =>
    navigate(`/movie/${movieID}`)
  );

  return (
    <>
      <AnimatedPage>
        <div className="ticket-booking-container">
          <div className="movie-info-container">
            <img
              className="movie-image"
              src={data[movieID].poster}
              alt={data[movieID].title}
            />
            <div className="movie-info">
              <h1 className="movie-title">{data[movieID].title} </h1>
              <div>
                <span className="sub-heading">Price Per Ticket:</span>
                <span className="sub-content">
                  ₹{data[movieID].price_per_ticket}
                </span>
              </div>
              <div>
                <span className="sub-heading">Language:</span>
                <span className="sub-content">{data[movieID].language}</span>
              </div>
            </div>
          </div>
          <DatePicker />
          <TimePicker />
          <SeatPicker />
          <SnackBar />
        </div>
      </AnimatedPage>
    </>
  );
};

export default TicketBooking;
