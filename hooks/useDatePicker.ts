import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Note } from '~/types/note';
import { FormatDate } from '~/utils/FormatDate';

type DatePickerProps = {
  item?: Note;
  onSelect: (date: Date) => void;
};

export default function useDatePicker({ item, onSelect }: DatePickerProps) {
  const [reminder, setReminder] = useState<Date>(new Date(item?.reminderDate ?? new Date())); //Tengo que transformar el remiderDate de la db a DATE porque datepicker solo acepta Date de value y no strings.
  const [mode, setMode] = useState<'date' | 'time'>('date'); //El mode se refiere a si esta eligiendo la fecha o la hora.
  const [show, setShow] = useState<boolean>(false); //Esto para mostrar o no el selector.

  const [tempDate, setTempDate] = useState<Date | undefined>(undefined); // Aca guardo mi fecha temporalmente para despues poder combinarla con la hora elegido y ahi recien guardarla con setDate.
  const [showDate, setShowDate] = useState<Boolean>(false); //Muestra la fecha si se elije una

  const formatedDate = FormatDate(reminder); //Formateo la fecha para mostrarla acorde a las demas.

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    //Si el usuario toca en cancelar la funcion termina y no prosigue.
    if (event.type === 'dismissed') {
      setShow(false);
      setTempDate(undefined);
      setShowDate(false);
      return;
    }

    //Guardo la fecha elegida en mi tempDate y pongo el mode en 'time' para que se ejecute mi else if y el show en true para que aparezca el Datepicker en pantalla.
    if (mode === 'date') {
      setTempDate(selectedDate);
      setMode('time');
      setShow(true);
    }
    //Luego a esa fecha guardada en temp le agrego la hora y minutos elegidos y ahi recien la guardo con setDate.
    else if (mode === 'time' && tempDate && selectedDate) {
      const combinedDate = new Date(tempDate);
      combinedDate.setHours(selectedDate.getHours());
      combinedDate.setMinutes(selectedDate.getMinutes());
      combinedDate.setSeconds(0);
      if (combinedDate.getTime() <= Date.now()) return;
      setReminder(combinedDate);
      setShow(false);
      setShowDate(true);
      setTempDate(undefined);
      onSelect(combinedDate);
    }
  };

  //Esta funcion solo se encarga de poner el show en true para que aparezca el DatePicker.
  const showPicker = () => {
    setMode('date');
    setShow(true);
  };

  return {
    reminder,
    mode,
    show,

    showDate,
    setShowDate,
    showPicker,

    handleChange,
    formatedDate,
  };
}
