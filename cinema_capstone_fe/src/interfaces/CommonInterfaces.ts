import { IMovie } from "./iMovies";
import { INews } from "./iNews";
import { IProgram } from "./iProgram";

export interface IMovieProps {
  movie: IMovie;
  program?: IProgram;
}

export interface INewsProps {
  news: INews;
}
