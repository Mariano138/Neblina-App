import { Dispatch, SetStateAction } from 'react';
import { Pressable, View } from 'react-native';

export default function ColorPicker({ setColor }: { setColor: Dispatch<SetStateAction<string>> }) {
  //Esta funcion solo pone el color en el useState la actualizacion se maneja en el componente padre
  const handleColorPick = async (color: string) => {
    setColor(color);
  };

  //Este componente contiene mis colores para que puedan ser seleccionados por el usuario
  return (
    <View>
      <Pressable
        onPress={() => handleColorPick('red')}
        style={{ backgroundColor: 'red', padding: 10 }}></Pressable>
      <Pressable
        onPress={() => handleColorPick('blue')}
        style={{ backgroundColor: 'blue', padding: 10 }}></Pressable>
    </View>
  );
}
