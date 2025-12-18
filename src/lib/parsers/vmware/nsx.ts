import { ParsedLogLine, LogLevel } from '@/lib/types';
import { parseLogLine } from '../logParser';

const NSX_TIMESTAMP_PATTERN = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?)/;
const NSX_COMPONENT_PATTERN = /\[([^\]]+)\]/g;

export function parseNSXLog(line: string): ParsedLogLine {
  const base = parseLogLine(line);
  
  // NSX specific timestamp parsing
  const timestampMatch = line.match(NSX_TIMESTAMP_PATTERN);
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

  // NSX component extraction
  const componentMatches = Array.from(line.matchAll(NSX_COMPONENT_PATTERN));
  if (componentMatches.length > 0) {
    // Usually the last component is the most specific
    base.component = componentMatches[componentMatches.length - 1][1];
  }

  // NSX log level detection
  if (/ERROR|CRITICAL|FATAL/i.test(line)) {
    base.level = 'error';
  } else if (/WARN/i.test(line)) {
    base.level = 'warning';
  } else if (/DEBUG|TRACE/i.test(line)) {
    base.level = 'debug';
  }

  return base;
}

