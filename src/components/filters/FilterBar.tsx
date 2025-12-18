"use client";

import { FilterOptions, LogLevel, VMwareSource } from '@/lib/types';
import { X, Search, Calendar } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onClearFilters: () => void;
}

const LOG_LEVELS: LogLevel[] = ['error', 'warning', 'warn', 'info', 'debug'];
const SOURCES: VMwareSource[] = ['NSX', 'HCX', 'ESXi', 'vCenter'];

export function FilterBar({ filters, onFiltersChange, onClearFilters }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const toggleLevel = (level: LogLevel) => {
    const currentLevels = filters.levels || [];
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter(l => l !== level)
      : [...currentLevels, level];
    onFiltersChange({ levels: newLevels.length > 0 ? newLevels : undefined });
  };

  const toggleSource = (source: VMwareSource) => {
    const currentSources = filters.sources || [];
    const newSources = currentSources.includes(source)
      ? currentSources.filter(s => s !== source)
      : [...currentSources, source];
    onFiltersChange({ sources: newSources.length > 0 ? newSources : undefined });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onFiltersChange({ search: value || undefined });
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const date = value ? new Date(value) : undefined;
    onFiltersChange({
      [type === 'start' ? 'startDate' : 'endDate']: date,
    });
  };

  const hasActiveFilters = 
    (filters.levels && filters.levels.length > 0) ||
    (filters.sources && filters.sources.length > 0) ||
    filters.search ||
    filters.startDate ||
    filters.endDate;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar em logs..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Data Inicial
          </label>
          <input
            type="date"
            value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Data Final
          </label>
          <input
            type="date"
            value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Level Filters */}
      <div>
        <label className="block text-sm font-medium mb-2">Nível de Log</label>
        <div className="flex flex-wrap gap-2">
          {LOG_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => toggleLevel(level)}
              className={cn(
                'px-3 py-1 text-sm rounded-full border transition-colors',
                filters.levels?.includes(level)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-accent'
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Source Filters */}
      <div>
        <label className="block text-sm font-medium mb-2">Fonte VMware</label>
        <div className="flex flex-wrap gap-2">
          {SOURCES.map((source) => (
            <button
              key={source}
              onClick={() => toggleSource(source)}
              className={cn(
                'px-3 py-1 text-sm rounded-full border transition-colors',
                filters.sources?.includes(source)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-accent'
              )}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full px-4 py-2 text-sm border rounded-md hover:bg-accent transition-colors flex items-center justify-center space-x-2"
        >
          <X className="w-4 h-4" />
          <span>Limpar Filtros</span>
        </button>
      )}
    </div>
  );
}

