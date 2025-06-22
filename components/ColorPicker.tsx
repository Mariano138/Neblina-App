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
        onPress={() => handleColorPick('#e8d3ef')}
        style={{ backgroundColor: '#e8d3ef', padding: 10 }}></Pressable>
      <Pressable
        onPress={() => handleColorPick('#f0bccc')}
        style={{ backgroundColor: '#f0bccc', padding: 10 }}></Pressable>
      <Pressable
        onPress={() => handleColorPick('#ffeee2')}
        style={{ backgroundColor: '#ffeee2', padding: 10 }}></Pressable>
      <Pressable
        onPress={() => handleColorPick('#f7ffe0')}
        style={{ backgroundColor: '#f7ffe0', padding: 10 }}></Pressable>
      <Pressable
        onPress={() => handleColorPick('#cbeada')}
        style={{ backgroundColor: '#cbeada', padding: 10 }}></Pressable>
    </View>
  );
}
