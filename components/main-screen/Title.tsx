import { View, Text, StyleSheet } from 'react-native';

export default function Title() {
  return (
    <View>
      <Text style={styles.title}>Neblina</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: '#000000be',
    fontFamily: 'Montserrat_700Bold_Italic',
    textShadowColor: 'rgba(0, 0, 0, 0.20)',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 5,
  },
});
