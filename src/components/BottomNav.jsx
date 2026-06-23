import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const NAV_ITEMS = [
  { to: '/', label: '買うもの', icon: '🛒' },
  { to: '/purchased', label: '購入済み', icon: '✅' },
  { to: '/frequent', label: 'よく買う', icon: '⭐' },
  { to: '/settings', label: '設定', icon: '⚙️' },
];

export default function BottomNav({ unpurchasedCount }) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
        >
          <span className="bottom-nav__icon">
            {item.icon}
            {item.to === '/' && unpurchasedCount > 0 && (
              <span className="bottom-nav__badge">{unpurchasedCount}</span>
            )}
          </span>
          <span className="bottom-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
