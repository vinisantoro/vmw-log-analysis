"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FilterOptions, LogLevel, VMwareSource } from '@/lib/types';

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterOptions>({});

  // Initialize filters from URL
  useEffect(() => {
    const newFilters: FilterOptions = {};

    const levels = searchParams.get('levels');
    if (levels) {
      newFilters.levels = levels.split(',') as LogLevel[];
    }

    const sources = searchParams.get('sources');
    if (sources) {
      newFilters.sources = sources.split(',') as VMwareSource[];
    }

    const components = searchParams.get('components');
    if (components) {
      newFilters.components = components.split(',');
    }

    const startDate = searchParams.get('startDate');
    if (startDate) {
      newFilters.startDate = new Date(startDate);
    }

    const endDate = searchParams.get('endDate');
    if (endDate) {
      newFilters.endDate = new Date(endDate);
    }

    const search = searchParams.get('search');
    if (search) {
      newFilters.search = search;
    }

    setFilters(newFilters);
  }, [searchParams]);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    // Update URL
    const params = new URLSearchParams();
    
    if (updated.levels && updated.levels.length > 0) {
      params.set('levels', updated.levels.join(','));
    }
    
    if (updated.sources && updated.sources.length > 0) {
      params.set('sources', updated.sources.join(','));
    }
    
    if (updated.components && updated.components.length > 0) {
      params.set('components', updated.components.join(','));
    }
    
    if (updated.startDate) {
      params.set('startDate', updated.startDate.toISOString());
    }
    
    if (updated.endDate) {
      params.set('endDate', updated.endDate.toISOString());
    }
    
    if (updated.search) {
      params.set('search', updated.search);
    }

    router.push(`?${params.toString()}`);
  }, [filters, router]);

  const clearFilters = useCallback(() => {
    setFilters({});
    router.push('');
  }, [router]);

  return {
    filters,
    updateFilters,
    clearFilters,
  };
}

