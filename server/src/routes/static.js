import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

const maxAge = '1h';

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}

router.use(
  serveStatic(UPLOAD_PATH, {
    etag: false,
    lastModified: false,
    maxAge,
    setHeaders: setCustomCacheControl,
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    etag: false,
    lastModified: false,
    maxAge,
    setHeaders: setCustomCacheControl,
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    etag: false,
    lastModified: false,
    maxAge,
    setHeaders: setCustomCacheControl,
  }),
);

export { router as staticRouter };
