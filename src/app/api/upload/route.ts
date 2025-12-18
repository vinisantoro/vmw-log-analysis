import { NextRequest, NextResponse } from 'next/server';
import { parseLogFile } from '@/lib/parsers/logParser';
import { normalizeLogs } from '@/lib/parsers/normalizer';
import { saveLogs, saveLogFile } from '@/lib/firebase/logs';
import { validateFile } from '@/lib/utils/validation';
import { detectVMwareSource } from '@/lib/parsers/vmware/detector';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Read file content
    const content = await file.text();
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'File is empty' },
        { status: 400 }
      );
    }

    // Detect source from filename or content
    const source = detectVMwareSource(file.name + ' ' + content.substring(0, 1000));

    // Parse logs
    const parsedLogs = parseLogFile(content);
    if (parsedLogs.length === 0) {
      return NextResponse.json(
        { error: 'No valid logs found in file' },
        { status: 400 }
      );
    }

    // Save file metadata
    const fileId = await saveLogFile({
      filename: file.name,
      size: file.size,
      uploadedAt: new Date(),
      processedAt: new Date(),
      logsCount: parsedLogs.length,
      source,
    });

    // Normalize and save logs
    const normalizedLogs = normalizeLogs(parsedLogs, fileId);
    const logIds = await saveLogs(normalizedLogs);

    return NextResponse.json({
      success: true,
      fileId,
      logsCount: logIds.length,
      source,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Security: Only allow POST
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

