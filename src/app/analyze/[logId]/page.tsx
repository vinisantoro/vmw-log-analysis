"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NormalizedLog } from '@/lib/types';
import { formatTimestamp } from '@/lib/utils/date';
import { ArrowLeft, AlertCircle, Info, AlertTriangle, XCircle, Bug } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

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

export default function AnalyzePage() {
  const params = useParams();
  const router = useRouter();
  const logId = Array.isArray(params.logId) ? params.logId[0] : params.logId;
  const [log, setLog] = useState<NormalizedLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLog() {
      try {
        const response = await fetch(`/api/logs/${logId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch log');
        }

        if (data.log) {
          setLog(data.log);
        } else {
          setError('Log não encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch log');
      } finally {
        setLoading(false);
      }
    }

    if (logId) {
      fetchLog();
    }
  }, [logId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !log) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">{error || 'Log não encontrado'}</p>
          </div>
          <Link
            href="/timeline"
            className="mt-4 inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Timeline
          </Link>
        </div>
      </div>
    );
  }

  const Icon = levelIcons[log.level] || AlertCircle;
  const colorClass = levelColors[log.level] || levelColors.info;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/timeline"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Timeline
        </Link>

        <div className="border rounded-lg p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Icon className={cn('w-6 h-6', colorClass)} />
              <div>
                <h1 className="text-2xl font-bold">Análise de Log</h1>
                <p className="text-sm text-muted-foreground">
                  {formatTimestamp(log.timestamp)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className="text-xs px-2 py-1 rounded bg-accent">
                {log.source}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-accent">
                {log.component}
              </span>
            </div>
          </div>

          {/* Level Badge */}
          <div>
            <span className={cn(
              'inline-block px-3 py-1 rounded-full text-sm font-medium',
              log.level === 'error' && 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
              log.level === 'warning' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
              log.level === 'warn' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
              log.level === 'info' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
              log.level === 'debug' && 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            )}>
              {log.level.toUpperCase()}
            </span>
          </div>

          {/* Message */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Mensagem</h2>
            <p className="text-sm bg-muted p-4 rounded border font-mono">
              {log.message}
            </p>
          </div>

          {/* Raw Log */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Log Original</h2>
            <pre className="text-xs bg-muted p-4 rounded border overflow-x-auto">
              {log.raw}
            </pre>
          </div>

          {/* Metadata */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Metadados</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Arquivo ID:</span>
                <p className="font-mono">{log.metadata.fileId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Linha:</span>
                <p>{log.metadata.lineNumber}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Processado em:</span>
                <p>{formatTimestamp(log.metadata.parsedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

