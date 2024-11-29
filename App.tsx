import { TamaguiProvider, View } from "tamagui";

import config from "./tamagui.config";
import HomeScreen from "./components/HomeScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <View f={1} bg={"#F9F9F9"}>
        <HomeScreen />
      </View>
    </TamaguiProvider>
  );
}
