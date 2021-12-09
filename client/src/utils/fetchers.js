import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const result = await fetch(url)
    .then((res) => {
      if (!res.ok) return null;
      return res.arrayBuffer();
    })
    .catch(() => null);
  return result;
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const result = await fetch(url)
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .catch(() => null);
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const result = await fetch(url, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    method: 'POST',
    body: file,
  })
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .catch(() => null);
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const compressed = gzip(jsonString);

  const result = await fetch(url, {
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: compressed,
  })
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .catch(() => null);
  return result;
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
