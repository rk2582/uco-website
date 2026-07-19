import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { memberId, amount, purpose } = await req.json();

    if (!amount || !purpose) {
      return NextResponse.json({ error: 'Missing amount or purpose' }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects paise
      currency: 'INR',
      receipt: `uco_${purpose}_${Date.now()}`,
    });

    await prisma.payment.create({
      data: {
        memberId: memberId || null,
        purpose,
        amount,
        currency: 'INR',
        razorpayOrderId: order.id,
        status: 'INITIATED',
      },
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    console.error('Order creation error:', err);
    return NextResponse.json({ error: 'Could not create payment order' }, { status: 500 });
  }
}
