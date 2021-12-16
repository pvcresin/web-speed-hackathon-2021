import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';
import expressStaticGzip from 'express-static-gzip';

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

// brotliでJSやCSSをサーブする（Prefetch分はなんかうまくできてない）
// Response HeadersのContent-Encoding: brで確認できる
router.use(
  '/',
  expressStaticGzip(CLIENT_DIST_PATH, {
    enableBrotli: true,
    maxAge: 1 * 60 * 60 * 1000, // 1h
    serveStatic: {
      setHeaders: setCustomCacheControl,
    },
  }),
);

// router.use(
//   serveStatic(CLIENT_DIST_PATH, {
//     etag: false,
//     lastModified: false,
//     maxAge,
//     setHeaders: setCustomCacheControl,
//   }),
// );

export { router as staticRouter };
