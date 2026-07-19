'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- NEC Members ---
export async function addNECMember(formData) {
  await prisma.nECMember.create({
    data: {
      name: formData.get('name'),
      designation: formData.get('designation'),
      photoUrl: formData.get('photoUrl') || null,
      bio: formData.get('bio') || null,
    },
  });
  revalidatePath('/admin/nec');
  revalidatePath('/nec');
}

export async function deleteNECMember(id) {
  await prisma.nECMember.delete({ where: { id } });
  revalidatePath('/admin/nec');
  revalidatePath('/nec');
}

// --- State Chapters ---
export async function addChapter(formData) {
  await prisma.stateChapter.create({
    data: {
      name: formData.get('name'),
      region: formData.get('region') || null,
      chairpersonName: formData.get('chairpersonName') || null,
      contactInfo: formData.get('contactInfo') || null,
    },
  });
  revalidatePath('/admin/chapters');
  revalidatePath('/chapters');
}

export async function deleteChapter(id) {
  await prisma.stateChapter.delete({ where: { id } });
  revalidatePath('/admin/chapters');
  revalidatePath('/chapters');
}

// --- Posts (News / Notifications / Training / Conference) ---
export async function addPost(formData) {
  await prisma.post.create({
    data: {
      title: formData.get('title'),
      body: formData.get('body'),
      category: formData.get('category'),
      attachmentUrl: formData.get('attachmentUrl') || null,
      isMemberOnly: formData.get('isMemberOnly') === 'on',
    },
  });
  revalidatePath('/admin/posts');
  revalidatePath('/news');
  revalidatePath('/notifications');
  revalidatePath('/training');
  revalidatePath('/conference');
}

export async function deletePost(id) {
  await prisma.post.delete({ where: { id } });
  revalidatePath('/admin/posts');
  revalidatePath('/news');
  revalidatePath('/notifications');
  revalidatePath('/training');
  revalidatePath('/conference');
}

// --- Downloads ---
export async function addDownload(formData) {
  await prisma.download.create({
    data: {
      title: formData.get('title'),
      fileUrl: formData.get('fileUrl'),
      category: formData.get('category') || null,
      isMemberOnly: formData.get('isMemberOnly') === 'on',
    },
  });
  revalidatePath('/admin/downloads');
  revalidatePath('/downloads');
}

export async function deleteDownload(id) {
  await prisma.download.delete({ where: { id } });
  revalidatePath('/admin/downloads');
  revalidatePath('/downloads');
}

// --- Gallery ---
export async function addGalleryImage(formData) {
  await prisma.galleryImage.create({
    data: {
      imageUrl: formData.get('imageUrl'),
      caption: formData.get('caption') || null,
      eventName: formData.get('eventName') || null,
    },
  });
  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
}

export async function deleteGalleryImage(id) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
}

// --- Support Requests ---
export async function updateSupportRequestStatus(id, status) {
  await prisma.supportRequest.update({ where: { id }, data: { status } });
  revalidatePath('/admin/support-requests');
}

// --- Members ---
export async function updateMemberStatus(id, status) {
  await prisma.member.update({ where: { id }, data: { status } });
  revalidatePath('/admin/members');
}
