import { ParsedLogLine, NormalizedLog, VMwareSource, LogLevel } from '@/lib/types';
import { detectVMwareSource } from './vmware/detector';

export function normalizeLog(
  parsed: ParsedLogLine,
  fileId: string,
  lineNumber: number
): Omit<NormalizedLog, 'id'> {
  const source = detectVMwareSource(parsed.raw);
  const timestamp = parsed.timestamp || new Date();
  const level = parsed.level || 'info';
  const component = parsed.component || 'unknown';
  const message = parsed.message || parsed.raw;

  return {
    timestamp,
    level: level as LogLevel,
    component,
    message,
    raw: parsed.raw,
    source,
    metadata: {
      fileId,
      lineNumber,
      parsedAt: new Date(),
    },
  };
}

export function normalizeLogs(
  parsedLogs: ParsedLogLine[],
  fileId: string
): Omit<NormalizedLog, 'id'>[] {
  return parsedLogs.map((parsed, index) =>
    normalizeLog(parsed, fileId, index + 1)
  );
}

