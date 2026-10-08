export default function SuccessPage({ user, navigate }) {
  return (
    <div className="success-page">
      <div className="success-shell">
        <div className="success-card">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h1>Order confirmed</h1>
          <p>
            {user?.name ? `Thanks, ${user.name}.` : 'Thank you for shopping with Sammi\'s Furnishings.'} Your furniture is on its way, and a confirmation email has been sent.
          </p>
          <div className="success-actions">
            <button type="button" className="primary-button" onClick={() => navigate('/')}>
              Continue shopping
            </button>
            <button type="button" className="ghost-button" onClick={() => navigate('/cart')}>
              View cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
