import { View, Text, StyleSheet } from 'react-native';
import { useLongPressStore } from '~/store/useLongPressStore';
import OptionsBar from './OptionsBar';
import Title from './Title';

export default function Header() {
  const visible = useLongPressStore((state) => state.visible);

  return <View style={styles.container}>{visible ? <OptionsBar /> : <Title />}</View>;
}

const styles = StyleSheet.create({
  container: { paddingTop: 10, paddingBottom: 25, paddingHorizontal: 30 },
});
