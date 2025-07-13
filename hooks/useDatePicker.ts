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
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);

  const [tempDate, setTempDate] = useState<Date | undefined>(undefined); // Aca guardo mi fecha temporalmente para despues poder combinarla con la hora elegido y ahi recien guardarla con setDate.
  const [showDate, setShowDate] = useState<Date | null>(null); //Muestra la fecha si se elije una

  const [sendDate, setSendDate] = useState(false); //Estado para saber si enviar la fecha a la db.
  const formatedDate = FormatDate(reminder); //Formateo la fecha para mostrarla acorde a las demas.

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    //Si el usuario toca en cancelar la funcion termina y no prosigue.
    if (event.type === 'dismissed') {
      setShow(false);
      setTempDate(undefined);
      setShowDate(null);
      setSendDate(false);
      return;
    }
    setSendDate(true);

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
      setReminder(combinedDate);
      setShow(false);
      setShowDate(combinedDate);
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
    showPicker,

    handleChange,
    formatedDate,
    sendDate,
  };
}
