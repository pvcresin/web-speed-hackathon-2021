import React from 'react';

import { TermPage } from '../../components/term/TermPage';

const TermContainer: React.VFC = () => {
  React.useEffect(() => {
    document.title = '利用規約 - CAwitter';
  }, []);

  return <TermPage />;
};

export { TermContainer };
