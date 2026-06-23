import { useState } from 'react';
import './FrequentPage.css';

export default function FrequentPage({ frequentItems, onAddToList, onDeleteFrequent }) {
  const [addedIds, setAddedIds] = useState(new Set());

  const handleAdd = (item) => {
    onAddToList(item);
    setAddedIds((prev) => new Set([...prev, item.id]));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">⭐ よく買うもの</h1>
        <span className="page-count">{frequentItems.length}件</span>
      </div>

      <p className="frequent-hint">購入チェックすると自動で登録されます。タップでリストに追加できます。</p>

      <div className="frequent-list">
        {frequentItems.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__icon">⭐</p>
            <p className="empty-state__text">
              商品を購入済みにすると{'\n'}ここに自動で追加されます
            </p>
          </div>
        ) : (
          frequentItems.map((item) => {
            const added = addedIds.has(item.id);
            return (
              <div key={item.id} className={`frequent-card ${added ? 'frequent-card--added' : ''}`}>
                {item.photo && (
                  <div className="frequent-card__photo">
                    <img src={item.photo} alt={item.name} />
                  </div>
                )}
                <div className="frequent-card__content">
                  <div className="frequent-card__meta">
                    {item.hyakunen && (
                      <span className="badge badge--hyakunen">💴 100均で探す</span>
                    )}
                    <span className="frequent-card__count">×{item.count}</span>
                  </div>
                  <p className="frequent-card__name">{item.name}</p>
                  {item.store && <p className="frequent-card__store">📍 {item.store}</p>}
                  {item.memo && <p className="frequent-card__memo">{item.memo}</p>}
                </div>
                <div className="frequent-card__actions">
                  <button
                    className={`frequent-add-btn ${added ? 'frequent-add-btn--done' : ''}`}
                    onClick={() => handleAdd(item)}
                    disabled={added}
                  >
                    {added ? '追加済み ✓' : '＋ リストに追加'}
                  </button>
                  <button
                    className="frequent-delete-btn"
                    onClick={() => onDeleteFrequent(item.id)}
                    aria-label="削除"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
