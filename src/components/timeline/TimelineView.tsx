"use client";

import { NormalizedLog } from '@/lib/types';
import { TimelineEvent } from './TimelineEvent';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface TimelineViewProps {
  logs: NormalizedLog[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onLogClick?: (log: NormalizedLog) => void;
}

export function TimelineView({ 
  logs, 
  loading, 
  hasMore, 
  onLoadMore, 
  onLogClick 
}: TimelineViewProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  if (loading && logs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum log encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <TimelineEvent
          key={log.id}
          log={log}
          onClick={onLogClick}
        />
      ))}
      
      {hasMore && (
        <div ref={loadMoreRef} className="flex items-center justify-center py-4">
          {loading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
        </div>
      )}
    </div>
  );
}

