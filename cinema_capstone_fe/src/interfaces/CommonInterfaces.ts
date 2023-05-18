import { IMovie } from "./iMovies";
import { INews } from "./iNews";
import { IProgram } from "./iProgram";
import { IRoom } from "./iRoom";

export interface IMovieProps {
  movie: IMovie;
  program?: IProgram;
}

export interface INewsProps {
  news: INews;
}

export interface SearchBarCardProps {
  movie: IMovie;
  function: () => void;
}

export interface CheckOutProps {
  movieId: number;
  relatedProgram: IProgram;
  relatedRoom: IRoom;
}
