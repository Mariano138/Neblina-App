import { StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  //Este componente solo se muestra si no se puede acceder a la ruta deseada
  return (
    <>
      <Text style={styles.title}>{"This screen doesn't exist."}</Text>
      <Text style={styles.linkText}>Go to home screen!</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
