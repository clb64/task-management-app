import { formatDate, validateEmail } from '../index';

describe('Utility functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date(2023, 11, 1); // Month is 0-indexed, so 11 = December
      const formatted = formatDate(date);
      expect(formatted).toBe('12/1/2023');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });
});