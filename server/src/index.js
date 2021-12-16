import http from 'http';
// import spdy from 'spdy';
// import fs from 'fs';
// import path from 'path';

import { app } from './app';
import { insertSeeds } from './seeds';
import { sequelize } from './sequelize';

async function main() {
  const server = http.createServer(app);
  // const server = spdy.createServer(
  //   {
  //     key: fs.readFileSync(path.resolve(__dirname, '../keys/key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, '../keys/cert.pem')),
  //   },
  //   app,
  // );

  // データベースの初期化をします
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
    const address = server.address();
    console.log(`Listening on ${address.address}:${address.port}`);
  });
}

main().catch(console.error);
