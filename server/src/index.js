import spdy from 'spdy';
import fs from 'fs';
import path from 'path';

import { app } from './app';
import { insertSeeds } from './seeds';
import { sequelize } from './sequelize';

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../keys/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../keys/cert.pem')),
};

async function main() {
  const server = spdy.createServer(options, app);

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
