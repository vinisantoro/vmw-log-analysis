import { parseLogLine, parseLogFile } from '@/lib/parsers/logParser';

describe('logParser', () => {
  describe('parseLogLine', () => {
    it('should parse a simple log line', () => {
      const line = '2024-01-01T10:00:00.000Z [Component] INFO: Test message';
      const result = parseLogLine(line);
      
      expect(result.message).toContain('Test message');
      expect(result.component).toBe('Component');
      expect(result.level).toBe('info');
    });

    it('should handle lines without timestamp', () => {
      const line = '[Component] ERROR: Something went wrong';
      const result = parseLogLine(line);
      
      expect(result.message).toContain('Something went wrong');
      expect(result.component).toBe('Component');
      expect(result.level).toBe('error');
    });

    it('should handle empty lines', () => {
      const line = '';
      const result = parseLogLine(line);
      
      expect(result.message).toBe('');
      expect(result.raw).toBe('');
    });

    it('should sanitize control characters', () => {
      const line = 'Test\x00message\x01with\x02control\x03chars';
      const result = parseLogLine(line);
      
      expect(result.message).not.toContain('\x00');
      expect(result.message).not.toContain('\x01');
    });
  });

  describe('parseLogFile', () => {
    it('should parse multiple log lines', () => {
      const content = `2024-01-01T10:00:00.000Z [Component1] INFO: Message 1
2024-01-01T10:01:00.000Z [Component2] ERROR: Message 2
2024-01-01T10:02:00.000Z [Component3] WARN: Message 3`;
      
      const results = parseLogFile(content);
      
      expect(results).toHaveLength(3);
      expect(results[0].message).toContain('Message 1');
      expect(results[1].level).toBe('error');
      expect(results[2].level).toBe('warning');
    });

    it('should filter out empty lines', () => {
      const content = `Line 1

Line 3

`;
      
      const results = parseLogFile(content);
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => r.message || r.raw.trim())).toBe(true);
    });
  });
});

