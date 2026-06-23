export const CATEGORIES = [
  { id: 'all', label: 'すべて', emoji: '🛒' },
  { id: 'vegetable', label: '野菜・果物', emoji: '🥦' },
  { id: 'meat', label: '肉・魚', emoji: '🥩' },
  { id: 'dairy', label: '冷蔵・冷凍', emoji: '🧊' },
  { id: 'food', label: '食品・飲料', emoji: '🍱' },
  { id: 'snack', label: 'お菓子', emoji: '🍫' },
  { id: 'seasoning', label: '調味料', emoji: '🧂' },
  { id: 'daily', label: '日用品', emoji: '🧴' },
  { id: 'medicine', label: '薬・衛生用品', emoji: '💊' },
  { id: 'other', label: 'その他', emoji: '📦' },
];

export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
