import { useMemo, useState } from 'react';
import ItemCard from '../components/ItemCard';
import './PurchasedPage.css';

export default function PurchasedPage({ purchasedItems, onRestore, onDelete }) {
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

  const sortedItems = useMemo(
    () => [...purchasedItems].sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt)),
    [purchasedItems]
  );

  const handleDeleteAll = () => {
    sortedItems.forEach((item) => onDelete(item.id));
    setConfirmDeleteAll(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">✅ 購入済み</h1>
        <span className="page-count">{purchasedItems.length}件</span>
      </div>

      {purchasedItems.length > 0 && (
        <div className="purchased-toolbar">
          {!confirmDeleteAll ? (
            <button className="btn-text-danger" onClick={() => setConfirmDeleteAll(true)}>
              すべて削除
            </button>
          ) : (
            <div className="confirm-bar">
              <span className="confirm-bar__text">本当に削除しますか？</span>
              <button className="btn-text-danger" onClick={handleDeleteAll}>削除する</button>
              <button className="btn-text" onClick={() => setConfirmDeleteAll(false)}>キャンセル</button>
            </div>
          )}
        </div>
      )}

      <div className="item-list" style={{ padding: '4px 16px 16px' }}>
        {sortedItems.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__icon">📭</p>
            <p className="empty-state__text">購入済みの商品はありません</p>
          </div>
        ) : (
          sortedItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onRestore={onRestore}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
