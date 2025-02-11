import classNames from 'classnames';
import React from 'react';

import { getImagePath } from '../../../utils/get_path';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';
import { CoveredImage } from '../../foundation/CoveredImage';

const ImageArea: React.VFC<{ images: Array<Models.Image> }> = ({ images }) => {
  return (
    <AspectRatioBox aspectHeight={9} aspectWidth={16}>
      <div className="grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        {images.map((image, idx) => {
          return (
            <div
              key={image.id}
              // CSS Grid で表示領域を指定する
              className={classNames('bg-gray-300', {
                'col-span-1': images.length !== 1,
                'col-span-2': images.length === 1,
                'row-span-1': images.length > 2 && (images.length !== 3 || idx !== 0),
                'row-span-2': images.length <= 2 || (images.length === 3 && idx === 0),
              })}
            >
              <CoveredImage alt={image.alt} src={getImagePath(image.id)} />
            </div>
          );
        })}
      </div>
    </AspectRatioBox>
  );
};

export { ImageArea };
