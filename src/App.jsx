import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useItems } from './hooks/useItems';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import PurchasedPage from './pages/PurchasedPage';
import FrequentPage from './pages/FrequentPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const {
    items,
    unpurchasedItems,
    purchasedItems,
    frequentItems,
    addItem,
    updateItem,
    deleteItem,
    purchaseItem,
    restoreItem,
    addFrequentToList,
    deleteFrequentItem,
  } = useItems();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              unpurchasedItems={unpurchasedItems}
              onPurchase={purchaseItem}
              onAdd={addItem}
              onUpdate={updateItem}
            />
          }
        />
        <Route
          path="/purchased"
          element={
            <PurchasedPage
              purchasedItems={purchasedItems}
              onRestore={restoreItem}
              onDelete={deleteItem}
            />
          }
        />
        <Route
          path="/frequent"
          element={
            <FrequentPage
              frequentItems={frequentItems}
              onAddToList={addFrequentToList}
              onDeleteFrequent={deleteFrequentItem}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              items={items}
              frequentItems={frequentItems}
            />
          }
        />
      </Routes>
      <BottomNav unpurchasedCount={unpurchasedItems.length} />
    </BrowserRouter>
  );
}
