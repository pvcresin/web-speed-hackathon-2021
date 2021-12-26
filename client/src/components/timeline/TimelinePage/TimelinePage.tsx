import React from 'react';

import { Timeline } from '../Timeline';

const TimelinePage: React.VFC<{ timeline: Array<Models.Post> }> = ({ timeline }) => {
  return <Timeline timeline={timeline} />;
};

export { TimelinePage };
