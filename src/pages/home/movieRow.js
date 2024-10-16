import { FocusNode } from '@please/lrud';
import { motion } from 'framer-motion';

import MovieItem from './movieItem';

export default function MovieRow({ setSelectedDetail, moviesByGenre, rowItem, rowIndex, gridPosition, movieRowPosition, setMovieRowPosition }) {
  const isBeforeActiveRow = rowIndex < gridPosition.rowIndex;

  const profileWidth = document.querySelector('.movie-item') ? document.querySelector('.movie-item').clientWidth : 0;
  const profileGap = 20;
  const totalProfiles = moviesByGenre && moviesByGenre[rowItem.id] ? moviesByGenre[rowItem.id].length : 0;
  const screenWidth = document.querySelector('.home-container') ? document.querySelector('.home-container').clientWidth : 0;

  const maxScrollWidth = (totalProfiles * (profileWidth + profileGap)) - screenWidth;

  return (
    <FocusNode
      className={`movie-row transition-all mb-10 ${isBeforeActiveRow ? 'isBeforeActiveRow' : ''}`}
    >
      <div className='overflow-hidden'>
        <h3 className='mb-4 text-3xl'>{rowItem.name}</h3>

        <FocusNode
          className='flex gap-5'
          orientation="horizontal"
          elementType={motion.div}
          onMove={(e) => {
            setMovieRowPosition(e.nextChildIndex);
          }}
          initial={{
            x: 0
          }}
          animate={{
            x: Math.max(-1 * (movieRowPosition * (profileWidth + profileGap)), -maxScrollWidth)
          }}
          transition={{
            duration: 0.25,
            ease: 'easeOut',
          }}>
          {moviesByGenre[rowItem.id] ? (
            moviesByGenre[rowItem.id].map((movie, movieIndex) => (
              <MovieItem key={movieIndex}
                setSelectedDetail={setSelectedDetail}
                movieIndex={movieIndex}
                item={movie}
                movieRowPosition={movieRowPosition}
                rowId={rowIndex}
              />
            ))
          ) : (
            <span>Loading movies...</span>
          )}
        </FocusNode>
      </div>
    </FocusNode>
  );
}
