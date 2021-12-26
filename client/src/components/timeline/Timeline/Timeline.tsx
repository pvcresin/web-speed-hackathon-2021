import React from 'react';

import { TimelineItem } from '../TimelineItem';

const Timeline: React.VFC<{ timeline: Array<Models.Post> }> = ({ timeline }) => {
  return (
    <section>
      {timeline.map((post) => {
        return <TimelineItem key={post.id} post={post} />;
      })}
    </section>
  );
};

export { Timeline };
