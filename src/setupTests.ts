import '@testing-library/jest-dom/vitest';

// Recent Node versions expose an experimental global `localStorage` that shadows jsdom's
// and is unusable without --localstorage-file: replace it with an in-memory implementation.
function createMemoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => Array.from(data.keys())[index] ?? null,
    removeItem: (key) => void data.delete(key),
    setItem: (key, value) => void data.set(key, String(value)),
  };
}

for (const name of ['localStorage', 'sessionStorage'] as const) {
  Object.defineProperty(window, name, { value: createMemoryStorage(), configurable: true });
}
