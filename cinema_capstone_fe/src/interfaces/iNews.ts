import { IMovie } from "./iMovies";

export interface INews {
  id: number;
  redactDate: Date;
  author: string;
  title: string;
  article: string;
  relatedMovie: IMovie;
}
