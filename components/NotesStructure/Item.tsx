import React from 'react';
import { Text, Button, Pressable } from 'react-native';
import equal from 'fast-deep-equal';
import useHandleButtons from '~/hooks/useHandleButtons';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
}

const Item = ({ item }: { item: note }) => {
  const { handleDelete, handleNavigate } = useHandleButtons();

  return (
    console.log('🔁 Renderizando', item.title),
    (
      <Pressable onPress={() => handleNavigate(item.id)}>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
        <Button title="delete" onPress={() => handleDelete(item.id)} />
      </Pressable>
    )
  );
};

export default React.memo(Item, (prevProps, nextProps) => {
  return equal(prevProps.item, nextProps.item);
});
