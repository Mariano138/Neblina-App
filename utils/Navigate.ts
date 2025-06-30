import { router } from 'expo-router';

export default function Navigate() {
  //Esta funcion recibe el id de cada nota y navega al [id] de cada nota, si no recibe un id navega a mi pantall not found.
  const handleNavigate = (id: number) => {
    if (typeof id !== 'number') {
      router.push('/+not-found');
      return;
    }
    router.push({ pathname: '/notes/[id]', params: { id } });
  };
  return { handleNavigate };
}
