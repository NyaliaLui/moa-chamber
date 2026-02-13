import { sanitize } from 'isomorphic-dompurify';

export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

export function sanitizeString(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  return sanitize(String(value));
}

export function validateRequired(value: string, fieldName: string): void {
  if (!value || value.trim() === '') {
    throw new ValidationError(`${fieldName} is required`);
  }
}

export function validateEmail(value: string): void {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new ValidationError('email format is invalid');
  }
}

export function validatePhone(value: string): void {
  if (value && !/^[\d\s\-+().]*$/.test(value)) {
    throw new ValidationError('phone format is invalid');
  }
}

export function validateNumeric(value: string, fieldName: string): void {
  if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
    throw new ValidationError(
      `${fieldName} must be an integer or dollar amount`,
    );
  }
}
