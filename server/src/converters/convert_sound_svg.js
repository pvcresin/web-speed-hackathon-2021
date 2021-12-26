import decode from 'audio-decode';
import { Lame } from 'node-lame';

const mean = (values) => values.reduce((acc, cur) => acc + cur, 0) / values.length;

const zip = (...args) => {
  const result = [];
  for (let i = 0; i < args[0].length; i++) {
    result.push(args.map((arg) => arg[i]));
  }
  return result;
};

const chunk = (arr, num) => {
  const result = [];
  while (arr.length > 0) {
    result.push(arr.splice(0, num));
  }
  return result;
};

/**
 * @param {Buffer} buffer
 * @returns {Promise<string>}
 */
async function convertSoundSvg(buffer) {
  const decoder = new Lame({ output: 'buffer' }).setBuffer(buffer);

  // 音声をデコードする
  const decodedData = await decoder.decode().then(() => decoder.getBuffer());
  /** @type {AudioBuffer} */
  const audioBuffer = await decode(decodedData);

  // 左の音声データの絶対値を取る
  const leftData = audioBuffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = audioBuffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = zip(leftData, rightData).map(mean);
  // 100 個の chunk に分ける
  const chunks = chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(mean);
  // chunk の平均の中から最大値を取る
  const max = Math.max(...peaks);

  const rects = peaks.map((peak, idx) => {
    const ratio = peak / max;
    return `<rect fill="#2563EB" height="${ratio}" width="1" x="${idx}" y="${1 - ratio}"></rect>`;
  });

  const svgText = [
    '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">',
    ...rects,
    '</svg>',
    '',
  ].join('');

  return svgText;
}

export { convertSoundSvg };

/* <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
  <rect fill="#2563EB" height="0.22271860763387885" width="1" x="0" y="0.7772813923661211"></rect>
  <rect fill="#2563EB" height="0.010989178769576573" width="1" x="99" y="0.9890108212304234"></rect>
</svg>; */
