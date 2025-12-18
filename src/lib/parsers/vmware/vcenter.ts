import { ParsedLogLine, LogLevel } from '@/lib/types';
import { parseLogLine } from '../logParser';

const VCENTER_TIMESTAMP_PATTERN = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/;
const VCENTER_COMPONENT_PATTERN = /\[([^\]]+)\]/g;

export function parseVCenterLog(line: string): ParsedLogLine {
  const base = parseLogLine(line);
  
  // vCenter specific timestamp parsing
  const timestampMatch = line.match(VCENTER_TIMESTAMP_PATTERN);
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

  // vCenter component extraction (often has multiple brackets)
  const componentMatches = Array.from(line.matchAll(VCENTER_COMPONENT_PATTERN));
  if (componentMatches.length > 0) {
    // Usually the first or second component is the module
    base.component = componentMatches[0][1];
  }

  // vCenter log level detection
  if (/ERROR|FATAL|SEVERE/i.test(line)) {
    base.level = 'error';
  } else if (/WARN/i.test(line)) {
    base.level = 'warning';
  } else if (/INFO/i.test(line)) {
    base.level = 'info';
  } else if (/DEBUG|FINE|FINER|FINEST/i.test(line)) {
    base.level = 'debug';
  }

  return base;
}

