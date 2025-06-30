import { notesTable } from '~/db/schema';
import Drizzle from './Drizzle';
import { eq } from 'drizzle-orm';

export default function GenerateColor() {
  const db = Drizzle();

  //Hook que elije un color random para la nota si el usuario no selecciona uno.
  const pastelColors = ['#e8d3ef', '#f0bccc', '#ffeee2', '#f7ffe0', '#cbeada'];

  //Selecciono un color random de mi array.
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

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

  return { randomColor, pastelColors, handleColorChange };
}
