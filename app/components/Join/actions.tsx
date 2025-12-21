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
  const employees = formData.get('employees') as string;
  const referral = formData.get('referral') as string;
  const donation = formData.get('donation') as string;

  // Calculate monthly dues based on employee count
  const employeeCount = parseInt(employees, 10);
  let monthlyDues = '$30';
  if (employeeCount >= 6) {
    monthlyDues = '$90';
  } else if (employeeCount >= 2) {
    monthlyDues = '$60';
  }

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
Number of Employees: ${employees}
Monthly Dues: ${monthlyDues}
Referred By: ${referral || 'Not provided'}
Activity Fund Donation: ${donation ? `$${donation}` : 'None'}
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
