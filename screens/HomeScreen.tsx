import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddButton from '~/components/main-screen/AddButton';
import Header from '~/components/main-screen/Header';
import NotesList from '~/components/notes/NotesList';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <NotesList />
      <AddButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
