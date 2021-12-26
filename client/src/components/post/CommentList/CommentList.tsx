import React from 'react';

import { CommentItem } from '../CommentItem';

const CommentList: React.VFC<{ comments: Array<Models.Comment> }> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export { CommentList };
