import React from 'react';
import { Text, Button, Pressable } from 'react-native';

import equal from 'fast-deep-equal';

import useHandleButtons from '~/hooks/useHandleButtons';
import { Note } from '~/types/note';
import Navigate from '~/utils/Navigate';

const Item = ({ item }: { item: Note }) => {
  const { handleDelete } = useHandleButtons(); //Hook para borrar la nota.
  const { handleNavigate } = Navigate(); //Util para navegar a la nota segun id.

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
