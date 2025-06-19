import { eq } from 'drizzle-orm';
import { notesTable } from '~/db/schema';
import useDrizzle from './useDrizzle';
import { router } from 'expo-router';
import { UpdateDate } from '~/helpers/UpdateDate';

export default function useHandleButtons() {
  const db = useDrizzle();
  //Creo la fecha de actualizacion de cada nota
  const date = UpdateDate();
  const color = '#bde0fe';

  //Esta funcion maneja la logica de agregar o actualizar una nota.
  //Se maneja con un if que si recibe un id actualiza la nota caso contrario la actualiza
  //Fue hecho de esta manera para compartir botones ya que comparto el mismo form para crear o actualizar una nota.
  const handleAdd = async (id: number | undefined, title: string, content: string) => {
    try {
      if (id) {
        await db
          .update(notesTable)
          .set({ title: title, content: content, color: color, updatedDate: date })
          .where(eq(notesTable.id, id));
      } else if (title.trim() || content.trim() !== '') {
        await db.insert(notesTable).values([
          {
            title: title,
            content: content,
            color: color,
            updatedDate: date,
          },
        ]);
      }
      router.back();
    } catch (error) {
      console.log('Error al agregar la nota.', error);
    }
  };
  //Esta funcion tiene las mismas caracteristicas nombras en el comentario anterior.
  const handleDelete = async (id: number | undefined) => {
    try {
      if (id) {
        await db.delete(notesTable).where(eq(notesTable.id, id));
      }
      if (router.canGoBack()) {
        router.back();
      }
    } catch (error) {
      console.log('Error al eliminar la nota.', error);
    }
  };
  //Esta funcion recibe el id de cada nota y navega al [id] de cada nota, si no recibe un id navega a mi pantall not found.
  const handleNavigate = (id: number) => {
    if (typeof id !== 'number') {
      router.push('/+not-found');
      return;
    }
    router.push({ pathname: '/notes/[id]', params: { id } });
  };

  return { handleAdd, handleDelete, handleNavigate };
}
