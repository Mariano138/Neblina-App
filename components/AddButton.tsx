import { View, Button } from 'react-native';
import { router } from 'expo-router';

export default function AddButton() {
  //Este boton solo me redirecciona a mi pantalla del form
  return (
    <View>
      <Button title="Add note" onPress={() => router.push('/notes/Form')} />
    </View>
  );
}
