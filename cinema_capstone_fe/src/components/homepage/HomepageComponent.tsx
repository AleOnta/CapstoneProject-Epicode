import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { FooterComponent } from "../footer/FooterComponent";
import { SwiperComponent } from "./home_swiper/SwiperComponent";
import { HomepageMainComponent } from "./home_main/HomepageMainComponent";

export interface HomeLoaderProps {
  moviesLoad: boolean;
}

export const HomepageComponent = ({ moviesLoad }: HomeLoaderProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Row className="m-0">
      <Col
        xs={12}
        className="px-0 py-5 d-flex justify-content-center movie-swiper-container"
      >
        <SwiperComponent />
      </Col>
      <Col xs={12}>
        <HomepageMainComponent moviesLoad={moviesLoad} />
      </Col>
      <Col xs={12}>
        <FooterComponent />
      </Col>
    </Row>
  );
};
