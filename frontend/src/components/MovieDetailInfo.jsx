import "./MovieDetailInfo.css";
import { useParams } from "react-router-dom";
import data from "../data/data.json";
import lightColor from "../utils/colorComparision";
import { motion } from "framer-motion";
import { childAnimations } from "./AnimatedPage";

const MovieDetailInfo = () => {
  const { movieID } = useParams();
  return (
    <motion.div
      variants={childAnimations}
      initial="initial"
      animate="animate"
      className="movie-detail-info-container"
      style={{
        "--special-container-background": data[movieID].background_color,
        "--special-container-text": lightColor(
          data[movieID].text_color,
          data[movieID].background_color
        ),
      }}
    >
      <div className="movie-rating overlay-position">{data[movieID].score}</div>
      <div className="movie-title overlay-position">
        {data[movieID].title}
        <span className="movie-year">({data[movieID].year})</span>
      </div>
      <div className="movie-sub-title overlay-position">
        {`${data[movieID].language} ┃ ${data[movieID].runtime} ┃ `}
        <span className="movie-pg-rating">{data[movieID].rating}</span>
      </div>
      <div className="original-title overlay-position">
        <div className="heading">Tagline</div>
        <div className="info-container">{data[movieID].tagline}</div>
      </div>
      <div className="movie-budget overlay-position">
        <div className="heading">Budget</div>
        <div className="info-container">{data[movieID].budget}</div>
      </div>
      <div className="movie-revenue overlay-position">
        <div className="heading">Revenue</div>
        <div className="info-container">{data[movieID].revenue}</div>
      </div>
      <div className="movie-director overlay-position">
        <div className="heading">Director</div>
        <div className="special-container">
          <span className="special-container-first-letter">
            {data[movieID].director.charAt(0)}
          </span>
          {data[movieID].director}
        </div>
      </div>
      <div className="movie-writer overlay-position">
        <div className="heading">Writers</div>
        <div className="movie-writer-container">
          {data[movieID].writers.map((writer, index) => (
            <div className="special-container" key={index}>
              <span className="special-container-first-letter">
                {writer.charAt(0)}
              </span>
              {writer}
            </div>
          ))}
        </div>
      </div>
      <div className="movie-genre overlay-position">
        <div className="heading">Genres</div>
        <div className="movie-genre-container">
          {data[movieID].genre.map((genre, index) => (
            <div className="special-container" key={index}>
              <span className="special-container-first-letter">
                {genre.charAt(0)}
              </span>
              {genre}
            </div>
          ))}
        </div>
      </div>
      <div className="movie-synopsis overlay-position">
        <div className="heading">Synopsis</div>
        <div className="info-container">{data[movieID].synopsis}</div>
      </div>
      <div className="movie-characters overlay-position">
        <div className="heading">Top Characters</div>
        <div className="character-photo-array">
          {data[movieID].top_cast.map((character, index) => (
            <div className="character-container" key={index}>
              <img
                className="character-photo"
                src={character.photo_url}
                alt={character.name}
              />
              <div className="character-name">{character.name}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetailInfo;
