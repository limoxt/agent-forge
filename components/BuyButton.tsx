'use client';

import { useState } from 'react';

interface BuyButtonProps {
  teamId: string;
  price: number;
}

export default function BuyButton({ teamId, price }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuy = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId }),
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError('Failed to start checkout. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center py-8">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="pixel-btn pixel-btn-primary"
        style={{ fontSize: "14px", padding: "16px 48px" }}
      >
        {loading ? 'LOADING...' : `BUY NOW — $${price}`}
      </button>
      {error && (
        <p className="text-terminal mt-4" style={{ fontSize: "14px", color: "var(--danger)" }}>
          {error}
        </p>
      )}
      <p
        className="text-terminal mt-4"
        style={{ fontSize: "16px", color: "var(--text-muted)" }}
      >
        Instant delivery • One-time payment • Lifetime updates
      </p>
    </div>
  );
}