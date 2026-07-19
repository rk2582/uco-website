'use client';

import { useState } from 'react';

export default function MembershipForm({ memberType, feeAmount, extraFields = [] }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', stateChapter: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | error | redirecting

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      // 1. Create the member record (status: pending)
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, memberType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      // 2. Create a Razorpay order for the membership fee
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId: data.memberId, amount: feeAmount, purpose: memberType }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Payment initiation failed');

      setStatus('redirecting');

      // 3. Open Razorpay checkout (script must be loaded — see RazorpayScript component)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        name: 'United Contractors Organisation',
        description: `${memberType.replace('_', ' ')} Fee`,
        order_id: orderData.orderId,
        handler: function () {
          window.location.href = '/dashboard?payment=success';
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-xl">
      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Full Name</label>
          <input
            required name="name" value={form.name} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Email</label>
          <input
            required type="email" name="email" value={form.email} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Phone</label>
          <input
            required name="phone" value={form.phone} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">State / Regional Chapter</label>
          <input
            required name="stateChapter" value={form.stateChapter} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {extraFields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-navy mb-1">{f.label}</label>
            <input
              required={f.required} name={f.name} onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        ))}

        <div className="bg-gray-50 rounded p-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">Registration Fee</span>
          <span className="font-heading font-bold text-navy text-lg">&#8377;{feeAmount.toLocaleString('en-IN')}</span>
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'redirecting'}
          className="btn-primary disabled:opacity-60"
        >
          {status === 'submitting' ? 'Processing...' : status === 'redirecting' ? 'Opening Payment...' : 'Proceed to Payment'}
        </button>
      </div>
    </form>
  );
}
