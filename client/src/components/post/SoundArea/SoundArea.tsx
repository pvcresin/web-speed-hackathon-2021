import React from 'react';

import { SoundPlayer } from '../../foundation/SoundPlayer';

const SoundArea: React.VFC<{ sound: Models.Sound }> = ({ sound }) => {
  return (
    <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
      <SoundPlayer sound={sound} />
    </div>
  );
};

export { SoundArea };
