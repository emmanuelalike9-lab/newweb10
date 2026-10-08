import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const money = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

export default function PaymentPage({ onPlaceOrder }) {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state || {};
  const amount = Number(paymentData.amount || 0);
  const email = paymentData.email || '';
  const name = paymentData.name || '';
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const hasMissingDetails = !amount || !email;
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    if (hasMissingDetails || !publicKey) {
      return;
    }

    let isCancelled = false;
    let hasOpened = false;

    const loadPaystack = () => {
      if (isCancelled || hasOpened) {
        return;
      }

      if (!window.PaystackPop) {
        setError('Paystack failed to load. Please refresh the page and try again.');
        setIsLoading(false);
        return;
      }

      const [firstName, ...rest] = name.split(' ');
      const lastName = rest.join(' ');

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount: Math.round(amount * 100),
        currency: 'NGN',
        ref: `sammis-furnishings-${Date.now()}`,
        firstname: firstName || '',
        lastname: lastName || '',
        callback: function() {
          if (!isCancelled) {
            hasOpened = true;
            onPlaceOrder();
            setIsLoading(false);
          }
        },
        onClose: function() {
          if (!isCancelled) {
            hasOpened = true;
            setError('Payment was cancelled. You can retry when you are ready.');
            setIsLoading(false);
          }
        },
      });

      hasOpened = true;
      handler.openIframe();
    };

    if (window.PaystackPop) {
      loadPaystack();
      return () => {
        isCancelled = true;
      };
    }

    const existingScript = document.getElementById('paystack-inline-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (!isCancelled) {
          loadPaystack();
        }
      }, { once: true });
      return () => {
        isCancelled = true;
      };
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-script';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      if (!isCancelled) loadPaystack();
    };
    script.onerror = () => {
      if (!isCancelled) {
        setError('Unable to connect to Paystack. Check your network and try again.');
        setIsLoading(false);
      }
    };
    document.body.appendChild(script);

    return () => {
      isCancelled = true;
    };
  }, [amount, email, name, hasMissingDetails, onPlaceOrder, publicKey]);

  const paymentError = hasMissingDetails
    ? 'No payment details were found. Please return to checkout.'
    : !publicKey
      ? 'Paystack public key is missing. Please add VITE_PAYSTACK_PUBLIC_KEY to your environment.'
      : error;

  return (
    <div className="payment-page">
      <div className="payment-shell">
        <div className="payment-card">
          <div className="payment-header">
            <div>
              <p className="eyebrow">SECURE PAYMENT</p>
              <h1>Pay with Paystack</h1>
            </div>
            <button type="button" className="ghost-button" onClick={() => navigate('/checkout')}>Back to checkout</button>
          </div>

          <div className="payment-amount-row">
            <span>Total due</span>
            <strong>{money(amount)}</strong>
          </div>

          {paymentError ? (
            <div className="payment-state error-state">
              <p>{paymentError}</p>
              <button type="button" className="primary-button" onClick={() => navigate('/checkout')}>Return to checkout</button>
            </div>
          ) : (
            <div className="payment-state">
              <p>{isLoading ? 'Preparing a secure Paystack payment...' : 'Payment is ready to open in the Paystack window.'}</p>
              <button type="button" className="primary-button" onClick={() => window.location.reload()}>
                {isLoading ? 'Loading payment...' : 'Retry payment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
