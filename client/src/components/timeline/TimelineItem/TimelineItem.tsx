import dayjs from 'dayjs';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getProfileImagePath } from '../../../utils/get_path';
import { ImageArea } from '../../post/ImageArea';
import { MovieArea } from '../../post/MovieArea';
import { SoundArea } from '../../post/SoundArea';

const isClickedAnchorOrButton = (target: Element, currentTarget: Element) => {
  while (target !== null) {
    const tagName = target.tagName.toLowerCase();
    if (['button', 'a'].includes(tagName)) {
      return true;
    }
    if (currentTarget === target) {
      return false;
    }
    // @ts-expect-error 型 'null' を型 'Element' に割り当てることはできません。ts(2322)
    target = target.parentNode;
  }
  return false;
};

const TimelineItem: React.VFC<{ post: Models.Post }> = React.memo(({ post }) => {
  const navigate = useNavigate();

  /**
   * ボタンやリンク以外の箇所をクリックしたとき かつ 文字が選択されてないとき、投稿詳細ページに遷移する
   */
  const handleClick: React.MouseEventHandler = React.useCallback(
    (ev) => {
      const selection = document.getSelection();
      if (!selection) return;

      const isSelectedText = selection.isCollapsed === false;
      // @ts-expect-error 型 'EventTarget' の引数を型 'Element' のパラメーターに割り当てることはできません。
      if (!isClickedAnchorOrButton(ev.target, ev.currentTarget) && !isSelectedText) {
        navigate(`/posts/${post.id}`);
      }
    },
    [post, navigate],
  );

  return (
    <article className="px-1 hover:bg-gray-50 sm:px-4" onClick={handleClick}>
      <div className="flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link
            className="block w-12 h-12 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-16 sm:h-16"
            to={`/users/${post.user.username}`}
          >
            <img alt={post.user.profileImage.alt} src={getProfileImagePath(post.user.profileImage.id)} loading="lazy" />
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">
            <Link className="pr-1 text-gray-800 hover:underline font-bold" to={`/users/${post.user.username}`}>
              {post.user.name}
            </Link>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/users/${post.user.username}`}>
              @{post.user.username}
            </Link>
            <span className="pr-1 text-gray-500">-</span>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/posts/${post.id}`}>
              <time dateTime={dayjs(post.createdAt).toISOString()}>
                {dayjs(post.createdAt).locale('ja').format('LL')}
              </time>
            </Link>
          </p>
          <p className="text-gray-800 leading-relaxed">{post.text}</p>
          {post.images?.length > 0 ? (
            <div className="relative mt-2 w-full">
              <ImageArea images={post.images} />
            </div>
          ) : null}
          {post.movie ? (
            <div className="relative mt-2 w-full">
              <MovieArea movie={post.movie} />
            </div>
          ) : null}
          {post.sound ? (
            <div className="relative mt-2 w-full">
              <SoundArea sound={post.sound} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
});

export { TimelineItem };