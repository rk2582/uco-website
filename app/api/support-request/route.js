import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const { email, description, type } = await req.json();

    if (!email || !description || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const member = await prisma.member.findUnique({ where: { email } });
    if (!member) {
      return NextResponse.json({ error: 'No member found with this email. Please register first.' }, { status: 404 });
    }

    await prisma.supportRequest.create({
      data: { memberId: member.id, description, type },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Support request error:', err);
    return NextResponse.json({ error: 'Could not submit request' }, { status: 500 });
  }
}
