import { ImagePool } from '@squoosh/lib';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {string} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Buffer>}
 */
async function convertImage(buffer, options) {
  const imagePool = new ImagePool();

  const image = imagePool.ingestImage(buffer);
  await image.decoded;

  const preprocessOptions = {
    resize: { enabled: true, width: options.width, height: options.height },
  };
  await image.preprocess(preprocessOptions);

  const encodeOptions = { [options.extension ?? 'jpeg']: 'auto' };
  await image.encode(encodeOptions);

  const rawEncodedImage = await image.encodedWith.avif;

  await imagePool.close();

  return rawEncodedImage.binary;
}

export { convertImage };
