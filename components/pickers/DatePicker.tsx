import { Button, SafeAreaView, Text } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Note } from '~/types/note';
import useDatePicker from '~/hooks/useDatePicker';

type DatePickerProps = {
  item?: Note;
  onReminderSelect: (date: Date) => void;
};

export default function DatePicker({ item, onReminderSelect }: DatePickerProps) {
  const { reminder, mode, show, showDate, showPicker, handleChange, formatedDate } = useDatePicker({
    item,
    onSelect: onReminderSelect,
  });

  return (
    <SafeAreaView>
      <Button onPress={showPicker} title="Show date picker!" />
      {(item?.reminderDate != null || showDate !== null) && (
        <Text>Fecha elegida: {formatedDate}</Text>
      )}
      {show && (
        <DateTimePicker value={reminder} mode={mode} is24Hour={true} onChange={handleChange} />
      )}
    </SafeAreaView>
  );
}
