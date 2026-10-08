import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '../components/Icons';

export default function SiteHeader({ query, setQuery, cartCount, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  function closeNavigation() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Sammi's Furnishings home">
        <span className="wordmark-icon">s.</span>sammi's furnishings<span className="wordmark-period">.</span>
      </a>
      <button
        className={menuOpen ? 'mobile-menu-toggle is-open' : 'mobile-menu-toggle'}
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        title={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span className="menu-toggle-lines" aria-hidden="true" />
      </button>
      {menuOpen && (
        <button className="mobile-nav-backdrop" type="button" aria-label="Close navigation" onClick={closeNavigation} />
      )}
      <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <Link to="/" onClick={closeNavigation}>Home</Link>
        <Link to="/shop" onClick={closeNavigation}>Catalog</Link>
        <Link to="/about" onClick={closeNavigation}>About</Link>
        <Link className="cart-nav-link" to="/cart" onClick={closeNavigation}>
          Cart
          <span className="nav-cart-count">{cartCount}</span>
        </Link>
      </nav>
      <div className="header-actions">
        <label className="header-search">
          <SearchIcon />
          <input aria-label="Search furniture" placeholder="Search the good stuff" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        {user && (
          <button className="logout-button" type="button" onClick={onLogout}>Log out</button>
        )}
      </div>
    </header>
  );
}
