import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const money = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

export default function CheckoutPage({ cartProducts, cartSubtotal, user, onPlaceOrder, navigate }) {
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const shipping = cartSubtotal >= 1000000 ? 0 : 15000;
  const total = cartSubtotal + shipping;

  function handleChange(event) {
    const { name, value } = event.target;
    const sanitizedValue = name === 'expiry'
      ? value.replace(/\D/g, '').slice(0, 4)
      : name === 'cvc'
        ? value.replace(/\D/g, '').slice(0, 3)
        : value;
    setForm((current) => ({ ...current, [name]: sanitizedValue }));
    if (error) setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requiredFields = [form.fullName, form.email, form.address, form.city, form.state, form.phone, form.cardNumber, form.expiry, form.cvc];
    if (requiredFields.some((field) => !field.trim())) {
      setError('Please complete all checkout fields.');
      return;
    }

    if (!/^\d{4}$/.test(form.expiry)) {
      setError('Expiry date must be exactly 4 digits.');
      return;
    }

    if (!/^\d{3}$/.test(form.cvc)) {
      setError('CVC must be exactly 3 digits.');
      return;
    }

    if (form.cardNumber.replace(/\s/g, '').length < 12) {
      setError('Please enter a valid card number.');
      return;
    }

    if (cartProducts.length === 0) {
      setError('Your cart is empty. Add a product before checkout.');
      return;
    }

    navigate('/payment', {
      state: {
        amount: total,
        email: form.email.trim(),
        name: form.fullName.trim(),
      },
    });
  }

  return (
    <div className="checkout-page">
      <div className="checkout-shell">
        <div className="checkout-header">
          <div>
            <p className="eyebrow">FINAL STEP</p>
            <h1>Checkout</h1>
          </div>
          <button type="button" className="ghost-button" onClick={() => navigate('/cart')}>Back to cart</button>
        </div>

        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <h2>Contact</h2>
              <div className="field-grid two-up">
                <label>
                  <span>Full name</span>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jane Doe" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2>Shipping</h2>
              <label>
                <span>Address</span>
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="12 Harbor Road" />
              </label>
              <div className="field-grid two-up">
                <label>
                  <span>City</span>
                  <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Lagos" />
                </label>
                <label>
                  <span>State</span>
                  <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="Lagos State" />
                </label>
              </div>
              <label>
                <span>Phone</span>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" />
              </label>
            </div>

            <div className="form-section">
              <h2>Payment</h2>
              <label>
                <span>Card number</span>
                <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" />
              </label>
              <div className="field-grid two-up">
                <label>
                  <span>Expiry</span>
                  <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MMYY" inputMode="numeric" maxLength={4} />
                </label>
                <label>
                  <span>CVC</span>
                  <input type="text" name="cvc" value={form.cvc} onChange={handleChange} placeholder="123" inputMode="numeric" maxLength={3} />
                </label>
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="primary-button full-width">Place order</button>
          </form>

          <aside className="checkout-summary">
            <h2>Order summary</h2>
            <div className="summary-list">
              {cartProducts.map((item) => (
                <div className="summary-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <span>{money(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="totals">
              <div><span>Subtotal</span><strong>{money(cartSubtotal)}</strong></div>
              <div><span>Shipping</span><strong>{shipping === 0 ? 'Free' : money(shipping)}</strong></div>
              <div className="grand-total"><span>Total</span><strong>{money(total)}</strong></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
