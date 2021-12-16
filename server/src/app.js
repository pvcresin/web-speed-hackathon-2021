import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const app = Express();

app.set('trust proxy', true);

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

const MAX_AGE_SECOND = 60 * 60 * 1; // 1h

app.use((_req, res, next) => {
  res.header({
    'Cache-Control': `max-age=${MAX_AGE_SECOND}, no-transform`,
    Connection: 'close',
  });
  return next();
});

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
