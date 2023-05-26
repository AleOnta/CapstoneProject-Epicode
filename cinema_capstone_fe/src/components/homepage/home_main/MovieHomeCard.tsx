import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMovieProps } from "../../../interfaces/CommonInterfaces";
import { BsCalendarWeek, BsFilm } from "react-icons/bs";

export const MovieHomeCard = ({ movie, program }: IMovieProps) => {
  const getGenres = (genres: string) => {
    const genresArray = genres.split("|");
    return genresArray;
  };

  const formatReleaseDate = (releaseDate: Date) => {
    let convertedDate = new Date(releaseDate).toISOString().slice(0, 10);
    return convertedDate;
  };

  const formatTitle = (title: string) => {
    if (title.length > 21) {
      return title.slice(0, 21) + "...";
    } else {
      return title;
    }
  };

  return (
    <Card className="movie-card">
      <Link to="/programs">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt="movie poster"
          className="card-img-one"
        />

        <div className="card-title">{formatTitle(movie.title)}</div>
        <div className="card-text">{movie.plot}</div>
        {program !== undefined ? (
          <>
            <span>
              <div className="card-category d-flex align-items-center">
                <p className="m-0 ">{movie.popularity}</p>
              </div>
            </span>
            <span>
              <div
                className={`card-views d-flex align-items-center ${program.room.name}`}
              >
                <p className="m-0 ">Theather: {program.room.name}</p>
              </div>
            </span>
          </>
        ) : (
          <>
            <span>
              <div className="card-category d-flex align-items-center">
                <BsFilm />
                <p className="m-0 ps-2">{getGenres(movie.genre)[0]}</p>
              </div>
            </span>
            <span>
              <div className="card-views d-flex align-items-center">
                <BsCalendarWeek />
                <p className="m-0 ps-2">
                  {formatReleaseDate(movie.releaseDate)}
                </p>
              </div>
            </span>
          </>
        )}
      </Link>
    </Card>
  );
};
