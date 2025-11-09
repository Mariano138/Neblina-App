import { Dispatch, SetStateAction } from 'react';
import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import useDatePicker from '~/hooks/useDatePicker';
import useHandleButtons from '~/hooks/useHandleButtons';
import { Note } from '~/types/note';

import Entypo from '@expo/vector-icons/Entypo';

type DatePickerProps = {
  item?: Note;
  datePicker: ReturnType<typeof useDatePicker>;
  onSelect: Dispatch<SetStateAction<Date | undefined>>;
};

export default function ReminderDate({ datePicker, item, onSelect }: DatePickerProps) {
  const { formatedDate, setShowDate, showDate } = datePicker;
  const { deleteReminder } = useHandleButtons();
  return (
    <View style={styles.container}>
      {(item?.reminderDate != null || showDate !== false) && (
        <>
          <Text style={styles.title}>Recordatorio: {formatedDate}</Text>
          <Pressable
            style={styles.deleteButton}
            onPress={() => deleteReminder(item?.id, onSelect, setShowDate)}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Montserrat_100Thin',
  },
  deleteButton: {
    backgroundColor: '#FFC4C4',
    marginLeft: 10,
    borderRadius: 100,
  },
});
