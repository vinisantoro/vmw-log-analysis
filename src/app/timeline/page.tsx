"use client";

import { Suspense } from 'react';
import { TimelineView } from '@/components/timeline/TimelineView';
import { FilterBar } from '@/components/filters/FilterBar';
import { useLogs } from '@/hooks/useLogs';
import { useFilters } from '@/hooks/useFilters';
import { Loader2 } from 'lucide-react';

function TimelineContent() {
  const { filters, updateFilters, clearFilters } = useFilters();
  const { logs, loading, error, hasMore, loadMore } = useLogs(filters);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Erro: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Timeline de Logs</h1>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterBar
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Timeline */}
          <div className="lg:col-span-3">
            <TimelineView
              logs={logs}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <TimelineContent />
    </Suspense>
  );
}

