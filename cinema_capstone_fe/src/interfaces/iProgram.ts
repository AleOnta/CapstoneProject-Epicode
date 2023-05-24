export interface IProgramMovie {
  id: number;
  tmdbId: number;
  title: string;
  plot: string;
  genre: string;
  prodCompany: string;
  filmLength: number;
  posterPath: string;
  castPath: string;
  trailerID: string;
}

export interface IProgramRoom {
  id: number;
  name: string;
  totalSeats: number;
  timetables: string;
}

export interface IProgram {
  id: number;
  fromDate: Date;
  toDate: Date;
  status: string;
  price: string;
  movie: IProgramMovie;
  room: IProgramRoom;
}
