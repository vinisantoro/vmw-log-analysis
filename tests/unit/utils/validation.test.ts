import { validateFile, sanitizeString } from '@/lib/utils/validation';

describe('validation', () => {
  describe('validateFile', () => {
    it('should validate a valid file', () => {
      const file = new File(['content'], 'test.log', { type: 'text/plain' });
      Object.defineProperty(file, 'size', { value: 1024 });

      const result = validateFile(file);

      expect(result.valid).toBe(true);
    });

    it('should reject file that is too large', () => {
      const file = new File(['content'], 'test.log', { type: 'text/plain' });
      Object.defineProperty(file, 'size', { value: 20 * 1024 * 1024 }); // 20MB

      const result = validateFile(file);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('exceeds maximum');
    });

    it('should reject invalid file type', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      Object.defineProperty(file, 'size', { value: 1024 });

      const result = validateFile(file);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('not allowed');
    });
  });

  describe('sanitizeString', () => {
    it('should remove control characters', () => {
      const input = 'Test\x00message\x01with\x02control\x03chars';
      const result = sanitizeString(input);

      expect(result).not.toContain('\x00');
      expect(result).not.toContain('\x01');
      expect(result).toContain('Test');
      expect(result).toContain('message');
    });

    it('should preserve newlines and tabs', () => {
      const input = 'Line 1\nLine 2\tTabbed';
      const result = sanitizeString(input);

      expect(result).toContain('\n');
      expect(result).toContain('\t');
    });
  });
});

