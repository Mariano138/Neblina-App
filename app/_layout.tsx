import { TamaguiProvider, View } from "tamagui";
import config from "../tamagui.config";

import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Slot, Stack } from "expo-router";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";
import { NotesProvider } from "../context/NotesProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const [loaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  useEffect(() => {
    if (loaded) {
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <NotesProvider>
        <StatusBar style="auto" />
        <View f={1} bg={"#F9F9F9"}>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="writeNote"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="[id]"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </View>
      </NotesProvider>
    </TamaguiProvider>
  );
}
