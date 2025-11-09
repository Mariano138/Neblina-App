import { Navigation } from './navigation/RootNavigator';

import { ActivityIndicator, Text, View } from 'react-native';
import { Suspense, useEffect } from 'react';

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

//Fonts
import {
  Montserrat_100Thin,
  Montserrat_300Light,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/montserrat';

//Creo mi DB y la integro en drizzle
const expo = SQLite.openDatabaseSync('notes.db');
const db = drizzle(expo);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
  });

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

  if (!fontsLoaded) {
    return null;
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
