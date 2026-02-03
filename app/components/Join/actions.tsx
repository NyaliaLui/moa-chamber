'use server';

import { Resend } from 'resend';
import { DEFAULT_TARGET_EMAIL } from '@app/constants';
import {
  sanitizeString,
  validateRequired,
  validateEmail,
  validatePhone,
  validateNumeric,
} from './validation';

export async function submitMembershipForm(formData: FormData): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Sanitize all form inputs
  const businessName = sanitizeString(formData.get('business'));
  const contactName = sanitizeString(formData.get('contact'));
  const contactRole = sanitizeString(formData.get('contactrole'));
  const address = sanitizeString(formData.get('address'));
  const phone = sanitizeString(formData.get('phone'));
  const email = sanitizeString(formData.get('email'));
  const website = sanitizeString(formData.get('website'));
  const employees = sanitizeString(formData.get('employees'));
  const referral = sanitizeString(formData.get('referral'));
  const donation = sanitizeString(formData.get('donation'));

  // Validate required fields
  validateRequired(businessName, 'business name');
  validateRequired(contactName, 'contact name');
  validateRequired(contactRole, 'contact role');
  validateRequired(address, 'address');
  validateRequired(employees, 'number of employees');

  // Validate field formats
  validateEmail(email);
  validatePhone(phone);
  validateNumeric(employees, 'number of employees');
  if (donation) {
    validateNumeric(donation, 'donation amount');
  }

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
