import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Row.css";

interface RowProps {
  isLargeRow?: boolean;
  title: string;
  id: string;
  fetchUrl: string;
}

interface Movie {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

const Row: React.FC<RowProps> = ({
  isLargeRow = false,
  title,
  id,
  fetchUrl,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const handleClick = (movie: Movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request", request);
    setMovies(request.data.results);
  };

  const handleClickLeft = () => {
    const element = document.getElementById(id);
    if (element) {
      // element가 null이 아닐 때만 실행
      element.scrollLeft -= window.innerWidth - 80;
    }
  };

  const handleClickRight = () => {
    const element = document.getElementById(id);
    if (element) {
      // element가 null이 아닐 때만 실행
      element.scrollLeft += window.innerWidth - 80;
    }
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow" onClick={handleClickLeft}>
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              } `}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow" onClick={handleClickRight}>
            {">"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Row;
