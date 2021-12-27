import React from 'react';

const InfiniteScroll: React.VFC<{
  children: React.ReactNode;
  fetchMore: () => void;
  items: unknown[];
}> = React.memo(({ children, fetchMore, items }) => {
  const latestItem = items[items.length - 1];

  const prevReachedRef = React.useRef(false);

  React.useEffect(() => {
    const handler = () => {
      // 最下部かどうかを確認する
      const hasReached = window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight;

      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current) {
        // アイテムがないときは追加で読み込まない
        if (latestItem !== undefined) {
          fetchMore();
        }
      }

      prevReachedRef.current = hasReached;
    };

    // 最初は実行されないので手動で呼び出す
    prevReachedRef.current = false;
    handler();

    document.addEventListener('wheel', handler, { passive: false });
    document.addEventListener('touchmove', handler, { passive: false });
    document.addEventListener('resize', handler, { passive: false });
    document.addEventListener('scroll', handler, { passive: false });
    return () => {
      document.removeEventListener('wheel', handler);
      document.removeEventListener('touchmove', handler);
      document.removeEventListener('resize', handler);
      document.removeEventListener('scroll', handler);
    };
  }, [latestItem, fetchMore]);

  return <>{children}</>;
});

export { InfiniteScroll };