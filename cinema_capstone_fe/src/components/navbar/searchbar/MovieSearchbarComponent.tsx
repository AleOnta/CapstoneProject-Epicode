import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillPeopleFill, BsFillStarFill } from "react-icons/bs";
import { SearchBarCardProps } from "../../../interfaces/CommonInterfaces";

export const MovieSearchBarComponent = (props: SearchBarCardProps) => {
  const getGenres = (genres: string) => {
    let toReturn = "";
    const genresArray = genres.split("|");
    genresArray.forEach(
      (genre, index) =>
        (toReturn += genre + (index !== genres.length - 1 ? ", " : "."))
    );
    return toReturn.substring(0, toReturn.length - 2);
  };

  return (
    <Link
      to={`/focus-movie/${props.movie.id}`}
      onClick={() => props.function()}
    >
      <Card className="d-flex flex-row align-items-center card-container">
        <Card.Header className="p-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${props.movie.posterPath}`}
            alt="movie poster"
            className="movie-img"
          />
        </Card.Header>
        <Card.Body className="py-1 d-flex align-items-center justify-content-between text-start">
          <span>
            <Card.Title>{props.movie.title}</Card.Title>
            <Card.Text>{getGenres(props.movie.genre)}</Card.Text>
          </span>
          <span className="search-data-container">
            <Card.Text className="d-flex align-items-center">
              <BsFillStarFill className="me-2" />
              <span className="search-movie-data">{props.movie.vote}</span>
            </Card.Text>
            <Card.Text className="d-flex align-items-center">
              <BsFillPeopleFill className="me-2" />
              <span className="search-movie-data">
                {Math.trunc(props.movie.popularity)}
              </span>
            </Card.Text>
          </span>
        </Card.Body>
      </Card>
    </Link>
  );
};
