import { IMovie } from "./iMovies";
import { INews } from "./iNews";
import { IProgram, IProgramMovie } from "./iProgram";
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

export interface SeatMapProps {
  selectedMovie: IProgramMovie;
  occupiedSeats: number[];
  selectedSeats: number[];
  seats: number[];
  setSelectedSeats: (param: number[]) => void;
}

export interface DateAndTime {
  date: Date | null;
  time: string;
}

export interface SerializableDateAndTime {
  date: string;
  time: string;
}

export interface AuthComponentProps {
  successCallback: (message: string) => void;
  failureCallback: (message: string) => void;
}
