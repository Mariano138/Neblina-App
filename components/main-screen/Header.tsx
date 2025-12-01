import { View, StyleSheet } from 'react-native';
import { useLongPressStore } from '~/store/useLongPressStore';
import OptionsBar from './OptionsBar';
import Title from './Title';
import { useEffect } from 'react';
import useHeaderAnimations from '~/animations/useHeaderAnimations';
import Animated, { withTiming } from 'react-native-reanimated';

export default function Header() {
  const visible = useLongPressStore((state) => state.visible);
  const { progress, titleStyle, toolbarStyle } = useHeaderAnimations();

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, { duration: 250 });
  }, [visible]);

  return (
    <View style={styles.container}>
      {visible ? (
        <Animated.View style={toolbarStyle}>
          <OptionsBar />
        </Animated.View>
      ) : (
        <Animated.View style={titleStyle}>
          <Title />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 10, paddingBottom: 25, paddingHorizontal: 30 },
});
