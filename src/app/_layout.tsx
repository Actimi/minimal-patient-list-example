import { OvokClient, OvokProvider } from "@actimi/ovok-core";
import {
  BottomSheetModalProvider as BSMPVOVK,
  DEFAULT_COLORS,
  DEFAULT_MULTIPLIERS,
  ExpoClientStorage,
  ThemeProvider as OvokThemeProvider,
  polyfillMedplumWebAPIs,
} from "@actimi/ovok-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

import "../features/localization/i18n";

// Initialize required polyfills for medical APIs
polyfillMedplumWebAPIs();

// Configure client storage
const storage = new ExpoClientStorage();

// Initialize Ovok client with your configuration
const ovokClient = new OvokClient({
  storage,
  cacheTime: 0,
  baseUrl: "https://api.ovok.com",
  fhirUrlPath: "/fhir",
  tenantCode: "public-example", // Change to your tenant code
});

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <OvokProvider client={ovokClient}>
        <OvokThemeProvider
          theme={{
            colors: DEFAULT_COLORS,
            dark: false,
            spacingMultiplier: DEFAULT_MULTIPLIERS.spacing,
            borderRadiusMultiplier: DEFAULT_MULTIPLIERS.borderRadius,
          }}
        >
          <BottomSheetModalProvider>
            <BSMPVOVK>
              <ThemeProvider value={DefaultTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(authenticated)" />
                </Stack>
              </ThemeProvider>
            </BSMPVOVK>
          </BottomSheetModalProvider>
        </OvokThemeProvider>
      </OvokProvider>
    </KeyboardProvider>
  );
}
