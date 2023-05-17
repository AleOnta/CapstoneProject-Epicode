import { Card } from "react-bootstrap";
import { IMovieProps } from "../../interfaces/CommonInterfaces";
import { BsFillPeopleFill, BsFillStarFill } from "react-icons/bs";

export const MovieSearchBarComponent = ({ movie }: IMovieProps) => {
  const getGenres = (genres: string) => {
    let toReturn = "";
    const genresArray = genres.split("|");
    genresArray.forEach((genre) => (toReturn += genre + " - "));
    return toReturn.substring(0, toReturn.length - 2);
  };

  return (
    <Card className="d-flex flex-row align-items-center w-100 card-container">
      <Card.Header className="p-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt="movie poster"
          className="movie-img"
        />
      </Card.Header>
      <Card.Body className="py-1 d-flex align-items-center justify-content-between">
        <span>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{getGenres(movie.genre)}</Card.Text>
        </span>
        <span>
          <Card.Text className="d-flex align-items-center">
            <BsFillStarFill className="me-2" />
            <span>{movie.vote}</span>
          </Card.Text>
          <Card.Text className="d-flex align-items-center">
            <BsFillPeopleFill className="me-2" />
            <span>{movie.popularity}</span>
          </Card.Text>
        </span>
      </Card.Body>
    </Card>
  );
};