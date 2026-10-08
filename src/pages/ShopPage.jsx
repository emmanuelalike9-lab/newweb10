import { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SiteHeader from '../layouts/SiteHeader';
import SiteFooter from '../layouts/SiteFooter';

const categories = ['Everything', 'Living', 'Sofas', 'Bedroom', 'Work'];

export default function ShopPage({
  products,
  category,
  setCategory,
  query,
  setQuery,
  sort,
  setSort,
  favorites,
  toggleFavorite,
  addToCart,
  cartCount,
  user,
  onLogout,
  navigate,
}) {
  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'Everything' || product.category === category;
      const matchesQuery = !normalizedQuery || `${product.name} ${product.category} ${product.maker}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    if (sort === 'price-low') return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...filtered].sort((a, b) => Number(b.rating) - Number(a.rating));
    return filtered;
  }, [category, products, query, sort]);

  return (
    <div className="storefront">
      <SiteHeader query={query} setQuery={setQuery} cartCount={cartCount} user={user} onLogout={onLogout} navigate={navigate} />

      <main id="top" className="page-shell shop-shell">
        <section className="shop-hero" aria-labelledby="shop-hero-title">
          <div className="shop-hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A GOOD PLACE TO START</p>
            <h1 id="shop-hero-title">Curated furniture for <em>real life.</em></h1>
            <p>Made slowly and designed to settle into the everyday rhythm of your home.</p>
            <div className="shop-hero-meta">
              <span><strong>120+</strong> pieces</span>
              <span><strong>24</strong> curated partners</span>
              <span><strong>4.8/5</strong> average rating</span>
            </div>
          </div>

          <div className="shop-hero-card" aria-label="Featured furniture offer">
            <div className="shop-hero-card-art">
              <img src="/images/products/sf-003.jpeg" alt="Featured handmade loveseat" />
            </div>
            <div className="shop-hero-card-copy">
              <p className="eyebrow">FEATURED PIECE</p>
              <h2>The Sunday Loveseat</h2>
              <div className="shop-hero-card-row">
                <span>From ₦1,850,000</span>
                <a href="#shop">Shop now <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="shop-picks" aria-label="Curated furniture highlights">
          <article className="shop-pick">
            <div className="shop-pick-image"><img src="/images/products/sf-003.jpeg" alt="Best-selling loveseat" /></div>
            <div className="shop-pick-copy">
              <p className="eyebrow">BEST SELLERS</p>
              <h3>Statement seating</h3>
              <a href="#shop">Browse the favourites <span aria-hidden="true">↗</span></a>
            </div>
          </article>

          <article className="shop-pick">
            <div className="shop-pick-image"><img src="/images/products/sf-006.jpeg" alt="Work-from-home desk" /></div>
            <div className="shop-pick-copy">
              <p className="eyebrow">WORK SMART</p>
              <h3>Focused spaces</h3>
              <a href="#shop">See work essentials <span aria-hidden="true">↗</span></a>
            </div>
          </article>

          <article className="shop-pick">
            <div className="shop-pick-image"><img src="/images/products/sf-011.jpeg" alt="Bedroom furniture" /></div>
            <div className="shop-pick-copy">
              <p className="eyebrow">SLOW LIVING</p>
              <h3>Bedroom rituals</h3>
              <a href="#shop">Shop calming pieces <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </section>

        <section className="shop-section" id="shop">
          <div className="shop-heading">
            <div><p className="eyebrow">SHOP THE COLLECTION</p><h2>Pieces with <em>purpose.</em></h2></div>
            <p className="shop-intro">Meet the pieces we’re proudest of.<br />Each one has a story worth bringing home.</p>
          </div>

          <div className="shop-controls">
            <div className="category-tabs" role="group" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? 'category-tab active' : 'category-tab'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="sort-control">Sort by
              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
              <span aria-hidden="true">⌄</span>
            </label>
          </div>

          {visibleProducts.length ? (
            <div className="products-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  toggleFavorite={toggleFavorite}
                  addToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>✳</span>
              <h3>No pieces found just yet.</h3>
              <p>Try another search or choose a different room.</p>
              <button type="button" onClick={() => { setQuery(''); setCategory('Everything'); }}>Show everything</button>
            </div>
          )}

          <div className="collection-footer">
            <span>Showing {visibleProducts.length} of {products.length} thoughtful finds</span>
            <a href="#shop">Back to top <span aria-hidden="true">↑</span></a>
          </div>
        </section>
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  );
}
