"use client";

import { NormalizedLog } from '@/lib/types';
import { TimelineEvent } from '@/components/timeline/TimelineEvent';
import { useState } from 'react';

interface ComponentDrilldownProps {
  component: string;
  logs: NormalizedLog[];
  onLogClick?: (log: NormalizedLog) => void;
}

export function ComponentDrilldown({ component, logs, onLogClick }: ComponentDrilldownProps) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredLogs = selectedLevel
    ? logs.filter(log => log.level === selectedLevel)
    : logs;

  const levels = Array.from(new Set(logs.map(log => log.level)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Componente: {component}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedLevel(null)}
            className={`px-3 py-1 text-sm rounded ${
              selectedLevel === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-accent'
            }`}
          >
            Todos ({logs.length})
          </button>
          {levels.map(level => {
            const count = logs.filter(l => l.level === level).length;
            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1 text-sm rounded ${
                  selectedLevel === level
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-accent'
                }`}
              >
                {level} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        {filteredLogs.map(log => (
          <TimelineEvent
            key={log.id}
            log={log}
            onClick={onLogClick}
          />
        ))}
      </div>
    </div>
  );
}

