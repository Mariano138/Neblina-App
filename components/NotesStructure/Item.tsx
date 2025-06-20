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
  //Llamo a la logica de los botones desde mi hook
  const { handleDelete, handleNavigate } = useHandleButtons();
  return (
    console.log('🔁 Renderizando', item.title),
    (
      <Pressable style={{ backgroundColor: item.color }} onPress={() => handleNavigate(item.id)}>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
        <Button title="delete" onPress={() => handleDelete(item.id)} />
      </Pressable>
    )
  );
};

//Estoy usando react.memo y fast deep equal para comparar props y evitar multiples renders, esto es importante.
export default React.memo(Item, (prevProps, nextProps) => {
  return equal(prevProps.item, nextProps.item);
});
