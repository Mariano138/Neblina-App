import { Container } from '~/components/Container';
import Notes from './notes/Notes';
import AddButton from '~/components/AddButton';
import Title from '~/components/AppHeader/Title';

export default function Home() {
  return (
    <>
      <Container>
        <Title />
        <Notes />
        <AddButton />
      </Container>
    </>
  );
}
