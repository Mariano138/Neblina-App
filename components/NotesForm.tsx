import { View, TextInput, Button } from 'react-native';
import useNotesInput from '~/hooks/useNotesInput';
import useHandleButtons from '~/hooks/useHandleButtons';

export default function NotesForm() {
  const { title, setTitle, content, setContent } = useNotesInput();
  const { handleSave } = useHandleButtons();

  return (
    <View>
      <TextInput placeholder="title" value={title} onChangeText={(text) => setTitle(text)} />
      <TextInput placeholder="content" value={content} onChangeText={(text) => setContent(text)} />
      <Button title="Save" onPress={() => handleSave(title, content)} />
    </View>
  );
}
