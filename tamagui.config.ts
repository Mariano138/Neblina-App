import { createTamagui, createFont } from "tamagui";
import { config as baseConfig } from "@tamagui/config/v3";

const fonts = {
  body: createFont({
    family: "Montserrat",
    size: {
      1: 18,
      2: 25,
      3: 27,
    },
    lineHeight: {
      1: 16,
      2: 20,
      3: 24,
      4: 28,
      5: 32,
    },
    weight: {
      1: "100",
      2: "200",
      3: "300",
      4: "400",
      5: "500",
      6: "600",
      7: "700",
      8: "800",
      9: "900",
    },
    letterSpacing: {
      1: 0,
      2: 0.1,
      3: 0.2,
    },
    face: {
      100: {
        normal: "Montserrat_100Thin",
        italic: "Montserrat_100Thin_Italic",
      },
      200: {
        normal: "Montserrat_200ExtraLight",
        italic: "Montserrat_200ExtraLight_Italic",
      },
      300: {
        normal: "Montserrat_300Light",
        italic: "Montserrat_300Light_Italic",
      },
      400: {
        normal: "Montserrat_400Regular",
        italic: "Montserrat_400Regular_Italic",
      },
      500: {
        normal: "Montserrat_500Medium",
        italic: "Montserrat_500Medium_Italic",
      },
      600: {
        normal: "Montserrat_600SemiBold",
        italic: "Montserrat_600SemiBold_Italic",
      },
      700: {
        normal: "Montserrat_700Bold",
        italic: "Montserrat_700Bold_Italic",
      },
      800: {
        normal: "Montserrat_800ExtraBold",
        italic: "Montserrat_800ExtraBold_Italic",
      },
      900: {
        normal: "Montserrat_900Black",
        italic: "Montserrat_900Black_Italic",
      },
    },
  }),
};

const appConfig = createTamagui({
  ...baseConfig,
  fonts,
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
