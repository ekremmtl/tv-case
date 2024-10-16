import { useEffect, useState } from 'react';

import { FocusNode, useSetFocus } from '@please/lrud';
import { motion } from 'framer-motion';

import MovieRow from './movieRow';

export default function Home({ setSelectedDetail }) {
  const setFocus = useSetFocus();

  // Handle Move - Movie Slide Row
  const [gridPosition, setGridPosition] = useState({
    rowIndex: 0,
    columnIndex: 0,
  });

  // Handle Move - Movie Item Row
  const [movieRowPosition, setMovieRowPosition] = useState([0, 0, 0, 0])

  const handleMovieRowPosition = (rowIndex, value) => {
    setTimeout(() => {
      setMovieRowPosition((prev) => {
        const updatedPositions = [...prev];
        updatedPositions[rowIndex] = value;
        return updatedPositions;
      });
    }, 10);
  };

  // Fetch Movie API
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const apiKey = "99d3d8f07463428864ccaa563a54417e";

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setGenres(data.genres);

      if (data.genres.length !== 0) {
        const initialPositions = Array(data.genres.length).fill(0);
        setMovieRowPosition(initialPositions);
      } else {
        setMovieRowPosition([0]);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
      );
      const data = await response.json();
      setMoviesByGenre((prevMovies) => ({
        ...prevMovies,
        [genreId]: data.results,
      }));
    } catch (error) {
      console.error("Error fetching movies for genre:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    genres.forEach((genre) => {
      fetchMoviesByGenre(genre.id);
    });
  }, [genres]);

  return (
    <div className='flex-1 py-10 ms-36 overflow-hidden home-container'>
      <FocusNode
        isGrid
        focusId="home"
        defaultFocusColumn={gridPosition.columnIndex}
        defaultFocusRow={gridPosition.rowIndex}
        onLeft={(e) => {
          if (gridPosition.columnIndex === 0 && movieRowPosition[gridPosition.rowIndex] === 0) {
            e.preventDefault();
            setFocus('nav');
          }
        }}
        onGridMove={(e) => {
          setGridPosition({
            rowIndex: e.nextRowIndex,
            columnIndex: e.nextColumnIndex,
          });

          setTimeout(() => {
            setFocus(`movie-row-focus-${e.nextRowIndex}-${movieRowPosition[e.nextRowIndex]}`);
          }, 10);
        }}
        elementType={motion.div}
        initial={{
          scale: 0.8,
          opacity: 0,
          y: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: document.querySelector('.movie-row') ? -(document.querySelector('.movie-row').clientHeight + 30) * gridPosition.rowIndex : 0,
        }}
        exit={{
          scale: 1.15,
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
          ease: 'easeOut',
        }}
      >
        {genres.map((item, itemIndex) => {
          return (
            <MovieRow
              setSelectedDetail={setSelectedDetail}
              moviesByGenre={moviesByGenre}
              rowItem={item}
              key={itemIndex}
              rowIndex={itemIndex}
              gridPosition={gridPosition}
              movieRowPosition={movieRowPosition[itemIndex]}
              setMovieRowPosition={(value) => handleMovieRowPosition(itemIndex, value)}
            />
          );
        })}
      </FocusNode>
    </div>

  );
}
