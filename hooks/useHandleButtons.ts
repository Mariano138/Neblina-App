import { eq, inArray } from 'drizzle-orm';
import { notesTable } from '~/db/schema';
import Drizzle from '../utils/Drizzle';

import GenerateColor from '~/utils/GenerateColor';
import useNotifications from './useNotifications';
import { useNavigation } from '@react-navigation/native';
import { Note } from '~/types/note';
import { useLongPressStore } from '~/store/useLongPressStore';

export default function useHandleButtons() {
  const db = Drizzle();
  const navigation = useNavigation();

  const { handleColorChange } = GenerateColor();
  const sendNotification = useNotifications();
  const handleClose = useLongPressStore((state) => state.handleClose);

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
      if (goBackAfterSave) {
        (navigation.goBack(), handleClose());
      }

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
        (navigation.goBack(), handleClose());
      }
    } catch (error) {
      console.log('Error al eliminar la nota.', error);
    }
  };

  //Funcion para volver atras.
  const handleBack = () => {
    navigation.goBack();

    handleClose();
  };

  //Borrar multiples notas seleccionadas.
  const handleMultipleDelete = async (id: number[]) => {
    try {
      if (id) {
        await db.delete(notesTable).where(inArray(notesTable.id, id));
        handleClose();
      }
    } catch (error) {
      console.log('Error al eliminar multiples Notas.', error);
    }
  };

  //Funcion para borrar la fecha de recordatorio.
  const deleteReminder = async (
    id: number | undefined,
    onSelect: (date: Date | undefined) => void,
    setShowDate: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    try {
      if (id) {
        await db.update(notesTable).set({ reminderDate: null }).where(eq(notesTable.id, id));
      }
      onSelect(undefined);
      setShowDate(false);
    } catch (error) {
      console.log('Error al eliminar el recordatorio.', error);
    }
  };

  //Funcion para fijar o desfijar una nota.

  const handlePin = async (ids: number[], pinned: boolean) => {
    try {
      await db.update(notesTable).set({ pinned }).where(inArray(notesTable.id, ids));
      handleClose();
    } catch (error) {
      console.log('Error al fijar la nota.', error);
    }
  };

  return {
    handleAdd,
    handleDelete,
    handleBack,
    deleteReminder,
    handleMultipleDelete,
    handlePin,
  };
}
