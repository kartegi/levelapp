import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Stopwatch from "./components/stopwatch/Stopwatch";
import MainMenu from "./components/MainMenu/MainMenu";
// import Stopwatch from "react-native-stopwatch";

export default function App() {
  return (
    <View style={styles.container}>
      <MainMenu />
      <StatusBar style="auto" hidden="true" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#b5daf5",
    paddingTop: 30,
  },
});
