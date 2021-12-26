import React from 'react';

import { getMoviePath } from '../../../utils/get_path';
import { PausableMovie } from '../../foundation/PausableMovie';

const MovieArea: React.VFC<{ movie: Models.Movie }> = ({ movie }) => {
  return (
    <div className="relative w-full h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      <PausableMovie src={getMoviePath(movie.id)} />
    </div>
  );
};

export { MovieArea };
