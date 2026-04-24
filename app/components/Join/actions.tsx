'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { DEFAULT_TARGET_EMAIL } from '@app/constants';
import { formSubmissionLimiter, getClientIp } from '@app/rate-limit';
import {
  sanitizeString,
  validateRequired,
  validateEmail,
  validatePhone,
  validateWebsite,
  validateNumeric,
  ValidationError,
} from '@app/components/Join/validation';

class TooManyRequests extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'TooManyRequests';
    this.status = 429;
  }
}

export async function submitMembershipForm(formData: FormData): Promise<void> {
  console.log('[join] submitMembershipForm invoked');

  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    try {
      await formSubmissionLimiter.consume(ip);
    } catch (error) {
      console.warn('[join] rate limit exceeded for IP:', ip, error);
      throw new TooManyRequests(
        'Too many submissions. Please try again later.',
      );
    }
    console.log('[join] rate limit passed');

    if (!process.env.RESEND_API_KEY) {
      console.warn('[join] RESEND_API_KEY is not set');
    }
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
    console.log('[join] inputs sanitized');

    // Validate required fields
    validateRequired(businessName, 'business name');
    validateRequired(contactName, 'contact name');
    validateRequired(contactRole, 'contact role');
    validateRequired(address, 'address');
    validateRequired(employees, 'number of employees');

    // Validate field formats
    validateEmail(email);
    validatePhone(phone);
    validateWebsite(website);
    validateNumeric(employees, 'number of employees');
    if (donation) {
      validateNumeric(donation, 'donation amount');
    }
    console.log('[join] validation passed');

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

    const recipient = process.env.RESEND_TARGET_EMAIL || DEFAULT_TARGET_EMAIL;
    console.log(`[join] sending email to ${recipient}`);

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipient,
      subject: `New Membership Application - ${businessName}`,
      text: emailBody,
    });

    if (error) {
      console.error('[join] email send failed:', JSON.stringify(error));
    } else {
      console.log('[join] email sent successfully');
    }
  } catch (error) {
    if (error instanceof TooManyRequests || error instanceof ValidationError) {
      throw error;
    }
    console.error(
      '[join] unexpected error:',
      error instanceof Error ? error.stack : error,
    );
    throw error;
  }
}
