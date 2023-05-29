import "swiper/scss/autoplay";
import "swiper/scss/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { MovieNewsCard } from "../home_main/MovieNewsCard";
import { Autoplay, Navigation } from "swiper";

export const NewsSwiper = () => {
  const newsStore = useSelector((state: RootState) => state.news);

  return (
    <>
      {newsStore.status === "fulfilled" && (
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            550: {
              slidesPerView: 2,
              //spaceBetween: 250,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
            1450: {
              slidesPerView: 5,
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
          {newsStore.allNews.map((news) => (
            <SwiperSlide key={news.id + "news-swiper"}>
              <MovieNewsCard news={news} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
