import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function MainMenu() {
  return (
    <View style={styles.container}>
      <Text>+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 70,
    height: 70,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    bottom: 100,
    right: 30,
  },
});
