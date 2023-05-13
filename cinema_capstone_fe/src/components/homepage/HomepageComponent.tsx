import { Col, Row } from "react-bootstrap";
import { SwiperComponent } from "./SwiperComponent";
import { HomepageMainComponent } from "./HomepageMainComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchMovies } from "../../features/movieSlice";
import { fetchPrograms } from "../../features/programSlice";
export const HomepageComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchPrograms());
  }, []);

  return (
    <Row className="m-0">
      <Col xs={12} className="px-2 py-5 d-flex justify-content-center">
        <SwiperComponent />
      </Col>
      <Col xs={12}>
        <HomepageMainComponent />
      </Col>
    </Row>
  );
};
