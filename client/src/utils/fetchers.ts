import { gzipSync } from 'fflate';

async function fetchJSON(url: string) {
  const result = await fetch(url)
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .catch(() => null);
  return result;
}

async function sendFile(url: string, file: File) {
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

async function sendJSON<T>(url: string, data: object) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzipSync(uint8Array);

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
      return res.json() as unknown as T;
    })
    .catch(() => null);
  return result;
}

export { fetchJSON, sendFile, sendJSON };
