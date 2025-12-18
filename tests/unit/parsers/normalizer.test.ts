import { normalizeLog, normalizeLogs } from '@/lib/parsers/normalizer';
import { ParsedLogLine } from '@/lib/types';

describe('normalizer', () => {
  const mockParsedLog: ParsedLogLine = {
    timestamp: new Date('2024-01-01T10:00:00.000Z'),
    level: 'error',
    component: 'TestComponent',
    message: 'Test message',
    raw: '2024-01-01T10:00:00.000Z [TestComponent] ERROR: Test message',
  };

  it('should normalize a single log', () => {
    const result = normalizeLog(mockParsedLog, 'file-123', 1);

    expect(result.timestamp).toEqual(mockParsedLog.timestamp);
    expect(result.level).toBe('error');
    expect(result.component).toBe('TestComponent');
    expect(result.message).toBe('Test message');
    expect(result.metadata.fileId).toBe('file-123');
    expect(result.metadata.lineNumber).toBe(1);
  });

  it('should normalize multiple logs', () => {
    const parsedLogs: ParsedLogLine[] = [
      mockParsedLog,
      { ...mockParsedLog, level: 'warning', message: 'Warning message' },
    ];

    const results = normalizeLogs(parsedLogs, 'file-123');

    expect(results).toHaveLength(2);
    expect(results[0].level).toBe('error');
    expect(results[1].level).toBe('warning');
    expect(results[0].metadata.lineNumber).toBe(1);
    expect(results[1].metadata.lineNumber).toBe(2);
  });
});

