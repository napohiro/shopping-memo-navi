import './SettingsPage.css';

const APP_VERSION = '1.0.0';

export default function SettingsPage({ items, frequentItems }) {
  const totalItems = items.length;
  const purchasedItems = items.filter((i) => i.purchased).length;

  const handleClearAll = () => {
    if (window.confirm('すべてのデータを削除しますか？\nこの操作は取り消せません。')) {
      localStorage.removeItem('kaimonomemanavi_items');
      localStorage.removeItem('kaimonomemanavi_frequent');
      window.location.reload();
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">⚙️ 設定</h1>
      </div>

      <div className="settings-content">
        <section className="settings-section">
          <h2 className="settings-section__title">アプリについて</h2>
          <div className="settings-card">
            <div className="app-info">
              <div className="app-info__icon">🛒</div>
              <div>
                <p className="app-info__name">買い物メモナビ</p>
                <p className="app-info__desc">スーパーやドラッグストアでの買い物をスマートにサポートするメモアプリです。</p>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section__title">データ状況</h2>
          <div className="settings-card">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-item__value">{totalItems - purchasedItems}</span>
                <span className="stat-item__label">未購入</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__value">{purchasedItems}</span>
                <span className="stat-item__label">購入済み</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__value">{frequentItems.length}</span>
                <span className="stat-item__label">よく買う</span>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section__title">データ保存について</h2>
          <div className="settings-card settings-card--info">
            <p className="settings-info__icon">💾</p>
            <p className="settings-info__text">
              データはこの端末のブラウザ（LocalStorage）に保存されます。
            </p>
            <ul className="settings-info__list">
              <li>ログイン不要でご利用いただけます</li>
              <li>ブラウザのデータ削除でデータが消えます</li>
              <li>他の端末とは同期されません</li>
              <li>アプリのアンインストールでデータが消えます</li>
            </ul>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section__title">使い方</h2>
          <div className="settings-card">
            <div className="how-to">
              <div className="how-to__item">
                <span className="how-to__step">1</span>
                <span className="how-to__text">「＋」ボタンで商品を追加</span>
              </div>
              <div className="how-to__item">
                <span className="how-to__step">2</span>
                <span className="how-to__text">買ったら「購入済みにする」をタップ</span>
              </div>
              <div className="how-to__item">
                <span className="how-to__step">3</span>
                <span className="how-to__text">よく買うものは「⭐よく買う」に自動登録</span>
              </div>
              <div className="how-to__item">
                <span className="how-to__step">4</span>
                <span className="how-to__text">次回はワンタップでリストに追加</span>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section__title">データ管理</h2>
          <div className="settings-card">
            <button className="danger-btn" onClick={handleClearAll}>
              🗑️ すべてのデータを削除する
            </button>
            <p className="danger-hint">※ この操作は取り消せません</p>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section__title">バージョン情報</h2>
          <div className="settings-card">
            <div className="version-info">
              <div className="version-info__row">
                <span className="version-info__label">アプリ名</span>
                <span className="version-info__value">買い物メモナビ</span>
              </div>
              <div className="version-info__row">
                <span className="version-info__label">バージョン</span>
                <span className="version-info__value">v{APP_VERSION}</span>
              </div>
              <div className="version-info__row">
                <span className="version-info__label">対応環境</span>
                <span className="version-info__value">スマートフォン・PC</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
