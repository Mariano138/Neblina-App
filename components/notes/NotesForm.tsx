import { View, TextInput, StyleSheet, Text, Pressable } from 'react-native';
import { useState } from 'react';

import ColorPicker from '../pickers/ColorPicker';
import DatePicker from '../pickers/DatePicker';

import useHandleButtons from '~/hooks/useHandleButtons';
import useNotesForm from '~/hooks/useNotesForm';

import GenerateColor from '~/utils/GenerateColor';
import { Note } from '~/types/note';
import useUserActions from '~/hooks/useUserActions';
import { FormatDate } from '~/utils/FormatDate';

//Icons
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDatePicker from '~/hooks/useDatePicker';
import ReminderDate from '../pickers/ReminderDate';
import useButtonAnimation from '~/animations/useButtonAnimation';
import Animated, { LinearTransition } from 'react-native-reanimated';

//Recibo el item desde donde llaman a notes form para completar los campos
export default function NotesForm({ item }: { item?: Note }) {
  const { title, setTitle, content, setContent, reminder, setReminder } = useNotesForm({ item });
  const datePickerProps = useDatePicker({ item, onSelect: setReminder });
  //{ reminder, mode, show, showDate, setShowDate, showPicker, handleChange, formatedDate }

  const createdDate = FormatDate(item?.createdDate ?? new Date());
  const updatedDate = FormatDate(item?.updatedDate ?? new Date());

  //Genero un color random para la nota si no selecciona uno.
  const { randomColor } = GenerateColor();
  const [color, setColor] = useState<string>(item?.color ?? randomColor); // Uso el color existente caso contrario genero uno.

  //Estas funciones llaman a las de mi hook pasandole los parametros necesarios para crear/actualizar borrar/cancelar.
  const { handleAdd, handleDelete, handleBack } = useHandleButtons(); //Logica de agrear o borrar una nota de mi hook.

  const saveButton = useButtonAnimation({
    initialColor: '#DFFFE7',
    endColor: '#bcf7caff',
  });

  const deleteButton = useButtonAnimation({
    initialColor: '#FFC4C4',
    endColor: '#fc8c8cff',
  });

  const backButton = useButtonAnimation({
    initialColor: '#ffffff00',
    endColor: '#ffffff00',
  });

  const handleSubmit = async (goBackAfterSave = true) => {
    try {
      await handleAdd(
        item?.id,
        title,
        content,
        color,
        goBackAfterSave,
        reminder?.toISOString(),
        item
      );
    } catch (error) {
      console.log('Error en el submit del form.', error);
    }
  };

  useUserActions({ handleSubmit }); //Mando la funcion para guardar notas en caso de gesto de retroceso o boton home.

  const handleCancel = async () => {
    try {
      await handleDelete(item?.id);
    } catch (error) {
      console.log('Error en el delete del form.', error);
    }
  };

  return (
    <SafeAreaView style={[{ backgroundColor: color }, styles.container]}>
      <View style={styles.navButtons}>
        <Animated.View style={[backButton.animatedButtonStyle]}>
          <Pressable
            onPressIn={backButton.onPressInButton}
            onPressOut={backButton.onPressOutButton}
            onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
        </Animated.View>
        <View style={styles.saveDeleteButtons}>
          <DatePicker item={item} datePicker={datePickerProps} />

          <Animated.View
            style={[saveButton.animatedButtonStyle, styles.saveButton, styles.shadowButton]}>
            <Pressable
              onPress={() => handleSubmit(true)}
              onPressIn={saveButton.onPressInButton}
              onPressOut={saveButton.onPressOutButton}>
              <Feather name="save" size={24} color="black" />
            </Pressable>
          </Animated.View>

          {item && (
            <Animated.View
              style={[deleteButton.animatedButtonStyle, styles.deleteButton, styles.shadowButton]}>
              <Pressable
                onPressIn={deleteButton.onPressInButton}
                onPressOut={deleteButton.onPressOutButton}
                onPress={handleCancel}>
                <Feather name="trash-2" size={24} color="black" />
              </Pressable>
            </Animated.View>
          )}
        </View>
      </View>
      <ColorPicker setColor={setColor} />
      <View style={styles.datesContainer}>
        {item && <Text style={styles.createdDate}>{createdDate}</Text>}
        {item && <Text style={styles.updatedDate}>Editado: {updatedDate}</Text>}
      </View>
      <Animated.View layout={LinearTransition}>
        <ReminderDate item={item} datePicker={datePickerProps} onSelect={setReminder} />
      </Animated.View>
      <TextInput
        style={styles.title}
        placeholder="Título"
        multiline
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <View style={styles.line}></View>
      <TextInput
        style={styles.content}
        placeholder="Nota"
        multiline
        value={content}
        onChangeText={(text) => setContent(text)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveDeleteButtons: {
    flexDirection: 'row',
    gap: 18,
  },
  saveButton: {
    backgroundColor: '#DFFFE7',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  deleteButton: {
    backgroundColor: '#FFC4C4',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  shadowButton: {
    boxShadow: `0px 4px 5px rgba(0, 0, 0, 0.25)`,
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Montserrat_700Bold',
    color: '#4F4F4F',
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 19,
    fontFamily: 'Montserrat_300Light',
    color: '#4F4F4F',
    paddingHorizontal: 0,
  },
  createdDate: {
    fontSize: 18,
    fontFamily: 'Montserrat_100Thin',
  },
  updatedDate: {
    fontSize: 15,
    fontFamily: 'Montserrat_100Thin',
  },
  line: {
    height: 1,
    backgroundColor: '#0000007e',
    marginTop: 10,
    marginBottom: 10,
  },
});
