import classNames from 'classnames';
import React from 'react';

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 */
const CoveredImage: React.VFC<{ alt: string; src: string }> = React.memo(({ alt, src }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [type, setType] = React.useState<'widthFull' | 'heightFull' | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const container = containerRef.current;
      const containerH = container?.clientHeight ?? 0;
      const containerW = container?.clientWidth ?? 0;
      const containerRatio = containerH / containerW;

      const imgH = img.height;
      const imgW = img.width;
      const imageRatio = imgH / imgW;

      setType(containerRatio <= imageRatio ? 'widthFull' : 'heightFull');
    };
    img.src = src;
  }, [src]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <img
        alt={alt}
        className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
          'opacity-0': type === null,
          'w-auto h-full': type === 'heightFull',
          'w-full h-auto': type === 'widthFull',
        })}
        src={src}
        loading="lazy"
      />
    </div>
  );
});

export { CoveredImage };
