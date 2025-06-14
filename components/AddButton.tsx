import { View, Button } from 'react-native';
import { router } from 'expo-router';

export default function AddButton() {
  return (
    <View>
      <Button title="Add note" onPress={() => router.push('/notes/Form')} />
    </View>
  );
}
