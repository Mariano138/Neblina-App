import { router } from 'expo-router';
import { Button } from 'react-native';
import { Container } from '~/components/Container';
import Notes from './notes/Notes';

export default function Home() {
  return (
    <>
      <Container>
        <Notes />
        <Button title="Add note" onPress={() => router.push('/notes/Form')} />
      </Container>
    </>
  );
}
