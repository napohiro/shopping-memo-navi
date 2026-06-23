import './ItemCard.css';

export default function ItemCard({ item, onPurchase, onRestore, onDelete, onEdit }) {
  return (
    <div className={`item-card ${item.purchased ? 'item-card--purchased' : ''}`}>
      {item.photo && (
        <div className="item-card__photo">
          <img src={item.photo} alt={item.name} />
        </div>
      )}
      <div className="item-card__body">
        <div className="item-card__header">
          <div className="item-card__badges">
            {item.hyakunen && (
              <span className="badge badge--hyakunen">💴 100均で探す</span>
            )}
          </div>
          {item.purchased && item.purchasedAt && (
            <span className="item-card__date">
              {new Date(item.purchasedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        <p className="item-card__name">{item.name}</p>
        {item.memo && <p className="item-card__memo">{item.memo}</p>}
        {(item.price || item.store) && (
          <div className="item-card__sub">
            {item.price && <span className="item-card__price">¥{item.price}</span>}
            {item.store && <span className="item-card__store">📍 {item.store}</span>}
          </div>
        )}
        <div className="item-card__actions">
          {!item.purchased && onPurchase && (
            <>
              <button className="btn btn--check" onClick={() => onPurchase(item.id)}>
                購入済みにする ✓
              </button>
              <button className="btn btn--icon" onClick={() => onEdit(item)} aria-label="編集">
                ✏️
              </button>
            </>
          )}
          {item.purchased && (
            <>
              {onRestore && (
                <button className="btn btn--restore" onClick={() => onRestore(item.id)}>
                  リストに戻す
                </button>
              )}
              {onDelete && (
                <button className="btn btn--delete" onClick={() => onDelete(item.id)}>
                  削除
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
