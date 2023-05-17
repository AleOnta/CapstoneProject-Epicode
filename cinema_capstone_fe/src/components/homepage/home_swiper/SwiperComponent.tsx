import "swiper/scss";
import "../HomePage.scss";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { RootState } from "../../../app/store";
import { Link } from "react-router-dom";

export const SwiperComponent = () => {
  const movieStore = useSelector((state: RootState) => state.movies);

  return (
    <Swiper
      spaceBetween={65}
      slidesPerView={5}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {movieStore.allMovies.map((movie, index) => {
        return (
          <Link to={`/movie-focus/${movie.id}`}>
            <SwiperSlide key={index}>
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
  );
};
