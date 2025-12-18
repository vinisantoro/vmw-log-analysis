import { NextRequest, NextResponse } from 'next/server';
import { getLogs } from '@/lib/firebase/logs';
import { FilterOptions, LogLevel, VMwareSource } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse filter options
    const options: FilterOptions = {};
    
    const levels = searchParams.get('levels');
    if (levels) {
      options.levels = levels.split(',') as LogLevel[];
    }

    const sources = searchParams.get('sources');
    if (sources) {
      options.sources = sources.split(',') as VMwareSource[];
    }

    const components = searchParams.get('components');
    if (components) {
      options.components = components.split(',');
    }

    const startDate = searchParams.get('startDate');
    if (startDate) {
      options.startDate = new Date(startDate);
    }

    const endDate = searchParams.get('endDate');
    if (endDate) {
      options.endDate = new Date(endDate);
    }

    const search = searchParams.get('search');
    if (search) {
      options.search = search;
    }

    const pageSize = parseInt(searchParams.get('pageSize') || '50', 10);
    const lastDocId = searchParams.get('lastDocId');

    // Get logs
    const result = await getLogs(options, pageSize);

    // Apply search filter if provided (client-side filtering for now)
    let logs = result.logs;
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      logs = logs.filter(log => 
        log.message.toLowerCase().includes(searchLower) ||
        log.component.toLowerCase().includes(searchLower) ||
        log.raw.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      logs,
      hasMore: result.hasMore,
      total: logs.length,
    });
  } catch (error) {
    console.error('Get logs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

