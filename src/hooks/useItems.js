import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export function useItems() {
  const [items, setItems] = useLocalStorage('kaimonomemanavi_items', []);
  const [frequentItems, setFrequentItems] = useLocalStorage('kaimonomemanavi_frequent', []);

  const addItem = useCallback((itemData) => {
    const newItem = {
      id: generateId(),
      name: itemData.name,
      memo: itemData.memo || '',
      photo: itemData.photo || null,
      price: itemData.price || '',
      store: itemData.store || '',
      hyakunen: itemData.hyakunen || false,
      purchased: false,
      createdAt: new Date().toISOString(),
      purchasedAt: null,
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, [setItems]);

  const updateItem = useCallback((id, updates) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, ...updates } : item));
  }, [setItems]);

  const deleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, [setItems]);

  const purchaseItem = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, purchased: true, purchasedAt: new Date().toISOString() }
          : item
      )
    );
    const item = items.find((i) => i.id === id);
    if (item) {
      setFrequentItems((prev) => {
        const existing = prev.find((f) => f.name === item.name);
        if (existing) {
          return prev.map((f) =>
            f.name === item.name
              ? { ...f, count: f.count + 1, hyakunen: item.hyakunen, store: item.store }
              : f
          );
        }
        return [
          ...prev,
          {
            id: generateId(),
            name: item.name,
            memo: item.memo,
            photo: item.photo,
            price: item.price,
            store: item.store,
            hyakunen: item.hyakunen,
            count: 1,
          },
        ];
      });
    }
  }, [items, setItems, setFrequentItems]);

  const restoreItem = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: false, purchasedAt: null } : item
      )
    );
  }, [setItems]);

  const addFrequentToList = useCallback((frequentItem) => {
    const newItem = {
      id: generateId(),
      name: frequentItem.name,
      memo: frequentItem.memo || '',
      photo: frequentItem.photo || null,
      price: frequentItem.price || '',
      store: frequentItem.store || '',
      hyakunen: frequentItem.hyakunen || false,
      purchased: false,
      createdAt: new Date().toISOString(),
      purchasedAt: null,
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, [setItems]);

  const deleteFrequentItem = useCallback((id) => {
    setFrequentItems((prev) => prev.filter((item) => item.id !== id));
  }, [setFrequentItems]);

  const unpurchasedItems = items.filter((i) => !i.purchased);
  const purchasedItems = items.filter((i) => i.purchased);
  const sortedFrequent = [...frequentItems].sort((a, b) => b.count - a.count);

  return {
    items,
    unpurchasedItems,
    purchasedItems,
    frequentItems: sortedFrequent,
    addItem,
    updateItem,
    deleteItem,
    purchaseItem,
    restoreItem,
    addFrequentToList,
    deleteFrequentItem,
  };
}
