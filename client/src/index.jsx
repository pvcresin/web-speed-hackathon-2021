import 'dayjs/locale/ja';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from './containers/AppContainer';

dayjs.extend(localizedFormat);

ReactDOM.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.getElementById('app'),
);
