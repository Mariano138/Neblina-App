import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import useColorAnimation from '~/animations/useColorAnimation';

interface props {
  color: string;
  isSelected: boolean;
  onPress: (color: string) => void;
}

export default function ColorOption({ color, isSelected, onPress }: props) {
  const { animatedColorStyle } = useColorAnimation(isSelected);

  return (
    <TouchableOpacity onPress={() => onPress(color)}>
      <Animated.View
        style={[
          animatedColorStyle,
          styles.colors,
          { borderColor: isSelected ? '#ffffffcc' : '#0000004f', backgroundColor: color },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  colors: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
    boxShadow: `0px 0px 5px rgba(0, 0, 0, 0.25), inset 0px 0px 5px rgba(0, 0, 0, 0.25)`,
  },
});
