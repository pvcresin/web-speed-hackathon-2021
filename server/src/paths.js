import path from 'path';
import fs from 'fs';

import fse from 'fs-extra';
import rimraf from 'rimraf';

const isGcp = process.env.SERVER === 'gcp';

const PUBLIC_PATH = path.resolve(__dirname, '../../public');

const LOCAL_UPLOAD_PATH = path.resolve(__dirname, '../../upload');
const TMP_UPLOAD_PATH = '/tmp/upload';

const CLIENT_DIST_PATH = path.resolve(__dirname, '../../dist');

const LOCAL_DATABASE_PATH = path.resolve(__dirname, '../database.sqlite');
const TMP_DATABASE_PATH = '/tmp/database.sqlite';

if (isGcp) {
  // uploadフォルダをtmpに作成
  rimraf.sync(TMP_UPLOAD_PATH);
  fse.copySync(LOCAL_UPLOAD_PATH, TMP_UPLOAD_PATH);

  // DBをtmpにコピー
  fs.copyFileSync(LOCAL_DATABASE_PATH, TMP_DATABASE_PATH);
}

const UPLOAD_PATH = isGcp ? TMP_UPLOAD_PATH : LOCAL_UPLOAD_PATH;
const DATABASE_PATH = isGcp ? TMP_DATABASE_PATH : LOCAL_DATABASE_PATH;

export { PUBLIC_PATH, CLIENT_DIST_PATH, DATABASE_PATH, UPLOAD_PATH };
