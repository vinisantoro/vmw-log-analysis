export type LogLevel = 'info' | 'warning' | 'error' | 'warn' | 'debug';

export type VMwareSource = 'NSX' | 'HCX' | 'ESXi' | 'vCenter' | 'unknown';

export interface LogMetadata {
  fileId: string;
  lineNumber: number;
  parsedAt: Date;
}

export interface NormalizedLog {
  id: string;
  timestamp: Date;
  level: LogLevel;
  component: string;
  message: string;
  raw: string;
  source: VMwareSource;
  metadata: LogMetadata;
}

export interface Component {
  id: string;
  name: string;
  type: string;
  logs: string[]; // log IDs
  createdAt: Date;
}

export interface LogFile {
  id: string;
  filename: string;
  size: number;
  uploadedAt: Date;
  processedAt?: Date;
  logsCount: number;
  source?: VMwareSource;
}

export interface FilterOptions {
  levels?: LogLevel[];
  components?: string[];
  sources?: VMwareSource[];
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  logs: NormalizedLog[];
  component?: string;
}

export interface ParsedLogLine {
  timestamp?: Date;
  level?: LogLevel;
  component?: string;
  message: string;
  raw: string;
}

