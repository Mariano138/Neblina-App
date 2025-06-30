import Notes from './notes/Notes';
import AddButton from '~/components/main-screen/AddButton';
import Title from '~/components/main-screen/Title';

export default function Home() {
  return (
    <>
      <Title />
      <Notes />
      <AddButton />
    </>
  );
}
