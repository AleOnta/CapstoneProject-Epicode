import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { IMovieProps } from "../../interfaces/CommonInterfaces";
import {
  faCalendar,
  faClock,
  faUsers,
  faQuestion,
  faA,
  faB,
  faC,
  faD,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { intlFormatDistance } from "date-fns";

export const MovieDynamicSpecs = ({ movie }: IMovieProps) => {
  const formatReleaseDate = (releaseDate: Date) => {
    let convertedDate = new Date(releaseDate).toISOString().slice(0, 10);
    return convertedDate;
  };

  const calculateDistanceFromDate = (releaseDate: Date) => {
    const distance = intlFormatDistance(new Date(releaseDate), new Date(), {
      unit: "day",
    });

    let distanceReturned = 0;

    switch (distance.slice(0, 3)) {
      case "tra": {
        let result = Number(distance.replace(/[^0-9]/g, ""));
        if (result > 365) {
          distanceReturned = 5;
        } else if (result < 365 && result > 265) {
          distanceReturned = 20;
        } else if (result < 265 && result > 180) {
          distanceReturned = 42;
        } else if (result < 180 && result > 100) {
          distanceReturned = 65;
        } else if (result < 100 && result > 50) {
          distanceReturned = 78;
        } else {
          distanceReturned = 90;
        }
        break;
      }
      default: {
        distanceReturned = 100;
        break;
      }
    }
    return distanceReturned;
  };

  const calculateMovieLength = (filmLength: number) => {
    if (filmLength > 180) {
      return 100;
    } else if (filmLength < 180 && filmLength >= 150) {
      return 75;
    } else if (filmLength < 150 && filmLength >= 120) {
      return 60;
    } else if (filmLength < 120 && filmLength >= 100) {
      return 45;
    } else if (filmLength < 100 && filmLength >= 90) {
      return 38;
    } else {
      return 25;
    }
  };

  const calculateMoviePopularity = (popularity: number) => {
    if (popularity > 4000) {
      return 98;
    } else if (popularity < 4000 && popularity > 3000) {
      return 81;
    } else if (popularity < 3000 && popularity > 2000) {
      return 67;
    } else if (popularity < 2000 && popularity > 1000) {
      return 60;
    } else if (popularity < 1000 && popularity > 800) {
      return 50;
    } else if (popularity < 800 && popularity > 650) {
      return 43;
    } else if (popularity < 650 && popularity > 550) {
      return 38;
    } else if (popularity < 550 && popularity > 400) {
      return 30;
    } else if (popularity < 400 && popularity > 250) {
      return 23;
    } else if (popularity < 250 && popularity > 100) {
      return 17;
    } else if (popularity < 100 && popularity > 30) {
      return 10;
    } else {
      return 1;
    }
  };

  const calculateMovieVote = (vote: number) => {
    return Math.floor((vote * 100) / 10);
  };

  const returnVote = (vote: number) => {
    return vote > 8
      ? faA
      : vote < 8 && vote > 6
      ? faB
      : vote < 6 && vote >= 5
      ? faC
      : vote === 0
      ? faQuestion
      : faD;
  };

  return (
    <Row className="mt-3 mt-md-2 mt-lg-1 mt-xl-4">
      <Col xs={6} md={3} className="specs-container">
        <Card className="card-specs l-bg-cherry">
          <div className="card-statistic-3 px-2 py-4 py-md-2 py-lg-3 py-xl-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon icon={faCalendar} className="icon-font" />
            </div>
            <div className="mb-2 mb-md-3 mb-xl-4">
              <Card.Title className="card-title mb-0">Release date</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className=" p-0 mb-0 release">
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
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{
                  width: calculateDistanceFromDate(movie.releaseDate) + "%",
                }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={6} md={3} className="specs-container">
        <Card className="card-specs l-bg-blue-dark">
          <div className="card-statistic-3 px-2 py-4 py-md-2 py-lg-3 py-xl-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon icon={faClock} className="icon-font" />
            </div>
            <div className="mb-2 mb-md-3 mb-xl-4 mb-xxl-4">
              <Card.Title className="card-title mb-0">Film length</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className="p-0 mb-0">{movie.filmLength} min</h2>
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
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: calculateMovieLength(movie.filmLength) + "%" }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={6} md={3} className="specs-container">
        <Card className="card-specs l-bg-green-dark">
          <div className="card-statistic-3 px-2 py-4 py-md-2 py-lg-3 py-xl-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon icon={faUsers} className="icon-font" />
            </div>
            <div className="mb-2 mb-md-3 mb-xl-4 mb-xxl-4">
              <Card.Title className="card-title mb-0">Popularity</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className="p-0 mb-0">{movie.popularity.toFixed(2)}</h2>
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
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{
                  width: calculateMoviePopularity(movie.popularity) + "%",
                }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={6} md={3} className="specs-container">
        <Card className="card-specs l-bg-orange-dark">
          <div className="card-statistic-3 px-2 py-4 py-md-2 py-lg-3 py-xl-4">
            <div className="card-icon card-icon-large">
              <FontAwesomeIcon
                icon={returnVote(movie.vote)}
                className="icon-font"
              />
            </div>
            <div className="mb-2 mb-md-3 mb-xl-4">
              <Card.Title className="card-title mb-0">Fan vote</Card.Title>
            </div>
            <Row className="align-items-center justify-content-between mb-2 d-flex">
              <Col>
                <h2 className=" p-0 mb-0">{movie.vote.toFixed(2)}</h2>
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
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: calculateMovieVote(movie.vote) + "%" }}
              ></ProgressBar>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
