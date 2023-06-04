import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchNews } from "../../../features/newsSlice";
import { fetchRooms } from "../../../features/roomSlice";
import { fetchMovies } from "../../../features/movieSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchPrograms } from "../../../features/programSlice";

export const RedirectHomepage = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const store = useSelector((state: RootState) => state);

  useEffect(() => {
    if (path === "success") {
      if (
        store.movies.status === "fulfilled" &&
        store.news.status === "fulfilled" &&
        store.programs.status === "fulfilled" &&
        store.rooms.status === "fulfilled"
      ) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    store.movies.status,
    store.news.status,
    store.rooms.status,
    store.programs.status,
  ]);

  useEffect(() => {
    if (path === "success") {
      !loading && setTimeout(() => navigate("/home"), 2500);
    } else {
      !loading && setTimeout(() => navigate("/home"), 1800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (path === "success") {
      dispatch(fetchMovies());
      dispatch(fetchPrograms());
      dispatch(fetchRooms());
      dispatch(fetchNews());
      sessionStorage.removeItem("my-thynk-checkout-cart");
    } else {
      setLoading(false);
    }
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
