import SiteFooter from '../layouts/SiteFooter';

const money = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

export default function CartPage({ products, cartItems, cartCount, cartProducts, cartSubtotal, changeQuantity, setCartItems, checkout, user, onLogout, navigate }) {
  return (
    <div className="storefront cart-page">
      <header className="site-header cart-site-header">
        <a className="wordmark" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }} aria-label="Sammi's Furnishings home">
          <span className="wordmark-icon">s.</span>sammi's furnishings<span className="wordmark-period">.</span>
        </a>
        <span className="cart-page-label">YOUR CART <span>({cartCount})</span></span>
        <div className="cart-header-actions">
          {user && (
            <button className="logout-button cart-logout" type="button" onClick={onLogout}>Log out</button>
          )}
          <button className="continue-shopping" type="button" onClick={() => navigate('/')}>Continue shopping <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      <main className="cart-main">
        <a className="cart-back-link" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>← Back to the collection</a>

        <div className="cart-title-row">
          <div>
            <p className="eyebrow">THE GOOD THINGS YOU FOUND</p>
            <h1>Your cart<span>.</span></h1>
          </div>
          <span className="cart-item-total">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
        </div>

        {cartProducts.length ? (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Items in your cart">
              {cartProducts.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className={`cart-item-image ${item.tone}`}><img src={`/images/products/${item.image}`} alt={item.name} /></div>
                  <div className="cart-item-info">
                    <p className="cart-item-maker">{item.maker}</p>
                    <h2>{item.name}</h2>
                    <p className="cart-item-category">{item.category}</p>
                    <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" aria-label="Decrease quantity" onClick={() => changeQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => changeQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-item" type="button" onClick={() => setCartItems((items) => items.filter((cartItem) => cartItem.id !== item.id))}>Remove</button>
                  </div>
                  <span className="cart-item-price">{money(item.price * item.quantity)}</span>
                </article>
              ))}
            </section>

            <aside className="cart-summary">
              <h2>Order summary</h2>
              <div className="summary-line"><span>Subtotal</span><span>{money(cartSubtotal)}</span></div>
              <div className="summary-line"><span>Delivery</span><span>{cartSubtotal >= 1000000 ? 'Complimentary' : 'Calculated at checkout'}</span></div>
              <div className="summary-total"><span>Total</span><span>{money(cartSubtotal)}</span></div>
              <button className="checkout-button" type="button" onClick={() => navigate('/checkout')}>Continue to checkout <span aria-hidden="true">→</span></button>
              <p className="summary-note">Every piece is selected to make the home feel more considered.</p>
            </aside>
          </div>
        ) : (
          <div className="cart-empty">
            <span className="cart-empty-mark">g.</span>
            <h2>Your cart is taking a little breather.</h2>
            <p>There’s nothing here yet. Your next favorite piece is waiting in the collection.</p>
            <button type="button" onClick={() => navigate('/')}>Explore the collection <span aria-hidden="true">↗</span></button>
          </div>
        )}
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  );
}
