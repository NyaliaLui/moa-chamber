'use server';

import { Resend } from 'resend';
import { DEFAULT_TARGET_EMAIL } from '@app/constants';

export async function submitMembershipForm(formData: FormData): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const businessName = formData.get('business') as string;
  const contactName = formData.get('contact') as string;
  const contactRole = formData.get('contactrole') as string;
  const address = formData.get('address') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const website = formData.get('website') as string;

  // Construct email body
  const emailBody = `
New Chamber Membership Application

Business Name: ${businessName}
Contact Name: ${contactName}
Contact's Role: ${contactRole}
Business Address: ${address}
Phone Number: ${phone || 'Not provided'}
Email: ${email || 'Not provided'}
Website: ${website || 'Not provided'}
  `.trim();

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.RESEND_TARGET_EMAIL || DEFAULT_TARGET_EMAIL,
    subject: `New Membership Application - ${businessName}`,
    text: emailBody,
  });

  if (error) {
    console.error('Failed to send email:', error);
  }
}
