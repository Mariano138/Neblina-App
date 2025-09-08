import { Button, SafeAreaView, Text } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Note } from '~/types/note';
import useDatePicker from '~/hooks/useDatePicker';
import React from 'react';
import useHandleButtons from '~/hooks/useHandleButtons';

type DatePickerProps = {
  item?: Note;
  onReminderSelect: (date: Date | undefined) => void;
};

const DatePicker = ({ item, onReminderSelect }: DatePickerProps) => {
  const { reminder, mode, show, showDate, setShowDate, showPicker, handleChange, formatedDate } =
    useDatePicker({
      item,
      onSelect: onReminderSelect,
    });
  const { deleteReminder } = useHandleButtons();

  return (
    <SafeAreaView>
      <Button onPress={showPicker} title="Show date picker!" />
      {(item?.reminderDate != null || showDate !== false) && (
        <>
          <Text>Fecha elegida: {formatedDate}</Text>
          <Button
            title="Delete reminder"
            onPress={() => deleteReminder(item?.id, onReminderSelect, setShowDate)}
          />
        </>
      )}
      {show && (
        <DateTimePicker value={reminder} mode={mode} is24Hour={true} onChange={handleChange} />
      )}
    </SafeAreaView>
  );
};
export default React.memo(DatePicker);
