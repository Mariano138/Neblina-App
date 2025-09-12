import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Button } from 'react-native';
import { RootStackParamList } from '~/types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function AddButton() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  //Este boton solo me redirecciona a mi pantalla del form
  return (
    <View>
      <Button title="Add note" onPress={() => navigation.navigate('Form')} />
    </View>
  );
}
