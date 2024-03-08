import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../../api/requests";
import "./Banner.css";

const Banner: React.FC = () => {
  type BannerMovie = {
    id: number;
    title: string;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    name?: string; // 추가: API 응답에서 사용할 수 있는 추가 필드
    original_name?: string; // 추가: API 응답에서 사용할 수 있는 추가 필드
  };

  const [movie, setMovie] = useState<BannerMovie | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requests.fetchNowPlaying);

    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      },
    });

    setMovie(movieDetail);
    console.log(movieDetail);
  };

  const truncate = (str: string, n: number): string => {
    return str?.length > n ? `${str.slice(0, n - 1)}...` : str;
  };

  if (!movie) return <div>Loading...</div>;

  //movie 이미지가 없을 경우를 대비
  const backgroundImageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : "";

  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>

          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">More Information</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    </div>
  );
};

export default Banner;
