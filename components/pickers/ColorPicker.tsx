import { Dispatch, SetStateAction } from 'react';
import { Pressable, View } from 'react-native';

import GenerateColor from '~/utils/GenerateColor';

export default function ColorPicker({ setColor }: { setColor: Dispatch<SetStateAction<string>> }) {
  //Esta funcion solo pone el color en el useState la actualizacion se maneja en el componente padre
  const handleColorPick = async (color: string) => {
    setColor(color);
  };

  const { pastelColors } = GenerateColor();

  //Este componente contiene mis colores para que puedan ser seleccionados por el usuario
  return (
    <View>
      {pastelColors.map((color) => (
        <Pressable
          key={color}
          onPress={() => handleColorPick(color)}
          style={{ backgroundColor: color, padding: 10 }}></Pressable>
      ))}
    </View>
  );
}
