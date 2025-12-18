"use client";

import { useState, useEffect, useCallback } from 'react';
import { NormalizedLog, FilterOptions } from '@/lib/types';

interface UseLogsResult {
  logs: NormalizedLog[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function useLogs(options: FilterOptions = {}): UseLogsResult {
  const [logs, setLogs] = useState<NormalizedLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDocId, setLastDocId] = useState<string | null>(null);

  const fetchLogs = useCallback(async (append: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (options.levels && options.levels.length > 0) {
        params.append('levels', options.levels.join(','));
      }
      
      if (options.sources && options.sources.length > 0) {
        params.append('sources', options.sources.join(','));
      }
      
      if (options.components && options.components.length > 0) {
        params.append('components', options.components.join(','));
      }
      
      if (options.startDate) {
        params.append('startDate', options.startDate.toISOString());
      }
      
      if (options.endDate) {
        params.append('endDate', options.endDate.toISOString());
      }
      
      if (options.search) {
        params.append('search', options.search);
      }

      if (lastDocId && append) {
        params.append('lastDocId', lastDocId);
      }

      params.append('pageSize', '50');

      const response = await fetch(`/api/logs?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch logs');
      }

      if (append) {
        setLogs(prev => [...prev, ...data.logs]);
      } else {
        setLogs(data.logs);
      }

      setHasMore(data.hasMore);
      if (data.logs.length > 0) {
        setLastDocId(data.logs[data.logs.length - 1].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  }, [options, lastDocId]);

  useEffect(() => {
    setLogs([]);
    setLastDocId(null);
    setHasMore(true);
    fetchLogs(false);
  }, [
    options.levels?.join(','),
    options.sources?.join(','),
    options.components?.join(','),
    options.startDate?.toISOString(),
    options.endDate?.toISOString(),
    options.search,
  ]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchLogs(true);
    }
  }, [loading, hasMore, fetchLogs]);

  const refresh = useCallback(() => {
    setLogs([]);
    setLastDocId(null);
    setHasMore(true);
    fetchLogs(false);
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}

