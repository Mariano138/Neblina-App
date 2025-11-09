import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import GenerateColor from '~/utils/GenerateColor';

const ColorPicker = ({ setColor }: { setColor: Dispatch<SetStateAction<string>> }) => {
  //Es.ta funcion solo pone el color en el useState la actualizacion se maneja en el componente padre
  const handleColorPick = async (color: string) => {
    setColor(color);
  };

  const { pastelColors } = GenerateColor();

  //Este componente contiene mis colores para que puedan ser seleccionados por el usuario
  return (
    <View style={styles.container}>
      {pastelColors.map((color) => (
        <Pressable
          key={color}
          onPress={() => handleColorPick(color)}
          style={[{ backgroundColor: color }, styles.colors]}></Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  colors: {
    padding: 10,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#00000034',
    borderRadius: 100,
    boxShadow: `0px 0px 5px rgba(0, 0, 0, 0.25), inset 0px 0px 5px rgba(0, 0, 0, 0.25)`,
  },
});
export default React.memo(ColorPicker);
