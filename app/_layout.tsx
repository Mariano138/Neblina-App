import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { ActivityIndicator, Text, View } from 'react-native';
import { Suspense, useEffect } from 'react';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

//Creo mi DB y la integro en drizzle
const expo = SQLite.openDatabaseSync('notes.db');
const db = drizzle(expo);

export default function Layout() {
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
  //Uso suspense para esperar a que la db este lista antes de usarse
  //Enable change listener para que poder usar livequery y actualizar los datos en tiempo real
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <SQLite.SQLiteProvider
        databaseName="notes.db"
        options={{ enableChangeListener: true }}
        useSuspense>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="notes/Form" />
        </Stack>
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}
