import { eq } from 'drizzle-orm';
import { notesTable } from '~/db/schema';
import useDrizzle from './useDrizzle';
import { router } from 'expo-router';

export default function useHandleButtons() {
  const db = useDrizzle();
  const color = '#bde0fe';

  const handleSave = async (title: string | undefined, content: string | undefined) => {
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
  const handleDelete = async (id: number) => {
    try {
      await db.delete(notesTable).where(eq(notesTable.id, id));
      if (router.canGoBack()) {
        router.back();
      }
    } catch (error) {
      console.log('Error al eliminar la nota.', error);
    }
  };

  const handleNavigate = (id: number) => {
    router.push({ pathname: '/notes/[id]', params: { id } });
  };

  return { handleSave, handleDelete, handleNavigate };
}
