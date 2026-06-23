import { useState, useMemo } from 'react';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import './HomePage.css';

export default function HomePage({ unpurchasedItems, onPurchase, onAdd, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState('');
  const [hyakunenOnly, setHyakunenOnly] = useState(false);
  const [groupByStore, setGroupByStore] = useState(false);

  const filtered = useMemo(() => {
    let list = unpurchasedItems;
    if (hyakunenOnly) {
      list = list.filter((i) => i.hyakunen);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.memo || '').toLowerCase().includes(q) ||
          (i.store || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [unpurchasedItems, hyakunenOnly, search]);

  const groups = useMemo(() => {
    if (!groupByStore) return null;
    const map = {};
    filtered.forEach((item) => {
      const key = item.store?.trim() || '店舗未定';
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return Object.entries(map).sort(([a], [b]) => {
      if (a === '店舗未定') return 1;
      if (b === '店舗未定') return -1;
      return a.localeCompare(b, 'ja');
    });
  }, [filtered, groupByStore]);

  const hyakunenCount = unpurchasedItems.filter((i) => i.hyakunen).length;

  const handleSaveNew = (data) => {
    onAdd(data);
    setShowForm(false);
  };

  const handleSaveEdit = (data) => {
    onUpdate(editItem.id, data);
    setEditItem(null);
  };

  const isEmpty = filtered.length === 0;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">🛒 買うものリスト</h1>
        <span className="page-count">{unpurchasedItems.length}件</span>
      </div>

      {/* 検索 + 100均フィルター */}
      <div className="filter-bar">
        <div className="search-bar">
          <span className="search-bar__icon">🔍</span>
          <input
            className="search-bar__input"
            type="search"
            placeholder="商品・店舗を検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-bar__clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <button
          className={`hyakunen-filter ${hyakunenOnly ? 'hyakunen-filter--on' : ''}`}
          onClick={() => setHyakunenOnly((v) => !v)}
        >
          💴
          {hyakunenOnly ? '100均のみ' : '100均'}
          {hyakunenCount > 0 && !hyakunenOnly && (
            <span className="hyakunen-filter__count">{hyakunenCount}</span>
          )}
        </button>
      </div>

      {/* すべて / 店舗別 切り替え */}
      <div className="view-toggle">
        <button
          className={`view-toggle__btn ${!groupByStore ? 'view-toggle__btn--active' : ''}`}
          onClick={() => setGroupByStore(false)}
        >
          すべて表示
        </button>
        <button
          className={`view-toggle__btn ${groupByStore ? 'view-toggle__btn--active' : ''}`}
          onClick={() => setGroupByStore(true)}
        >
          🏪 店舗別
        </button>
      </div>

      {/* リスト */}
      <div className="item-list">
        {isEmpty ? (
          <div className="empty-state">
            <p className="empty-state__icon">{hyakunenOnly ? '💴' : '🛍️'}</p>
            <p className="empty-state__text">
              {hyakunenOnly
                ? '100均候補の商品がありません'
                : search
                ? '商品が見つかりません'
                : 'まだ商品がありません\n下のボタンから追加しましょう'}
            </p>
          </div>
        ) : groupByStore && groups ? (
          groups.map(([store, storeItems]) => (
            <div key={store} className="store-group">
              <div className="store-group__header">
                <span className="store-group__name">
                  {store === '店舗未定' ? '📌 店舗未定' : `📍 ${store}`}
                </span>
                <span className="store-group__count">{storeItems.length}件</span>
              </div>
              {storeItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onPurchase={onPurchase}
                  onEdit={setEditItem}
                />
              ))}
            </div>
          ))
        ) : (
          filtered.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onPurchase={onPurchase}
              onEdit={setEditItem}
            />
          ))
        )}
      </div>

      <button className="fab" onClick={() => setShowForm(true)}>
        ＋
      </button>

      {showForm && (
        <ItemForm
          title="商品を追加"
          onSave={handleSaveNew}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editItem && (
        <ItemForm
          title="商品を編集"
          initialData={editItem}
          onSave={handleSaveEdit}
          onCancel={() => setEditItem(null)}
        />
      )}
    </div>
  );
}
