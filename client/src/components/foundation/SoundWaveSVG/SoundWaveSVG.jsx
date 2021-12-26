import React from 'react';
import { getSoundSvgPath } from '../../../utils/get_path';

/**
 * @typedef {object} Props
 * @property {string} soundId
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = React.memo(({ soundId }) => {
  return <img className="w-full h-full" src={getSoundSvgPath(soundId)} loading="lazy" />;
});

export { SoundWaveSVG };
