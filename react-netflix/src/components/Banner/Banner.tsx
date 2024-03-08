import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../../api/requests";
import "./Banner.css";
import styled from "styled-components";

const Banner: React.FC = () => {
  type Video = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
  };

  type MovieDetail = {
    id: number;
    backdrop_path?: string;
    title?: string;
    name?: string;
    original_name?: string;
    overview?: string;
    video?: boolean;
    videos?: {
      results: Video[];
    };
  };

  const [movie, setMovie] = useState<MovieDetail | null>(null);
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

  const videoUrl = movie.videos?.results[0]
    ? `https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`
    : "";

  console.log(videoUrl);
  if (!isClicked) {
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
              {truncate(movie.overview ?? "", 100)}
            </h1>
          </div>
          <div className="banner--fadeBottom" />
        </header>
      </div>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              opacity: 1,
            }}
            width="640"
            height="360"
            src={`${videoUrl}`}
            title="YouTube video player"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
};

export default Banner;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
