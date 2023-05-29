import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { IMovieProps } from "../../interfaces/CommonInterfaces";
import {
  faCalendar,
  faClock,
  faUsers,
  faA,
  faB,
  faC,
  faD,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MovieDynamicSpecs = ({ movie }: IMovieProps) => {
  const formatReleaseDate = (releaseDate: Date) => {
    let convertedDate = new Date(releaseDate).toISOString().slice(0, 10);
    return convertedDate;
  };

  const returnVote = (vote: number) => {
    return vote > 8
      ? faA
      : vote < 8 && vote > 6
      ? faB
      : vote < 6 && vote >= 5
      ? faC
      : faD;
  };

  return (
    <Row className="mt-5">
      <Col xs={3} className="specs-container">
        <Card className="card-specs l-bg-cherry">
          <div className="card-statistic-3 p-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon icon={faCalendar} className="icon-font" />
            </div>
            <div className="mb-4">
              <Card.Title className="card-title mb-0">Release date</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className="d-flex align-items-center p-0 mb-0 release">
                  {formatReleaseDate(movie.releaseDate)}
                </h2>
              </Col>
              <div className="text-center p-0">
                <span className="percentage">
                  <i className="fa fa-arrow-up"></i>
                </span>
              </div>
            </Row>
            <div
              className="progress mt-1 "
              data-height={8}
              style={{ height: 8 + "px" }}
            >
              <ProgressBar
                className="l-bg-cyan"
                role="progressbar"
                data-width="25%"
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: 25 + "%" }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={3} className="specs-container">
        <Card className="card-specs l-bg-blue-dark">
          <div className="card-statistic-3 p-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon icon={faClock} className="icon-font" />
            </div>
            <div className="mb-4">
              <Card.Title className="card-title mb-0">Film length</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className="d-flex align-items-center p-0 mb-0">
                  {movie.filmLength} min
                </h2>
              </Col>
              <Col className="text-center p-0">
                <span className="percentage">
                  <i className="fa fa-arrow-up"></i>
                </span>
              </Col>
            </Row>
            <div
              className="progress mt-1 "
              data-height={8}
              style={{ height: 8 + "px" }}
            >
              <ProgressBar
                className="l-bg-green"
                role="progressbar"
                data-width="25%"
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: 25 + "%" }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={3} className="specs-container">
        <Card className="card-specs l-bg-green-dark">
          <div className="card-statistic-3 p-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon icon={faUsers} className="icon-font" />
            </div>
            <div className="mb-4">
              <Card.Title className="card-title mb-0">Popularity</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className="d-flex align-items-center p-0 mb-0">
                  {movie.popularity}
                </h2>
              </Col>
              <Col className="text-center p-0">
                <span className="percentage">
                  <i className="fa fa-arrow-up"></i>
                </span>
              </Col>
            </Row>
            <div
              className="progress mt-1 "
              data-height={8}
              style={{ height: 8 + "px" }}
            >
              <ProgressBar
                className="l-bg-orange"
                role="progressbar"
                data-width="25%"
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: 25 + "%" }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={3} className="specs-container">
        <Card className="card-specs l-bg-orange-dark">
          <div className="card-statistic-3 p-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon
                icon={returnVote(movie.vote)}
                className="icon-font"
              />
            </div>
            <div className="mb-4">
              <Card.Title className="card-title mb-0">Fan vote</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className="d-flex align-items-center p-0 mb-0">
                  {movie.vote}
                </h2>
              </Col>
              <Col className="text-center p-0">
                <span className="percentage">
                  <i className="fa fa-arrow-up"></i>
                </span>
              </Col>
            </Row>
            <div
              className="progress mt-1 "
              data-height={8}
              style={{ height: 8 + "px" }}
            >
              <ProgressBar
                className="l-bg-cyan"
                role="progressbar"
                data-width="25%"
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: 25 + "%" }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
