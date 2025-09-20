import { useEffect, useRef } from 'react';
import { AppState, BackHandler } from 'react-native';

export default function useUserActions({
  handleSubmit,
}: {
  handleSubmit: (goBackAfterSave: boolean) => Promise<void>;
}) {
  //Guardo la nota si la app pasa al background.
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === 'background') {
        handleSubmit(false);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [handleSubmit]);

  //Guardo la nota si el usuario usa el gesto de retroceso.
  useEffect(() => {
    const backAction = () => {
      handleSubmit(false);
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [handleSubmit]);
}
