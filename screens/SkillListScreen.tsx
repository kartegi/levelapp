import React, { useRef } from "react";

import { StyleSheet } from "react-native";

import { FlatList } from "react-native-gesture-handler";

import AddButton from "../components/UI/Buttons/AddButton/AddButton";
import SkillItem from "../components/SkillItem/SkillItem";

import { SkillListItems } from "../constants/dummy";
import { Colors } from "../constants/colors";

const SkillListScreen = ({ navigation }: { navigation: any }) => {
  const flatListRef = useRef<any>(null);

  const onCreateNewSkill = () => {
    navigation.navigate("NewSkill");
  };

  return (
    <>
      <AddButton
        onPress={onCreateNewSkill}
        iconContainerStyle={{
          position: "absolute",
          bottom: 20,
          right: 24,
          zIndex: 10,
        }}
      />
      <FlatList
        ref={(ref) => (flatListRef.current = ref?.getNativeScrollRef())}
        data={SkillListItems}
        renderItem={({ item, index }) => (
          <SkillItem flatListRef={flatListRef} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

export default SkillListScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
