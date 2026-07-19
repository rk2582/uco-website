'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import RazorpayScript from '@/components/RazorpayScript';

const presetAmounts = [1000, 5000, 10000, 25000];

export default function Donate() {
  const [purpose, setPurpose] = useState('DONATION');
  const [amount, setAmount] = useState(5000);
  const [donor, setDonor] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, purpose }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        name: 'United Contractors Organisation',
        description: purpose.replace('_', ' '),
        order_id: orderData.orderId,
        handler: function () {
          setStatus('success');
        },
        prefill: { name: donor.name, email: donor.email, contact: donor.phone },
        theme: { color: '#0A2647' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div>
      <RazorpayScript />
      <PageHero eyebrow="Support UCO" title="Donate / Sponsor / CSR" subtitle="Support UCO's mission to strengthen India's construction and infrastructure ecosystem." />
      <section className="container-page py-16 flex justify-center">
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-8 max-w-md text-center">
            Thank you for your contribution to UCO.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 w-full max-w-md">
            <div className="grid gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Contribution Type</label>
                <select
                  value={purpose} onChange={(e) => setPurpose(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="DONATION">Donation</option>
                  <option value="SPONSORSHIP">Sponsorship</option>
                  <option value="CSR">CSR Contribution</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Amount (&#8377;)</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {presetAmounts.map((a) => (
                    <button
                      type="button" key={a}
                      onClick={() => setAmount(a)}
                      className={`text-sm py-2 rounded border ${amount === a ? 'bg-navy text-white border-navy' : 'border-gray-300 text-navy'}`}
                    >
                      &#8377;{a.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <input
                  type="number" min="1" value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Name</label>
                <input
                  required value={donor.name}
                  onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Email</label>
                <input
                  required type="email" value={donor.email}
                  onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Phone</label>
                <input
                  required value={donor.phone}
                  onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              {status === 'error' && <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>}

              <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:opacity-60">
                {status === 'submitting' ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
