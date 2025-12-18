import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestoreDB } from '@/lib/firebase/config';
import { NormalizedLog } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ logId: string }> }
) {
  try {
    const { logId } = await params;

    if (!logId) {
      return NextResponse.json(
        { error: 'Log ID is required' },
        { status: 400 }
      );
    }

    const db = getFirestoreDB();
    const logDoc = await getDoc(doc(db, 'logs', logId));

    if (!logDoc.exists()) {
      return NextResponse.json(
        { error: 'Log not found' },
        { status: 404 }
      );
    }

    const data = logDoc.data();
    const log: NormalizedLog = {
      id: logDoc.id,
      timestamp: data.timestamp.toDate(),
      level: data.level,
      component: data.component,
      message: data.message,
      raw: data.raw,
      source: data.source,
      metadata: {
        ...data.metadata,
        parsedAt: data.metadata.parsedAt.toDate(),
      },
    };

    return NextResponse.json({ log });
  } catch (error) {
    console.error('Get log error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch log', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

