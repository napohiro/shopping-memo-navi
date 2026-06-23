import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useStores() {
  const [stores, setStores] = useLocalStorage('kaimonomemanavi_stores', []);

  const addStore = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setStores((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  }, [setStores]);

  const deleteStore = useCallback((name) => {
    setStores((prev) => prev.filter((s) => s !== name));
  }, [setStores]);

  return { stores, addStore, deleteStore };
}
