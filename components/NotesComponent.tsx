import { View, Text } from "tamagui";
import React from "react";
import { FlatList } from "react-native";

type note = {
  title: string;
  note: string;
  id: number;
};

type Props = {
  notes: note[];
};

const NotesComponent = ({ notes }: Props) => {
  const renderItem = ({ item }: { item: note }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.note}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default NotesComponent;
