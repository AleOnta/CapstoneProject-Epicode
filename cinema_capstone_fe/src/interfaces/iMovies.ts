export interface IMovie {
  id: number;
  tmdbId: number;
  title: string;
  plot: string;
  genre: string;
  prodCompany: string;
  releaseDate: Date;
  filmLength: number;
  posterPath: string;
  castPath: string;
  budget: number;
  revenue: number;
  popularity: number;
  vote: number;
}
