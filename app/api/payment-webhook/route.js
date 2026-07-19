import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

// Razorpay calls this URL directly whenever a payment event happens.
// Configure this URL in your Razorpay Dashboard > Settings > Webhooks:
//   https://yourdomain.com/api/payment-webhook
// Set the same secret there as RAZORPAY_WEBHOOK_SECRET in your .env

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-razorpay-signature');

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;

    const record = await prisma.payment.updateMany({
      where: { razorpayOrderId: payment.order_id },
      data: {
        razorpayPaymentId: payment.id,
        status: 'SUCCESS',
      },
    });

    // Activate the related member, if this payment was for a membership fee
    const paymentRow = await prisma.payment.findFirst({
      where: { razorpayOrderId: payment.order_id },
    });

    if (paymentRow?.memberId && paymentRow.purpose.startsWith('MEMBERSHIP')) {
      await prisma.member.update({
        where: { id: paymentRow.memberId },
        data: { status: 'ACTIVE' },
      });
    }
  }

  if (event.event === 'payment.failed') {
    const payment = event.payload.payment.entity;
    await prisma.payment.updateMany({
      where: { razorpayOrderId: payment.order_id },
      data: { status: 'FAILED' },
    });
  }

  return NextResponse.json({ received: true });
}
