import { Pressable, SafeAreaView, StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Note } from '~/types/note';
import useDatePicker from '~/hooks/useDatePicker';
import React from 'react';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import useButtonAnimation from '~/animations/useButtonAnimation';

type DatePickerProps = {
  item?: Note;
  datePicker: ReturnType<typeof useDatePicker>;
};

const DatePicker = ({ datePicker }: DatePickerProps) => {
  const { reminder, mode, show, showPicker, handleChange } = datePicker;
  const reminderButton = useButtonAnimation({
    initialColor: '#f8edeb',
    endColor: '#f7d8d3ff',
  });

  return (
    <Animated.View
      style={[reminderButton.animatedButtonStyle, styles.reminder, styles.shadowButton]}>
      <Pressable
        onPressIn={reminderButton.onPressInButton}
        onPressOut={reminderButton.onPressOutButton}
        onPress={showPicker}>
        <MaterialIcons name="access-alarm" size={24} color="black" />
      </Pressable>
      {show && (
        <DateTimePicker value={reminder} mode={mode} is24Hour={true} onChange={handleChange} />
      )}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  reminder: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  shadowButton: {
    boxShadow: `0px 4px 5px rgba(0, 0, 0, 0.25)`,
  },
});
export default React.memo(DatePicker);
