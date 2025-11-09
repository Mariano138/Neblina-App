import { View } from 'react-native';

import NotesForm from '../NotesForm';

import { Note } from '~/types/note';

export default function ItemId({ item }: { item: Note }) {
  return <NotesForm item={item} />;
}
