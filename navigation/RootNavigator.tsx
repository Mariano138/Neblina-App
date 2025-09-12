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
    Home: HomeScreen,
    Form: Form,
    Note: NoteId,
    NotFound: NotFoundScreen,
  },
});

export const Navigation = createStaticNavigation(RootStack);
