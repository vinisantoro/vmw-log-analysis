import { ParsedLogLine, LogLevel } from '@/lib/types';
import { parseLogTimestamp } from '@/lib/utils/date';
import { sanitizeString } from '@/lib/utils/validation';

const LOG_LEVEL_PATTERNS: Record<LogLevel, RegExp> = {
  error: /error|err|exception|failed|failure/i,
  warning: /warning|warn/i,
  warn: /warning|warn/i,
  info: /info|information/i,
  debug: /debug|trace/i,
};

export function parseLogLine(line: string): ParsedLogLine {
  const sanitized = sanitizeString(line.trim());
  
  if (!sanitized) {
    return {
      message: '',
      raw: line,
    };
  }

  // Try to extract timestamp
  const timestamp = parseLogTimestamp(sanitized);

  // Try to extract log level
  let level: LogLevel | undefined;
  for (const [logLevel, pattern] of Object.entries(LOG_LEVEL_PATTERNS)) {
    if (pattern.test(sanitized)) {
      level = logLevel as LogLevel;
      break;
    }
  }

  // Extract component (common patterns)
  const componentMatch = sanitized.match(/\[([^\]]+)\]/);
  const component = componentMatch ? componentMatch[1] : undefined;

  // Extract message (everything after timestamp and component)
  let message = sanitized;
  if (timestamp) {
    const timestampStr = timestamp.toISOString();
    message = message.replace(timestampStr, '').trim();
  }
  if (component) {
    message = message.replace(`[${component}]`, '').trim();
  }

  return {
    timestamp: timestamp || undefined,
    level: level || 'info',
    component,
    message: message || sanitized,
    raw: line,
  };
}

export function parseLogFile(content: string): ParsedLogLine[] {
  const lines = content.split(/\r?\n/);
  return lines
    .map(line => parseLogLine(line))
    .filter(log => log.message || log.raw.trim());
}

