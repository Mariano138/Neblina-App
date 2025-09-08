import { eq } from 'drizzle-orm';
import { notesTable } from '~/db/schema';
import Drizzle from '../utils/Drizzle';

import { router } from 'expo-router';

import GenerateColor from '~/utils/GenerateColor';
import useNotifications from './useNotifications';

export default function useHandleButtons() {
  const db = Drizzle();

  const { handleColorChange } = GenerateColor();
  const sendNotification = useNotifications();

  //Esta funcion maneja la logica de agregar o actualizar una nota.
  //Se maneja con un if que si recibe un id actualiza la nota caso contrario la actualiza
  //Fue hecho de esta manera para compartir botones ya que comparto el mismo form para crear o actualizar una nota.
  const handleAdd = async (
    id: number | undefined,
    title: string,
    content: string,
    color: string,
    reminderDate?: string
  ) => {
    try {
      if (id) {
        await db
          .update(notesTable)
          .set({
            title: title,
            content: content,
            color: color,
            updatedDate: new Date().toString(),
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
            reminderDate: reminderDate,
          },
        ]);
      }
      router.back();

      //Si hay reminderDate la envio a mi funcion para crear el trigger de la notificacion
      if (reminderDate != null) {
        sendNotification(new Date(reminderDate), title);
      }
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
  //Funcion para borrar la fecha.
  const deleteReminder = async (
    id: number | undefined,
    onReminderSelect: (date: Date | undefined) => void,
    setShowDate: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    try {
      if (id) {
        await db.update(notesTable).set({ reminderDate: null }).where(eq(notesTable.id, id));
        onReminderSelect(undefined);
        setShowDate(false);
      }
    } catch (error) {
      console.log('Error al eliminar el recordatorio.', error);
    }
  };

  return { handleAdd, handleDelete, deleteReminder };
}
