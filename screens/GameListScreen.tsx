import React, { useRef } from "react";

import { StyleSheet } from "react-native";

import { FlatList } from "react-native-gesture-handler";

import AddButton from "../components/UI/Buttons/AddButton/AddButton";
import GameItem from "../components/GameItem/GameItem";

import { GameListItems } from "../constants/dummy";
import { Colors } from "../constants/colors";

const GameListScreen = ({ navigation }: { navigation: any }) => {
  const flatListRef = useRef<any>(null);

  const onCreateNewGame = () => {
    navigation.navigate("NewGame");
  };

  return (
    <>
      <AddButton
        onPress={onCreateNewGame}
        iconContainerStyle={{
          position: "absolute",
          bottom: 20,
          right: 24,
          zIndex: 10,
        }}
      />
      <FlatList
        ref={(ref) => (flatListRef.current = ref?.getNativeScrollRef())}
        data={GameListItems}
        renderItem={({ item, index }) => <GameItem flatListRef={flatListRef} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

export default GameListScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
