'use client'

const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): string | boolean | null => {
  if (process.browser && localStorage.getItem(key)) {
    return String(localStorage.getItem(key));
  }
  return false;
};

const removeItem = (key: string): void | boolean => {
  if (getItem(key) === false) return false;
  localStorage.removeItem(key);
};

const clearStorage = (): void => {
  localStorage.clear();
};

export { setItem, getItem, removeItem, clearStorage};
