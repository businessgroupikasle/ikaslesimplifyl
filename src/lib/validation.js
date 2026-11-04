/**
 * Validation utilities for consultation and enquiry forms.
 */

// RFC-compliant email regex ensuring a valid domain and alphabetical TLD of at least 2 letters
export const EMAIL_REGEX =
  /^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/**
 * Validates a full name input.
 * Rejects empty, numeric-only, or invalid character inputs.
 */
export function validateFullName(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, message: 'Full Name is required.' };
  }

  // Check if numeric-only (e.g. "5555", "12345", "000 000")
  if (/^\d+$/.test(trimmed.replace(/\s+/g, ''))) {
    return { isValid: false, message: 'Full Name cannot be numeric only. Please enter a valid name.' };
  }

  // Reject names containing digits (e.g. "5555abc", "John123")
  if (/\d/.test(trimmed)) {
    return { isValid: false, message: 'Full Name cannot contain numbers. Please enter a valid name.' };
  }

  if (trimmed.length < 2) {
    return { isValid: false, message: 'Full Name must be at least 2 characters.' };
  }

  // Ensure it contains letters/combining marks and only allowed punctuation (spaces, dots, hyphens, apostrophes)
  if (!/^[\p{L}\p{M}\s.'’-]+$/u.test(trimmed)) {
    return { isValid: false, message: 'Full Name can only contain letters, spaces, hyphens, and dots.' };
  }

  return { isValid: true, message: '' };
}

/**
 * Validates an email address.
 * Rejects empty or invalidly formatted addresses (e.g. invalid/numeric TLD like .com68889).
 */
export function validateEmail(email) {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, message: 'Email address is required.' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid email address (e.g. name@example.com).' };
  }

  return { isValid: true, message: '' };
}

/**
 * Validates a phone number.
 * Requires exactly 10 digits starting with 6, 7, 8, or 9.
 */
export function validatePhone(phone) {
  const trimmed = (phone || '').trim();
  const digits = trimmed.replace(/\D/g, '');

  if (!digits) {
    return { isValid: false, message: 'Phone number is required.' };
  }

  if (digits.length !== 10) {
    return { isValid: false, message: 'Phone number must be exactly 10 digits.' };
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    return { isValid: false, message: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.' };
  }

  return { isValid: true, message: '' };
}
