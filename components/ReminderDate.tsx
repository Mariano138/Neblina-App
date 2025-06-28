import { Dispatch, SetStateAction, useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FormatDate } from '~/helpers/FormatDate';

type ReminderDateProps = {
  reminder: Date;
  setReminder: Dispatch<SetStateAction<Date>>;
};

export default function ReminderDate({ reminder, setReminder }: ReminderDateProps) {
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined); // Aca guardo mi fecha temporalmente para despues poder combinarla con la hora elegido y ahi recien guardarla con setDate.
  const formatedDate = FormatDate(reminder); //Formateo la fecha para mostrarla acorde a las demas.

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    //Si el usuario toca en cancelar la funcion termina y no prosigue.
    if (event.type === 'dismissed') {
      setShow(false);
      setTempDate(undefined);
      return;
    }
    //Guardo la fecha elegida en mi tempDate y pongo el mode en 'time' para que se ejecute mi else if y el show en true para que aparezca el Datepicker en pontalla.
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
      setTempDate(undefined);
    }
  };

  //Esta funcion solo se encarga de poner el show en true para que aparezca el DatePicker.
  const showPicker = () => {
    setMode('date');
    setShow(true);
  };

  return (
    <SafeAreaView>
      <Button onPress={showPicker} title="Show date picker!" />
      <Text>Fecha elegida: {formatedDate}</Text>
      {show && (
        <DateTimePicker value={reminder} mode={mode} is24Hour={true} onChange={handleChange} />
      )}
    </SafeAreaView>
  );
}
