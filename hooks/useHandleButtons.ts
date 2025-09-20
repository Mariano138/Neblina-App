import { eq } from 'drizzle-orm';
import { notesTable } from '~/db/schema';
import Drizzle from '../utils/Drizzle';

import GenerateColor from '~/utils/GenerateColor';
import useNotifications from './useNotifications';
import { useNavigation } from '@react-navigation/native';
import { Note } from '~/types/note';

export default function useHandleButtons() {
  const db = Drizzle();
  const navigation = useNavigation();

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
    goBackAfterSave: boolean,
    reminderDate?: string,
    item?: Note
  ) => {
    try {
      //Si no cambia nada evito llamar a la db.
      if (item) {
        const hasChanged =
          item.title !== title ||
          item.content !== content ||
          item.color !== color ||
          item.reminderDate != reminderDate;
        if (!hasChanged) {
          if (goBackAfterSave) navigation.goBack();
          return;
        }
      }

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
      if (goBackAfterSave) navigation.goBack();

      //Si hay reminderDate la envio a mi funcion para crear el trigger de la notificacion
      if (reminderDate != null) {
        sendNotification(new Date(reminderDate), title);
      }
    } catch (error) {
      console.log('Error al agregar la nota.', error);
    }
  };
  //Esta funcion tiene las mismas caracteristicas nombradas en el comentario anterior.
  const handleDelete = async (id: number | undefined) => {
    try {
      if (id) {
        await db.delete(notesTable).where(eq(notesTable.id, id));
      }
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error al eliminar la nota.', error);
    }
  };

  //Funcion para volver atras.
  const handleBack = () => {
    navigation.goBack();
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
      }
      onReminderSelect(undefined);
      setShowDate(false);
    } catch (error) {
      console.log('Error al eliminar el recordatorio.', error);
    }
  };

  return { handleAdd, handleDelete, handleBack, deleteReminder };
}
