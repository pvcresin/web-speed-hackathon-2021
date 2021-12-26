import React from 'react';

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 */
const AspectRatioBox: React.VFC<{
  aspectHeight: number;
  aspectWidth: number;
  children: React.ReactNode;
}> = React.memo(({ aspectHeight, aspectWidth, children }) => {
  return (
    <div
      className="relative w-full h-1"
      style={{
        // アスペクト比を保ちながらレスポンシブ対応
        paddingTop: `${(aspectHeight / aspectWidth) * 100}%`,
      }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
});

export { AspectRatioBox };
