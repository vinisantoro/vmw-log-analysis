import { ParsedLogLine, LogLevel } from '@/lib/types';
import { parseLogLine } from '../logParser';

const ESXI_TIMESTAMP_PATTERN = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/;
const ESXI_COMPONENT_PATTERN = /\[([^\]]+)\]/;

export function parseESXiLog(line: string): ParsedLogLine {
  const base = parseLogLine(line);
  
  // ESXi specific timestamp parsing
  const timestampMatch = line.match(ESXI_TIMESTAMP_PATTERN);
  if (timestampMatch) {
    try {
      const timestamp = new Date(timestampMatch[1]);
      if (!isNaN(timestamp.getTime())) {
        base.timestamp = timestamp;
      }
    } catch {
      // Keep default timestamp
    }
  }

  // ESXi component extraction (usually hostname or module name)
  const componentMatch = line.match(ESXI_COMPONENT_PATTERN);
  if (componentMatch) {
    base.component = componentMatch[1];
  } else {
    // ESXi often has hostname at the beginning
    const hostnameMatch = line.match(/^([\w\-\.]+)\s+/);
    if (hostnameMatch) {
      base.component = hostnameMatch[1];
    }
  }

  // ESXi log level detection
  if (/error|err/i.test(line)) {
    base.level = 'error';
  } else if (/warn/i.test(line)) {
    base.level = 'warning';
  } else if (/info/i.test(line)) {
    base.level = 'info';
  }

  return base;
}

