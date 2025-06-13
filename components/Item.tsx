import React from 'react';
import { View, Text } from 'react-native';
import equal from 'fast-deep-equal';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
}

const Item = ({ item }: { item: note }) => {
  return (
    console.log('🔁 Renderizando', item.title),
    (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
      </View>
    )
  );
};

export default React.memo(Item, (prevProps, nextProps) => {
  return equal(prevProps.item, nextProps.item);
});
