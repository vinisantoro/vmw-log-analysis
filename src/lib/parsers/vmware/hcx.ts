import { ParsedLogLine, LogLevel } from '@/lib/types';
import { parseLogLine } from '../logParser';

const HCX_TIMESTAMP_PATTERN = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})/;
const HCX_COMPONENT_PATTERN = /\[([^\]]+)\]/;

export function parseHCXLog(line: string): ParsedLogLine {
  const base = parseLogLine(line);
  
  // HCX specific timestamp parsing
  const timestampMatch = line.match(HCX_TIMESTAMP_PATTERN);
  if (timestampMatch) {
    try {
      const dateStr = timestampMatch[1].replace(/\s+/, 'T');
      const timestamp = new Date(dateStr);
      if (!isNaN(timestamp.getTime())) {
        base.timestamp = timestamp;
      }
    } catch {
      // Keep default timestamp
    }
  }

  // HCX component extraction
  const componentMatch = line.match(HCX_COMPONENT_PATTERN);
  if (componentMatch) {
    base.component = componentMatch[1];
  }

  // HCX log level detection
  if (/ERROR|FAILED|FAILURE/i.test(line)) {
    base.level = 'error';
  } else if (/WARN/i.test(line)) {
    base.level = 'warning';
  } else if (/INFO/i.test(line)) {
    base.level = 'info';
  }

  return base;
}

