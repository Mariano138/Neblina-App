import React, { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import GenerateColor from '~/utils/GenerateColor';
import ColorOption from './ColorOption';

const ColorPicker = ({ setColor }: { setColor: Dispatch<SetStateAction<string>> }) => {
  const { pastelColors } = GenerateColor();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  //Esta funcion solo pone el color en el useState la actualizacion se maneja en el componente padre
  const handlePick = (color: string) => {
    setColor(color);
    setSelectedColor(color);
  };

  //Este componente contiene mis colores para que puedan ser seleccionados por el usuario
  return (
    <View style={styles.container}>
      {pastelColors.map((color) => (
        <ColorOption
          key={color}
          color={color}
          isSelected={selectedColor === color}
          onPress={() => handlePick(color)}
        />
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
});
export default React.memo(ColorPicker);
