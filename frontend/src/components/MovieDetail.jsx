import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetail.css";
import MovieDetailBackground from "./MovieDetailBackground";
import MovieDetailInfo from "./MovieDetailInfo";
import { AnimatedPage } from "./AnimatedPage";

const MovieDetail = () => {
  const { movieID } = useParams();
  const navigate = useNavigate();
  window.Telegram.WebApp.expand();
  window.Telegram.WebApp.MainButton.setParams({
    text: "Book Tickets",
    is_visible: true,
    is_active: true,
  }).onClick(() => navigate(`/movie/${movieID}/book-tickets`));

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
