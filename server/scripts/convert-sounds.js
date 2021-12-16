const path = require('path');
const fs = require('fs');

const { createFFmpeg } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({ log: false });

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {string} [options.extension]
 * @returns {Promise<Uint8Array>}
 */
async function convertSound(buffer, options = { extension: 'aac' }) {
  const exportFile = `export.${options.extension ?? 'mp3'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(...['-i', 'file', '-vn', exportFile]);

  return ffmpeg.FS('readFile', exportFile);
}

const list = [];

const convert = async () => {
  const filePath = list[0];

  const data = fs.readFileSync(filePath);
  const converted = await convertSound(data);
  const newPath = filePath.replace('mp3', 'aac');

  fs.writeFileSync(newPath, converted);
};

convert();
