import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import './App.css';

const STORAGE_USERS = 'sammis-furnishings-users';
const STORAGE_SESSION = 'sammis-furnishings-session';

function readStoredUsers() {
  try {
    const savedUsers = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    return Array.isArray(savedUsers) ? savedUsers : [];
  } catch {
    return [];
  }
}

function readStoredSession() {
  try {
    const savedUser = JSON.parse(localStorage.getItem(STORAGE_SESSION) || 'null');
    return savedUser && typeof savedUser === 'object' ? savedUser : null;
  } catch {
    return null;
  }
}

const products = [
  { id: 'sf-003', name: 'The Sunday Loveseat', category: 'Sofas', maker: 'Fobath Studio', price: 1850000, rating: '4.9', image: 'sf-003.jpeg', tag: 'Bestseller', tone: 'sage' },
  { id: 'sf-011', name: 'Cloud Nine Bed', category: 'Bedroom', maker: 'Nook & Nest', price: 3290000, rating: '4.8', image: 'sf-011.jpeg', tag: 'Made to order', tone: 'rose' },
  { id: 'sf-010', name: 'Sunday Record Console', category: 'Living', maker: 'Fobath Studio', price: 1240000, rating: '5.0', image: 'sf-010.jpeg', tag: 'Small batch', tone: 'blue' },
  { id: 'sf-007', name: 'Sable Coffee Table', category: 'Living', maker: 'Atelier June', price: 680000, rating: '4.7', image: 'sf-007.jpeg', tag: 'New', tone: 'yellow' },
  { id: 'sf-005', name: 'The Alder Wardrobe', category: 'Bedroom', maker: 'Nook & Nest', price: 2140000, rating: '4.9', image: 'sf-005.jpeg', tag: '', tone: 'pink' },
  { id: 'sf-006', name: 'Studio Desk No. 4', category: 'Work', maker: 'Fobath Studio', price: 960000, rating: '4.8', image: 'sf-006.jpeg', tag: 'Staff favorite', tone: 'green' },
  { id: 'sf-012', name: 'The Sunday Bed', category: 'Bedroom', maker: 'Atelier June', price: 2890000, rating: '4.9', image: 'sf-012.jpeg', tag: '', tone: 'blue' },
  { id: 'sf-002', name: 'Walnut Media Wall', category: 'Living', maker: 'Fobath Studio', price: 1760000, rating: '4.8', image: 'sf-002.jpeg', tag: 'Custom sizes', tone: 'rose' },
  { id: 'sf-001', name: 'Modular TV Console', category: 'Living', maker: 'Atelier June', price: 890000, rating: '4.6', image: 'sf-001.jpeg', tag: '', tone: 'yellow' },
  { id: 'sf-004', name: 'Gridline Platform Bed', category: 'Bedroom', maker: 'Nook & Nest', price: 2480000, rating: '4.7', image: 'sf-004.jpeg', tag: '', tone: 'green' },
  { id: 'sf-008', name: 'Oakline Media Cabinet', category: 'Living', maker: 'Atelier June', price: 1390000, rating: '4.9', image: 'sf-008.jpeg', tag: 'One of a kind', tone: 'sage' },
  { id: 'sf-009', name: 'Halo Media Unit', category: 'Living', maker: 'Fobath Studio', price: 1580000, rating: '4.8', image: 'sf-009.jpeg', tag: '', tone: 'pink' },
  { id: 'sf-013', name: 'Marbletop Side Table', category: 'Living', maker: 'Atelier June', price: 420000, rating: '4.7', image: 'sf-013.jpeg', tag: 'New', tone: 'blue' },
  { id: 'sf-014', name: 'Linea Wardrobe', category: 'Bedroom', maker: 'Nook & Nest', price: 1940000, rating: '4.8', image: 'sf-014.jpeg', tag: '', tone: 'yellow' },
  { id: 'sf-015', name: 'Crosshatch Media Unit', category: 'Living', maker: 'Fobath Studio', price: 1190000, rating: '4.7', image: 'sf-015.jpeg', tag: '', tone: 'sage' },
  { id: 'sf-016', name: 'Luma Storage Wall', category: 'Living', maker: 'Atelier June', price: 1490000, rating: '4.8', image: 'sf-016.jpeg', tag: 'Made to order', tone: 'rose' },
  { id: 'sf-017', name: 'Harbor Nightstand', category: 'Bedroom', maker: 'Nook & Nest', price: 560000, rating: '4.7', image: 'sf-017.jpeg', tag: 'New', tone: 'sage' },
  { id: 'sf-018', name: 'Arlo Accent Bench', category: 'Living', maker: 'Fobath Studio', price: 720000, rating: '4.6', image: 'sf-018.jpeg', tag: '', tone: 'blue' },
  { id: 'sf-019', name: 'Edda Dining Chair', category: 'Living', maker: 'Atelier June', price: 430000, rating: '4.8', image: 'sf-019.jpeg', tag: 'Popular', tone: 'yellow' },
  { id: 'sf-020', name: 'Solace Lounge Chair', category: 'Living', maker: 'Nook & Nest', price: 980000, rating: '4.9', image: 'sf-020.jpeg', tag: 'Staff pick', tone: 'pink' },
  { id: 'sf-021', name: 'Marlow Entry Console', category: 'Living', maker: 'Fobath Studio', price: 1250000, rating: '4.7', image: 'sf-021.jpeg', tag: 'New', tone: 'green' },
  { id: 'sf-022', name: 'Rivet Stool', category: 'Living', maker: 'Atelier June', price: 340000, rating: '4.5', image: 'sf-022.jpeg', tag: '', tone: 'sage' },
  { id: 'sf-023', name: 'Crescent Bookcase', category: 'Work', maker: 'Fobath Studio', price: 1120000, rating: '4.8', image: 'sf-023.jpeg', tag: 'Small batch', tone: 'blue' },
  { id: 'sf-024', name: 'Brink Sideboard', category: 'Living', maker: 'Nook & Nest', price: 1620000, rating: '4.9', image: 'sf-024.jpeg', tag: 'Trending', tone: 'rose' },
  { id: 'sf-025', name: 'Tide Bar Cart', category: 'Living', maker: 'Atelier June', price: 760000, rating: '4.7', image: 'sf-025.jpeg', tag: '', tone: 'yellow' },
  { id: 'sf-026', name: 'Milo Display Cabinet', category: 'Living', maker: 'Fobath Studio', price: 1780000, rating: '4.8', image: 'sf-026.jpeg', tag: 'Designed for hosting', tone: 'green' },
  { id: 'sf-027', name: 'Aster Dining Bench', category: 'Living', maker: 'Atelier June', price: 690000, rating: '4.6', image: 'sf-027.jpeg', tag: '', tone: 'sage' },
  { id: 'sf-028', name: 'Lattice Cabinet', category: 'Bedroom', maker: 'Nook & Nest', price: 1880000, rating: '4.8', image: 'sf-028.jpeg', tag: 'Bestseller', tone: 'pink' },
  { id: 'sf-029', name: 'Noma Kitchen Edit', category: 'Living', maker: 'Fobath Studio', price: 2240000, rating: '4.9', image: 'sf-029.jpeg', tag: 'Statement', tone: 'blue' },
];

export default function App() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Everything');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [notice, setNotice] = useState('');
  const [user, setUser] = useState(() => readStoredSession());
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('sammis-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    try {
      localStorage.setItem('sammis-theme', theme);
    } catch {
      // ignore localStorage write failure
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_SESSION);
    }
  }, [user]);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartProducts = cartItems
    .map((item) => ({ ...products.find((product) => product.id === item.id), quantity: item.quantity }))
    .filter(Boolean);
  const cartSubtotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function addToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      return existingItem
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { id: product.id, quantity: 1 }];
    });
    setNotice(`${product.name} added to your cart`);
    window.setTimeout(() => setNotice(''), 2400);
  }

  function changeQuantity(id, amount) {
    setCartItems((items) => items
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function handleLogin({ email, password }) {
    const users = readStoredUsers();
    const match = users.find((account) => account.email.toLowerCase() === email.toLowerCase());

    if (!match || match.password !== password) {
      throw new Error('Invalid email or password.');
    }

    const sessionUser = { name: match.name, email: match.email };
    setUser(sessionUser);
    navigate('/checkout');
  }

  function handleSignup({ name, email, password }) {
    const users = readStoredUsers();
    const existingUser = users.find((account) => account.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      throw new Error('This email is already registered.');
    }

    const updatedUsers = [...users, { name, email, password }];
    localStorage.setItem(STORAGE_USERS, JSON.stringify(updatedUsers));

    setUser({ name, email });
    navigate('/checkout');
  }

  function handleCheckoutSubmit() {
    setCartItems([]);
    navigate('/success');
  }

  function handleLogout() {
    setUser(null);
    navigate('/');
  }

  function toggleTheme() {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '☾' : '☀'}
      </button>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              query={query}
              setQuery={setQuery}
              cartCount={cartCount}
              user={user}
              onLogout={handleLogout}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopPage
              products={products}
              category={category}
              setCategory={setCategory}
              query={query}
              setQuery={setQuery}
              sort={sort}
              setSort={setSort}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
              cartCount={cartCount}
              user={user}
              onLogout={handleLogout}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/about"
          element={<AboutPage query={query} setQuery={setQuery} cartCount={cartCount} user={user} onLogout={handleLogout} navigate={navigate} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartCount={cartCount}
              cartProducts={cartProducts}
              cartSubtotal={cartSubtotal}
              changeQuantity={changeQuantity}
              setCartItems={setCartItems}
              user={user}
              onLogout={handleLogout}
              navigate={navigate}
            />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} user={user} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleSignup} user={user} />} />
        <Route path="/checkout" element={<CheckoutPage cartProducts={cartProducts} cartSubtotal={cartSubtotal} user={user} navigate={navigate} />} />
        <Route path="/payment" element={<PaymentPage onPlaceOrder={handleCheckoutSubmit} />} />
        <Route path="/success" element={<SuccessPage user={user} navigate={navigate} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <div className={notice ? 'toast visible' : 'toast'} role="status" aria-live="polite">
        <span>✓</span>
        {notice}
      </div>
    </>
  );
}
