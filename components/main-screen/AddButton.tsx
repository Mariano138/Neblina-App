import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { RootStackParamList } from '~/types/navigation';
import Octicons from '@expo/vector-icons/Octicons';
import useButtonAnimation from '~/animations/useButtonAnimation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function AddButton() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { animatedButtonStyle, onPressInButton, onPressOutButton } = useButtonAnimation({
    initialColor: '#E4F0FF',
    endColor: '#b3c4d8ff',
  });

  //Este boton solo me redirecciona a mi pantalla del form
  return (
    <Animated.View style={[animatedButtonStyle, styles.container]}>
      <Pressable
        onPressIn={onPressInButton}
        onPressOut={onPressOutButton}
        onPress={() => navigation.navigate('Form')}
        style={styles.pressableStyles}>
        <Octicons name="pencil" size={24} color="black" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 54,
    height: 54,
    borderColor: '#00000002',
    borderWidth: 1,
    borderRadius: 100,

    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 25,
    marginRight: 30,

    boxShadow: `0px 4px 5px rgba(0, 0, 0, 0.25), inset 0px 4px 5px rgba(0, 0, 0, 0.25)`,
  },

  pressableStyles: {
    flex: 1,
    justifyContent: 'center',
  },
});
