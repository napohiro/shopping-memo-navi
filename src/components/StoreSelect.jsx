import { useState } from 'react';
import './StoreSelect.css';

export default function StoreSelect({ value, onChange, savedStores }) {
  const [open, setOpen] = useState(false);

  const suggestions = (savedStores || []).filter((s) =>
    s.toLowerCase().includes((value || '').toLowerCase())
  );

  const handleSelect = (store) => {
    onChange(store);
    setOpen(false);
  };

  // setTimeout で blur → option click の競合を回避
  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="store-select">
      <input
        className="form-input"
        type="text"
        placeholder="スーパー、薬局など（自由入力）"
        value={value || ''}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul className="store-select__dropdown">
          {suggestions.map((store) => (
            <li key={store} className="store-select__item">
              <button
                type="button"
                className="store-select__option"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(store)}
              >
                <span className="store-select__pin">📍</span>
                {store}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
