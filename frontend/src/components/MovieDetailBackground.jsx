import { useParams } from "react-router-dom";
import data from "../data/data.json";
import "./MovieDetailBackground.css";
import { useRef } from "react";

/**
 * Component for showing the backdround image in the movie deatils page
 * Stateless component
 */
const MovieDetailBackground = () => {
  const { movieID } = useParams();
  const imgRef1 = useRef();
  const imgRef2 = useRef();
  return (
    <div className="movie-detail-background-container">
      <div className="movie-detail-poster-container">
        <img
          ref={imgRef1}
          className="movie-detail-poster hide"
          src={data[movieID].poster_org}
          alt={data[movieID].title}
          onLoad={() => {
            imgRef1?.current.classList.toggle("hide");
          }}
        />
        <div className="movie-detail-inverted-poster-container">
          <img
            ref={imgRef2}
            className="movie-detail-poster-inverted hide"
            src={data[movieID].poster_org}
            alt={data[movieID].title}
            onLoad={() => {
              imgRef2?.current.classList.toggle("hide");
            }}
          />
        </div>
      </div>
      <div className="filter-overlay"></div>
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default MovieDetailBackground;
