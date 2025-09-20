import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { RootStackParamList } from '~/types/navigation';

import HomeScreen from '~/screens/HomeScreen';
import Form from '~/screens/Form';
import NoteId from '~/screens/[id]';
import NotFoundScreen from '~/screens/+not-found';

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    Form: { screen: Form, options: { headerShown: false } },
    Note: { screen: NoteId, options: { headerShown: false } },
    NotFound: { screen: NotFoundScreen, options: { headerShown: false } },
  },
});

export const Navigation = createStaticNavigation(RootStack);
