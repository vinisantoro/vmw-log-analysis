"use client";

import { NormalizedLog } from '@/lib/types';
import { formatTimestamp } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';
import { AlertCircle, Info, AlertTriangle, XCircle, Bug } from 'lucide-react';
import Link from 'next/link';

interface TimelineEventProps {
  log: NormalizedLog;
  onClick?: (log: NormalizedLog) => void;
}

const levelIcons = {
  error: XCircle,
  warning: AlertTriangle,
  warn: AlertTriangle,
  info: Info,
  debug: Bug,
};

const levelColors = {
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  warn: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
  debug: 'text-gray-600 dark:text-gray-400',
};

const levelBgColors = {
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  warn: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  debug: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800',
};

export function TimelineEvent({ log, onClick }: TimelineEventProps) {
  const Icon = levelIcons[log.level] || AlertCircle;
  const colorClass = levelColors[log.level] || levelColors.info;
  const bgClass = levelBgColors[log.level] || levelBgColors.info;

  const handleClick = () => {
    onClick?.(log);
  };

  return (
    <Link
      href={`/analyze/${log.id}`}
      onClick={handleClick}
      className={cn(
        'block p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer',
        bgClass
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', colorClass)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              {formatTimestamp(log.timestamp)}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-0.5 rounded bg-background/50">
                {log.source}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-background/50">
                {log.component}
              </span>
            </div>
          </div>
          <p className="text-sm font-medium mb-1 line-clamp-2">
            {log.message}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {log.raw.substring(0, 100)}...
          </p>
        </div>
      </div>
    </Link>
  );
}

