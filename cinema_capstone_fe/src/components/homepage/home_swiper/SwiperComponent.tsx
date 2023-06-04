import "swiper/scss";
import "../HomePage.scss";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Autoplay, Navigation } from "swiper";
import { RootState } from "../../../app/store";
import { Swiper, SwiperSlide } from "swiper/react";

export const SwiperComponent = () => {
  const movieStore = useSelector((state: RootState) => state.movies);

  return (
    <>
      {movieStore.status === "loading" ? (
        <span className="loader"></span>
      ) : movieStore.status === "fulfilled" ? (
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            660: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
            1450: {
              slidesPerView: 7,
              spaceBetween: 40,
            },
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {movieStore.allMovies.map((movie) => {
            return (
              <Link
                to={`/movie-focus/${movie.id}`}
                key={movie.tmdbId + "movie-link"}
              >
                <SwiperSlide key={movie.tmdbId + "movie-slide"}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt="movie poster"
                    className="slider-image"
                  />
                </SwiperSlide>
              </Link>
            );
          })}
          ...
        </Swiper>
      ) : (
        <></>
      )}
    </>
  );
};
