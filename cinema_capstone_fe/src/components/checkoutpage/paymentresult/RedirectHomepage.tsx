import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchMovies } from "../../../features/movieSlice";
import { fetchRooms } from "../../../features/roomSlice";
import { fetchPrograms } from "../../../features/programSlice";
import { fetchNews } from "../../../features/newsSlice";

export const RedirectHomepage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const store = useSelector((state: RootState) => state);

  useEffect(() => {
    if (
      store.movies.status === "fulfilled" &&
      store.news.status === "fulfilled" &&
      store.programs.status === "fulfilled" &&
      store.rooms.status === "fulfilled"
    ) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    store.movies.status,
    store.news.status,
    store.rooms.status,
    store.programs.status,
  ]);

  useEffect(() => {
    !loading && setTimeout(() => navigate("/home"), 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchPrograms());
    dispatch(fetchRooms());
    dispatch(fetchNews());
    sessionStorage.removeItem("my-thynk-checkout-cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col
        xs={12}
        className="d-flex align-items-center justify-content-center"
        style={{ height: 80 + "vh", width: 100 + "vw" }}
      >
        <span className="loader-redirect"></span>
      </Col>
    </Row>
  );
};
