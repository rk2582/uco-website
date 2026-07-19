'use client';

import { useState } from 'react';

export default function SupportRequestForm({ type, label }) {
  const [form, setForm] = useState({ email: '', description: '' });
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/support-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ email: '', description: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
        Your {label.toLowerCase()} request has been submitted. Our team will get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-xl">
      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Registered Member Email
          </label>
          <input
            required type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Describe Your {label} Requirement
          </label>
          <textarea
            required rows={5} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        {status === 'error' && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
        )}
        <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:opacity-60">
          {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
}
