const fs = require('fs');
const decode = require('audio-decode');
const { Lame } = require('node-lame');

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

// npx cli-glob '../public/sounds/*.mp3'
const list = [
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/05333292-5786-4a1f-9046-6b4863da3286.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/10b3358c-945f-428e-a7f1-1558f675ef3d.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/2174b434-fe47-4c6a-9f30-de4d4e4c7554.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/28604fdc-0adb-40b0-bd67-ed39d61f007d.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/2abadebb-6fae-4db0-9dba-d3063d9cc2e1.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/42232f2b-b7b2-46f8-a3de-1eefbfbbd8c2.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/49a3663a-1e66-4e22-83b8-3c43f181a254.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/4ce92862-3d2d-47a4-975d-4b293173cec4.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/5352a4a1-6a47-445d-874d-6e08f811c4f4.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/56570f22-2db4-458c-981d-558021d2f648.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/5a93be41-caab-4eec-9ac1-8b57c24ccbe2.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/5d0cd8a0-805a-4fb8-940a-53d2dee9c87e.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/8bb8891c-40c1-4536-8eee-2ecdac298931.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/8ed91156-d15e-4a6a-87cc-87f2e8905fa3.mp3',
  '/Users/toriyama/Desktop/web-speed-hackathon-2021/public/sounds/93b848fe-24c8-4597-a515-463a910f6ceb.mp3',
];

const convert = async () => {
  // const filePath = list[0];

  for (const filePath of list) {
    const data = fs.readFileSync(filePath);

    const svgText = await convertSoundSvg(data);

    const newPath = filePath.replace('mp3', 'svg');

    fs.writeFileSync(newPath, svgText);
  }
};

convert();

/* <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
  <rect fill="#2563EB" height="0.22271860763387885" width="1" x="0" y="0.7772813923661211"></rect>
  <rect fill="#2563EB" height="0.010989178769576573" width="1" x="99" y="0.9890108212304234"></rect>
</svg>; */
