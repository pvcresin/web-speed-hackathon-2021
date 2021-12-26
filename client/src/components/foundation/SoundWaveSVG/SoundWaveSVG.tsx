import React from 'react';
import { getSoundSvgPath } from '../../../utils/get_path';

const SoundWaveSVG: React.VFC<{ soundId: string }> = React.memo(({ soundId }) => {
  return <img className="w-full h-full" src={getSoundSvgPath(soundId)} loading="lazy" />;
});

export { SoundWaveSVG };
