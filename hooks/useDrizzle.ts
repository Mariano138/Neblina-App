import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

export default function useDrizzle() {
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb);

  return db;
}
