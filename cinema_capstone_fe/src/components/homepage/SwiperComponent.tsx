import "swiper/scss";
import "./HomePage.scss";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { RootState } from "../../app/store";
import { fetchMovies } from "../../features/movieSlice";
import { AppDispatch } from "../../app/store";

export const SwiperComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const movieStore = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

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
          <SwiperSlide key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt=""
              className="slider-image"
            />
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};
