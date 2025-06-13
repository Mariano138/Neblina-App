import { drizzle } from 'drizzle-orm/expo-sqlite';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { notesTable } from '~/db/schema';

export default function Form() {
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb);

  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const color = '#bde0fe';

  const handleAdd = async () => {
    try {
      await db.insert(notesTable).values([
        {
          title: title,
          content: content,
          color: color,
        },
      ]);
      router.back();
    } catch (error) {
      console.log('Error al agregar la nota.', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="title" value={title} onChangeText={(text) => setTitle(text)} />
      <TextInput placeholder="content" value={content} onChangeText={(text) => setContent(text)} />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}
