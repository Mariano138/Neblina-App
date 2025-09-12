import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Navigate() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  //Esta funcion recibe el id de cada nota y navega al [id] de cada nota, si no recibe un id navega a mi pantall not found.
  const handleNavigate = (id: number) => {
    if (typeof id !== 'number') {
      navigation.navigate('NotFound');
      return;
    }

    navigation.navigate('Note', {
      noteId: id,
    });
  };
  return { handleNavigate };
}
