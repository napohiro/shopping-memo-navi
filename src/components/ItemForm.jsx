import { useState, useRef } from 'react';
import { useStores } from '../hooks/useStores';
import StoreSelect from './StoreSelect';
import './ItemForm.css';

const INITIAL = { name: '', memo: '', photo: null, price: '', store: '', hyakunen: false };

export default function ItemForm({ initialData = {}, onSave, onCancel, title }) {
  const [form, setForm] = useState({ ...INITIAL, ...initialData });
  const [photoPreview, setPhotoPreview] = useState(initialData.photo || null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const { stores, addStore } = useStores();

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setPhotoPreview(dataUrl);
      setForm((f) => ({ ...f, photo: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    setForm((f) => ({ ...f, photo: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (form.store?.trim()) addStore(form.store.trim());
    onSave(form);
  };

  return (
    <div className="item-form-overlay">
      <div className="item-form">
        <div className="item-form__header">
          <h2 className="item-form__title">{title}</h2>
          <button className="item-form__close" onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="item-form__body">

          <label className="form-label">
            商品名 <span className="form-required">必須</span>
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="例：シャンプー、洗剤"
            value={form.name}
            onChange={handleChange('name')}
            required
            autoFocus
          />

          <label className="form-label">写真</label>
          {photoPreview ? (
            <div className="photo-preview">
              <img src={photoPreview} alt="preview" />
              <button type="button" className="photo-preview__clear" onClick={clearPhoto}>✕</button>
            </div>
          ) : (
            <div className="photo-buttons">
              <button
                type="button"
                className="photo-btn"
                onClick={() => cameraInputRef.current?.click()}
              >
                📷 カメラで撮影
              </button>
              <button
                type="button"
                className="photo-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                🖼️ ライブラリから選択
              </button>
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" hidden onChange={handlePhotoFile} />
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoFile} />
            </div>
          )}

          <label className="form-label">メモ</label>
          <textarea
            className="form-input form-input--textarea"
            placeholder="数量・ブランド・注意点など"
            value={form.memo}
            onChange={handleChange('memo')}
            rows={2}
          />

          <div className="form-row">
            <div className="form-col">
              <label className="form-label">価格（目安）</label>
              <div className="form-input-prefix">
                <span className="form-prefix">¥</span>
                <input
                  className="form-input form-input--inline"
                  type="number"
                  min="0"
                  placeholder="500"
                  value={form.price}
                  onChange={handleChange('price')}
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="form-col">
              <label className="form-label">購入予定店舗</label>
              <StoreSelect
                value={form.store}
                onChange={(val) => setForm((f) => ({ ...f, store: val }))}
                savedStores={stores}
              />
            </div>
          </div>

          <div
            className={`hyakunen-toggle ${form.hyakunen ? 'hyakunen-toggle--on' : ''}`}
            onClick={() => setForm((f) => ({ ...f, hyakunen: !f.hyakunen }))}
            role="checkbox"
            aria-checked={form.hyakunen}
            tabIndex={0}
            onKeyDown={(e) => e.key === ' ' && setForm((f) => ({ ...f, hyakunen: !f.hyakunen }))}
          >
            <div className="hyakunen-toggle__left">
              <span className="hyakunen-toggle__icon">💴</span>
              <div>
                <p className="hyakunen-toggle__title">100均にありそう</p>
                <p className="hyakunen-toggle__sub">バッジで目印を付けます</p>
              </div>
            </div>
            <div className={`hyakunen-toggle__switch ${form.hyakunen ? 'hyakunen-toggle__switch--on' : ''}`}>
              <div className="hyakunen-toggle__knob" />
            </div>
          </div>

          <button type="submit" className="form-submit" disabled={!form.name.trim()}>
            保存する
          </button>
        </form>
      </div>
    </div>
  );
}
