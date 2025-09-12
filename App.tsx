import { Navigation } from './navigation/RootNavigator';

import { ActivityIndicator, Text, View } from 'react-native';
import { Suspense, useEffect } from 'react';

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

//Creo mi DB y la integro en drizzle
const expo = SQLite.openDatabaseSync('notes.db');
const db = drizzle(expo);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  //Manejo los distintos casos de la migracion
  useEffect(() => {
    if (!success) return;
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <SQLite.SQLiteProvider
        databaseName="notes.db"
        options={{ enableChangeListener: true }}
        useSuspense>
        <Navigation />
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}
