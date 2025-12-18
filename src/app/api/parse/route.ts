import { NextRequest, NextResponse } from 'next/server';
import { parseLogFile } from '@/lib/parsers/logParser';
import { normalizeLogs } from '@/lib/parsers/normalizer';
import { VMwareSource } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, source } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Parse logs
    const parsedLogs = parseLogFile(content);
    if (parsedLogs.length === 0) {
      return NextResponse.json({
        logs: [],
        message: 'No valid logs found',
      });
    }

    // Normalize logs (using temporary fileId)
    const normalizedLogs = normalizeLogs(parsedLogs, 'temp-' + Date.now());

    // If source is provided, override detection
    if (source && ['NSX', 'HCX', 'ESXi', 'vCenter'].includes(source)) {
      normalizedLogs.forEach(log => {
        log.source = source as VMwareSource;
      });
    }

    return NextResponse.json({
      logs: normalizedLogs,
      count: normalizedLogs.length,
    });
  } catch (error) {
    console.error('Parse error:', error);
    return NextResponse.json(
      { error: 'Failed to parse logs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

