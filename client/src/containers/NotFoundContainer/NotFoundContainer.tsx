import React from 'react';

import { NotFoundPage } from '../../components/application/NotFoundPage';

const NotFoundContainer: React.VFC = () => {
  React.useEffect(() => {
    document.title = 'ページが見つかりません - CAwitter';
  }, []);

  return <NotFoundPage />;
};

export { NotFoundContainer };
