import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, stateChapter, memberType, companyName, tradeLicenseNumber } = body;

    if (!name || !email || !phone || !memberType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await prisma.member.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'A member with this email already exists' }, { status: 409 });
    }

    // Temporary password — member sets a real one after first successful payment/login flow
    const tempPassword = await bcrypt.hash(Math.random().toString(36).slice(-10), 10);

    const member = await prisma.member.create({
      data: {
        name,
        email,
        phone,
        password: tempPassword,
        stateChapter,
        memberType,
        companyName: companyName || null,
        tradeLicenseNumber: tradeLicenseNumber || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ memberId: member.id });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
