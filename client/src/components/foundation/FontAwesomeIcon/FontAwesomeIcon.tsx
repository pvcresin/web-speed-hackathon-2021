import React from 'react';

const FontAwesomeIcon: React.VFC<{
  iconType: string;
  styleType: 'solid' | 'regular';
}> = React.memo(({ iconType, styleType }) => {
  return (
    <svg className="font-awesome inline-block leading-none fill-current">
      <use xlinkHref={`/sprites/font-awesome/${styleType}.svg#${iconType}`} />
    </svg>
  );
});

export { FontAwesomeIcon };
