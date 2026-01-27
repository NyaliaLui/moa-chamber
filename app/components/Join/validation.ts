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
  return String(value)
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"`;(){}]/g, ''); // Remove potentially dangerous characters
}

export function validateRequired(value: string, fieldName: string): void {
  if (!value || value.trim() === '') {
    throw new ValidationError(`Invalid input data: ${fieldName} is required`);
  }
}

export function validateEmail(value: string): void {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new ValidationError('Invalid input data: email format is invalid');
  }
}

export function validatePhone(value: string): void {
  if (value && !/^[\d\s\-+().]*$/.test(value)) {
    throw new ValidationError('Invalid input data: phone format is invalid');
  }
}

export function validateNumeric(value: string, fieldName: string): void {
  if (value && !/^\d+$/.test(value)) {
    throw new ValidationError(
      `Invalid input data: ${fieldName} must be a number`,
    );
  }
}
