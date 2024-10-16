import { useState } from 'react';
import { FocusNode } from '@please/lrud';
import { AnimatePresence } from 'framer-motion';

import Profiles from './pages/profiles/profiles';
import Home from './pages/home/home';
import Nav from './layout/nav/nav';
import MovieDetail from './pages/movieDetail/movieDetail';

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({
    item: null,
    rowId: 0,
    movieIndex: 0
  });

  return (
    <FocusNode className='h-screen flex gap-10'>
      <AnimatePresence>
        {!selectedProfile && (
          <Profiles setSelectedProfile={setSelectedProfile} />
        )}
      </AnimatePresence>

      {selectedProfile && <Nav selectedProfile={selectedProfile} />}
      {!selectedDetail.item && selectedProfile && <Home selectedDetail={selectedDetail} setSelectedDetail={setSelectedDetail} />}
      {selectedDetail.item && <MovieDetail selectedDetail={selectedDetail} setSelectedDetail={setSelectedDetail} />}
    </FocusNode>
  );
}
