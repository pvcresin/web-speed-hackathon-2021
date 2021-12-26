import React from 'react';

import { Timeline } from '../../timeline/Timeline';
import { UserProfileHeader } from '../UserProfileHeader';

const UserProfilePage: React.VFC<{
  timeline: Array<Models.Post>;
  user: Models.User;
}> = ({ timeline, user }) => {
  return (
    <>
      <UserProfileHeader user={user} />
      <div className="mt-6 border-t border-gray-300">
        <Timeline timeline={timeline} />
      </div>
    </>
  );
};

export { UserProfilePage };
