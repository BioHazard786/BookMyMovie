import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetail.css";
import MovieDetailBackground from "./MovieDetailBackground";
import MovieDetailInfo from "./MovieDetailInfo";
import { AnimatedPage } from "./AnimatedPage";
import {
  telegramMainButton,
  telegramWebApp,
} from "../utils/telegramWebAppComponents";

/**
 * Main component for the movie detail page
 */
const MovieDetail = () => {
  const { movieID } = useParams();
  const navigate = useNavigate();

  // Expanding the mini app to full width
  telegramWebApp.expand();

  /**
   * Setting onClick Handler to navigate pages using useNavigate of react-router
   */
  telegramMainButton
    .setParams({
      text: "Book Tickets",
      is_visible: true,
      is_active: true,
    })
    .onClick(() => navigate(`/movie/${movieID}/book-tickets`));

  window.Telegram.WebApp.BackButton.show().onClick(() => navigate("/"));

  return (
    <AnimatedPage>
      <div className="movie-detail-container">
        <MovieDetailInfo />
        <MovieDetailBackground />
      </div>
    </AnimatedPage>
  );
};

export default MovieDetail;
