import classNames from 'classnames';
import React from 'react';

import { useFetch } from '../../../hooks/use_fetch';
import { fetchBinary } from '../../../utils/fetchers';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = React.memo(({ src }) => {
  /** @type {React.RefObject<HTMLVideoElement>} */
  const animatorRef = React.useRef(null);

  const defaultIsPlaying = React.useMemo(() => {
    const disableAutoPlay = Boolean(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    // 視覚効果 off のとき GIF を自動再生しない
    return !disableAutoPlay;
  }, []);

  const [isPlaying, setIsPlaying] = React.useState(defaultIsPlaying);

  const handleClick = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        animatorRef.current?.pause();
      } else {
        animatorRef.current?.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <video
          className="w-full h-full object-cover"
          ref={animatorRef}
          src={src}
          autoPlay={defaultIsPlaying}
          muted
          loop
          playsInline
          disableRemotePlayback
        />
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </AspectRatioBox>
  );
});

export { PausableMovie };
