import { FocusNode } from '@please/lrud';

export default function MovieDetail({ selectedDetail, setSelectedDetail }) {
  return (
    <div
      className='flex-1 py-10 ms-36 me-10 overflow-hidden'>
      <div className='flex items-center flex-wrap gap-10'>
        <div
          className='min-w-80 h-[500px] rounded-xl overflow-hidden'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${selectedDetail.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className='max-w-2xl w-full'>
          <h1 className='text-3xl font-bold mb-4'>{selectedDetail.title}</h1>
          <p className='text-lg font-light text-white/80 mb-8'>{selectedDetail.overview}</p>

          <div className='flex gap-3'>
            <FocusNode className="btn" onSelected={() => setSelectedDetail(null)}>
              Back
            </FocusNode>
            <FocusNode className="btn">
              Play
            </FocusNode>
          </div>
        </div>
      </div>
    </div>
  );
}
