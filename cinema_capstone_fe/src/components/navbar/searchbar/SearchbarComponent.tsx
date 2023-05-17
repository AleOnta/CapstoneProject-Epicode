import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../../app/store";
import { IMovie } from "../../../interfaces/iMovies";
import { useClickOutside } from "react-click-outside-hook";
import { MovieSearchBarComponent } from "./MovieSearchbarComponent";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";

export const SearchbarComponent = () => {
  const moviesStore = useSelector((state: RootState) => state.movies.allMovies);

  const [inputSearch, setInputSearch] = useState("");
  const [moviesFound, setMoviesFound] = useState<IMovie[]>([]);
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);
  const [notFoundReturn, setNotFoundReturn] = useState<Boolean>(false);
  const [ref, isClickedOutside] = useClickOutside();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    searchMovie(inputSearch);
  };

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const collapseContainer = () => {
    setIsExpanded(false);
    setInputSearch("");
    setMoviesFound([]);
  };

  const searchMovie = (userInput: string) => {
    setMoviesFound([]);

    if (userInput !== "") {
      const result: IMovie[] = [];

      moviesStore.forEach((movie) => {
        const check = movie.title
          .toLowerCase()
          .search(inputSearch.toLocaleLowerCase());
        if (check !== -1) {
          result.push(movie);
        }
      });
      if (result.length === 0) {
        setNotFoundReturn(true);
      } else {
        setMoviesFound(result);
        console.log(moviesFound);
      }
    } else {
      setMoviesFound([]);
    }
  };

  const containerVariants = {
    expanded: {
      height: "auto",
    },
    collapsed: {
      height: "auto",
    },
  };

  useEffect(() => {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  return (
    <motion.div
      className={"col-6 rounded search-main-container"}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      ref={ref}
    >
      <div className=" px-0 d-flex justify-content-center align-items-center rounded searchbar-container">
        <span>
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          placeholder="Search movies by a keyword..."
          value={inputSearch}
          onChange={(e) => handleChange(e)}
          onFocus={expandContainer}
          className="rounded-3"
        />
        <span>
          <AiOutlineCloseCircle
            className={`search-close-icon ${isExpanded ? "is-shown" : ""}`}
            onClick={collapseContainer}
          />
        </span>
      </div>
      <div className="results-container d-flex flex-column align-items-start">
        {isExpanded && moviesFound.length > 0 ? (
          moviesFound.map((movie) => (
            <MovieSearchBarComponent
              movie={movie}
              function={collapseContainer}
              key={movie.tmdbId}
            />
          ))
        ) : notFoundReturn && isExpanded ? (
          <p>No movie found searching for "{inputSearch}"</p>
        ) : null}
      </div>
    </motion.div>
  );
};
