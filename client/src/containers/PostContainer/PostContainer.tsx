import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { PostPage } from '../../components/post/PostPage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

const PostContainer: React.VFC = () => {
  const { postId } = useParams();

  const { data: post, isLoading: isLoadingPost } = useFetch<Models.Post>(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch<Models.Comment>(`/api/v1/posts/${postId}/comments`, fetchJSON);

  React.useEffect(() => {
    if (isLoadingPost) {
      document.title = '読込中 - CAwitter';
      return;
    }
    if (post !== null) {
      document.title = `${post.user.name} さんのつぶやき - CAwitter`;
    }
  }, [isLoadingPost, post]);

  if (isLoadingPost) return null;

  if (post === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={comments}>
      <PostPage comments={comments} post={post} />
    </InfiniteScroll>
  );
};

export { PostContainer };
