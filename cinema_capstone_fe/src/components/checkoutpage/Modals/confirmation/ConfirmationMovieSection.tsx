import { ModalConfirmationMovieSection } from "../../../../interfaces/CommonInterfaces";

export const ConfirmationMovieSection = ({
  movie,
}: ModalConfirmationMovieSection) => {
  return (
    <>
      <h4 className="modal-section">Movie</h4>
      <div className="d-flex align-items-center movie-section-container p-3 rounded">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt="movie poster"
          className="small-img-modal"
        />
        <div>
          <p className="modal-data movie title">{movie.title}</p>
          <p className="modal-data movie">
            {movie.prodCompany.split("|").map((pc) => pc + " ")}
          </p>
          <p className="modal-data movie plot">{movie.plot}</p>
        </div>
      </div>
    </>
  );
};
