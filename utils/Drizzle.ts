import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

export default function Drizzle() {
  //Este hook hace que mi db use drizzle y se pueda acceder a ella en cada archivo que lo requiera.
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb);

  return db;
}
