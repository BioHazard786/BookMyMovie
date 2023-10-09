import data from "../data/data.json";
import "./HomeScreen.css";
import lightColor from "../utils/colorComparision";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedChild, AnimatedPage } from "./AnimatedPage";
import { useSeats, useSelectDate, useSelectTime } from "../utils/store";

const HomeScreen = () => {
  // Telegram Specific functions for main and back button
  window.Telegram.WebApp.MainButton.hide();
  window.Telegram.WebApp.BackButton.hide();
  window.Telegram.WebApp.enableClosingConfirmation();

  // reseting the state
  const resetSeats = useSeats((seatStore) => seatStore.resetSeats);
  const resetTime = useSelectTime((timeStore) => timeStore.resetTime);
  const resetDate = useSelectDate((dateStore) => dateStore.resetDate);
  resetSeats();
  resetDate();
  resetTime();

  return (
    <AnimatedPage>
      <AnimatedChild>
        <div className="movie-container">
          {data.map((movie, index) => {
            const imgRef = useRef(null);
            return (
              <div
                key={index}
                style={{
                  "--container-background-text": movie.text_color,
                  "--container-background": movie.background_color,
                  "--container-background-text-light": lightColor(
                    movie.text_color,
                    movie.background_color
                  ),
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    className="poster-container"
                    to={`/movie/${index}`}
                    onClick={() =>
                      window.Telegram.WebApp.HapticFeedback.impactOccurred(
                        "medium"
                      )
                    }
                  >
                    <div className="rating circle">{movie.score}</div>
                    <img
                      ref={imgRef}
                      className="movie-poster hide"
                      src={movie.poster}
                      alt={movie.title}
                      onLoad={() => {
                        imgRef?.current.classList.toggle("hide");
                      }}
                    />
                    <div className="overlay">
                      <div className="overlay-runtime">{movie.runtime}</div>
                    </div>
                  </Link>
                  <Link
                    className="title"
                    to={`/movie/${index}`}
                    onClick={() =>
                      window.Telegram.WebApp.HapticFeedback.impactOccurred(
                        "medium"
                      )
                    }
                  >
                    {movie.title}
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </AnimatedChild>
    </AnimatedPage>
  );
};
export default HomeScreen;
