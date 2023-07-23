import { useEffect } from "react";
import { Platform, Image, StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Colors } from "./constants/colors";
import StackNavigation from "./navigation/StackNavigation/StackNavigation";
import { init } from "./utils/database";

const NewTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.grey,
  },
};

export default function App() {
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        await NavigationBar.setBackgroundColorAsync(Colors.black);
      }
      await init();
    })();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={NewTheme}>
        <GestureHandlerRootView style={styles.rootContainer}>
          <StackNavigation />
        </GestureHandlerRootView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
});
