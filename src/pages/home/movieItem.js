import { FocusNode } from '@please/lrud';

export default function MovieItem({ setSelectedDetail, item, rowId, movieIndex }) {
  return (
    <FocusNode
      focusId={`movie-row-focus-${rowId}-${movieIndex}`}
      onSelected={() => setSelectedDetail(item)}
      className="movie-item min-w-80 w-80 h-[500px] rounded-xl overflow-hidden flex flex-col"
    >
      <div className='movie-item-image flex-1 rounded-xl overflow-hidden'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      <span className='text-xl font-light whitespace-nowrap overflow-hidden w-full block mt-2 text-ellipsis'>{item.title}</span>
    </FocusNode>
  );
}
