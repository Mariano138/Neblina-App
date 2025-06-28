import { eq } from 'drizzle-orm';
import { notesTable } from '~/db/schema';
import useDrizzle from './useDrizzle';
import { router } from 'expo-router';
import { FormatDate } from '~/helpers/FormatDate';

export default function useHandleButtons() {
  const db = useDrizzle();
  //Creo la fecha de actualizacion de cada nota
  const date = new Date();
  const updatedDate = FormatDate(date);

  //Esta funcion maneja la logica de agregar o actualizar una nota.
  //Se maneja con un if que si recibe un id actualiza la nota caso contrario la actualiza
  //Fue hecho de esta manera para compartir botones ya que comparto el mismo form para crear o actualizar una nota.
  const handleAdd = async (
    id: number | undefined,
    title: string,
    content: string,
    color: string,
    reminderDate: string
  ) => {
    try {
      if (id) {
        await db
          .update(notesTable)
          .set({
            title: title,
            content: content,
            color: color,
            updatedDate: updatedDate,
            reminderDate: reminderDate,
          })
          .where(eq(notesTable.id, id));
        //Actualizo el color
        handleColorChange(id, color);
      } else if (title.trim() || content.trim() !== '') {
        await db.insert(notesTable).values([
          {
            title: title,
            content: content,
            color: color,
            updatedDate: updatedDate,
            reminderDate: reminderDate,
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

  //Esta funcion se encarga de actualizar el color de la nota segun elija el usuario
  const handleColorChange = async (id: number | undefined, color: string) => {
    try {
      if (id) {
        await db.update(notesTable).set({ color: color }).where(eq(notesTable.id, id));
      }
    } catch (error) {
      console.log('Error al actualizar el color.', error);
    }
  };

  return { handleAdd, handleDelete, handleNavigate, handleColorChange };
}
