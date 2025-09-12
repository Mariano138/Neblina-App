import AddButton from '~/components/main-screen/AddButton';
import Title from '~/components/main-screen/Title';
import NotesList from '~/components/notes/NotesList';

export default function HomeScreen() {
  return (
    <>
      <Title />
      <NotesList />
      <AddButton />
    </>
  );
}
