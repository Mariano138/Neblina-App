import React from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import equal from 'fast-deep-equal';

import useHandleButtons from '~/hooks/useHandleButtons';
import { Note } from '~/types/note';
import Navigate from '~/utils/Navigate';
import { useLongPressStore } from '~/store/useLongPressStore';
import { formatDate } from 'date-fns';
import useButtonAnimation from '~/animations/useButtonAnimation';
import Animated from 'react-native-reanimated';
import useItemAnimation from '~/animations/useItemAnimation';

const Item = ({ item }: { item: Note }) => {
  const { handleDelete } = useHandleButtons(); //Hook para borrar la nota.
  const { handleNavigate } = Navigate(); //Util para navegar a la nota segun id.

  const handleLongPress = useLongPressStore.getState().handleLongPress; //Llamo mi funcion sin suscribirme al store.
  const isSelected = useLongPressStore((state) => state.selectedNotes.includes(item.id));
  const formattedDate = formatDate(item.updatedDate, 'dd MMM');

  const { animatedButtonStyle, onPressInButton, onPressOutButton } = useButtonAnimation({
    initialColor: '#FFC4C4',
    endColor: '#fc8c8cff',
  });

  const { animatedItemStyle, onPressInNote, onPressOutNote } = useItemAnimation();

  return (
    console.log('🔁 Renderizando', item.title),
    (
      <Animated.View style={[animatedItemStyle]}>
        <Pressable
          style={[
            {
              backgroundColor: item.color,
              borderColor: isSelected ? 'black' : 'white',
            },
            styles.container,
          ]}
          onPressIn={onPressInNote}
          onPressOut={onPressOutNote}
          onPress={() => {
            const { visible, toggleSelection } = useLongPressStore.getState(); //Lo escribo dentro de la funcion para evitar multiples renders.
            if (visible) {
              toggleSelection(item.id);
            } else {
              handleNavigate(item.id);
            }
          }}
          onLongPress={() => handleLongPress(item.id)}>
          <View style={styles.view}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={styles.content} numberOfLines={4} ellipsizeMode="tail">
              {item.content}
            </Text>

            <View style={styles.viewTrashButton}>
              <Text style={styles.date}>{formattedDate}</Text>

              <Animated.View style={[animatedButtonStyle, styles.trashButton, styles.shadowButton]}>
                <Pressable
                  onPressIn={onPressInButton}
                  onPressOut={onPressOutButton}
                  onPress={() => handleDelete(item.id)}
                  style={styles.pressableStyles}>
                  <Feather name="trash" size={24} color="#00000088" />
                </Pressable>
              </Animated.View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderWidth: 0,
    height: 258,
    width: 346,
    borderRadius: 25,
    marginBottom: 38,
    boxShadow: `
    10px 10px 3px rgba(0, 0, 0, 0.20), 
    inset 2px 2px 2px rgba(0, 0, 0, 0.15)
    `,
  },
  view: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Montserrat_700Bold',
    color: '#4F4F4F',
  },
  content: {
    fontSize: 20,
    fontFamily: 'Montserrat_300Light',
    paddingTop: 3,
    lineHeight: 29,
    color: '#4F4F4F',
  },
  viewTrashButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 17,
  },
  trashButton: {
    backgroundColor: '#FFC4C4',
    borderRadius: 25,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableStyles: {
    flex: 1,
    justifyContent: 'center',
  },
  date: {
    fontSize: 18,
    fontFamily: 'Montserrat_100Thin',
    marginBottom: 8,
  },
  shadowButton: {
    boxShadow: `0px 4px 5px rgba(0, 0, 0, 0.25)`,
  },
});

//Estoy usando react.memo y fast deep equal para comparar props y evitar multiples renders, esto es importante.
export default React.memo(Item, (prevProps, nextProps) => {
  return equal(prevProps.item, nextProps.item);
});
