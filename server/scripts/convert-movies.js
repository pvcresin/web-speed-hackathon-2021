const path = require('path');
const fs = require('fs');

const { createFFmpeg } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({ log: false });

/**
 * 正方形にくり抜かれた無音動画を作成します
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.size]
 * @returns {Promise<Uint8Array>}
 */
async function convertMovie(buffer, options = { extension: 'webm', size: 600 }) {
  const cropOptions = ["'min(iw,ih)':'min(iw,ih)'", options.size ? `scale=${options.size}:${options.size}` : undefined]
    .filter(Boolean)
    .join(',');

  const exportFile = `export.${options.extension ?? 'gif'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(...['-i', 'file', '-r', '10', '-vf', `crop=${cropOptions}`, '-an', exportFile]);

  return ffmpeg.FS('readFile', exportFile);
}

const list = [];

const convert = async () => {
  const filePath = list[0];

  const data = fs.readFileSync(filePath);
  const converted = await convertMovie(data);
  const newPath = filePath.replace('gif', 'webm');

  fs.writeFileSync(newPath, converted);
};

convert();
