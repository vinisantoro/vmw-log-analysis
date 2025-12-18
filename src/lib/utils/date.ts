import { format, parseISO, isValid } from 'date-fns';

export function formatTimestamp(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  return format(dateObj, 'yyyy-MM-dd HH:mm:ss');
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  return format(dateObj, 'yyyy-MM-dd');
}

export function parseLogTimestamp(timestampStr: string): Date | null {
  // Common VMware log timestamp formats
  const formats = [
    /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/, // ISO format
    /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/, // Standard format
    /(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})/, // US format
  ];

  for (const format of formats) {
    const match = timestampStr.match(format);
    if (match) {
      try {
        const parsed = parseISO(match[1].replace(/\//g, '-'));
        if (isValid(parsed)) {
          return parsed;
        }
      } catch {
        continue;
      }
    }
  }

  return null;
}

