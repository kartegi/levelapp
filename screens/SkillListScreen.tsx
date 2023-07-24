import React, { useRef, useEffect, useContext, useState } from "react";

import { StyleSheet } from "react-native";

import { FlatList } from "react-native-gesture-handler";

import { CompositeScreenProps } from "@react-navigation/native";

import AddButton from "../components/UI/Buttons/AddButton/AddButton";
import SkillItem from "../components/SkillItem/SkillItem";

import { Colors } from "../constants/colors";

import { SkillsContext } from "../store/SkillsContext";

interface SkillListScreenProps extends CompositeScreenProps<any, any> {}

const SkillListScreen: React.FC<SkillListScreenProps> = ({
  navigation,
  route,
}) => {
  const { skills, getSkillsList } = useContext(SkillsContext);

  useEffect(() => {
    getSkillsList();
  }, []);

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
        data={skills.filter(
          (item) => route.params.archive === !!item.isarchive
        )}
        renderItem={({ item }) => (
          <SkillItem
            item={item}
            flatListRef={flatListRef}
            archive={route.params.archive}
          />
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
  preloader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  preloaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
});
