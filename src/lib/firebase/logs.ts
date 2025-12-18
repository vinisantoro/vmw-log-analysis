import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  startAfter,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { getFirestoreDB, COLLECTIONS } from './config';
import { NormalizedLog, FilterOptions, LogFile } from '@/lib/types';

export async function saveLog(log: Omit<NormalizedLog, 'id'>): Promise<string> {
  const db = getFirestoreDB();
  const docRef = await addDoc(collection(db, COLLECTIONS.LOGS), {
    ...log,
    timestamp: Timestamp.fromDate(log.timestamp),
    metadata: {
      ...log.metadata,
      parsedAt: Timestamp.fromDate(log.metadata.parsedAt),
    },
  });
  return docRef.id;
}

export async function saveLogs(logs: Omit<NormalizedLog, 'id'>[]): Promise<string[]> {
  const db = getFirestoreDB();
  const batch = logs.map(log => {
    const docRef = collection(db, COLLECTIONS.LOGS);
    return addDoc(docRef, {
      ...log,
      timestamp: Timestamp.fromDate(log.timestamp),
      metadata: {
        ...log.metadata,
        parsedAt: Timestamp.fromDate(log.metadata.parsedAt),
      },
    });
  });
  const results = await Promise.all(batch);
  return results.map(r => r.id);
}

export async function getLogs(
  options: FilterOptions = {},
  pageSize: number = 50,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ logs: NormalizedLog[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; hasMore: boolean }> {
  const db = getFirestoreDB();
  let q = query(collection(db, COLLECTIONS.LOGS));

  // Apply filters
  if (options.levels && options.levels.length > 0) {
    q = query(q, where('level', 'in', options.levels));
  }

  if (options.sources && options.sources.length > 0) {
    q = query(q, where('source', 'in', options.sources));
  }

  if (options.components && options.components.length > 0) {
    q = query(q, where('component', 'in', options.components));
  }

  if (options.startDate) {
    q = query(q, where('timestamp', '>=', Timestamp.fromDate(options.startDate)));
  }

  if (options.endDate) {
    q = query(q, where('timestamp', '<=', Timestamp.fromDate(options.endDate)));
  }

  // Order by timestamp
  q = query(q, orderBy('timestamp', 'desc'));

  // Pagination
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }
  q = query(q, firestoreLimit(pageSize + 1));

  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const hasMore = docs.length > pageSize;
  const logsToReturn = hasMore ? docs.slice(0, pageSize) : docs;

  const logs: NormalizedLog[] = logsToReturn.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
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
  });

  return {
    logs,
    lastDoc: hasMore ? docs[pageSize - 1] : null,
    hasMore,
  };
}

export async function saveLogFile(file: Omit<LogFile, 'id'>): Promise<string> {
  const db = getFirestoreDB();
  const docRef = await addDoc(collection(db, COLLECTIONS.FILES), {
    ...file,
    uploadedAt: Timestamp.fromDate(file.uploadedAt),
    processedAt: file.processedAt ? Timestamp.fromDate(file.processedAt) : null,
  });
  return docRef.id;
}

