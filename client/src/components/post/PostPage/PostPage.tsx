import React from 'react';

import { CommentList } from '../CommentList';
import { PostItem } from '../PostItem';

const PostPage: React.VFC<{
  comments: Array<Models.Comment>;
  post: Models.Post;
}> = ({ comments, post }) => {
  return (
    <>
      <PostItem post={post} />
      <CommentList comments={comments} />
    </>
  );
};

export { PostPage };
