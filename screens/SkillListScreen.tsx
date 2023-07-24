import React, { useRef, useEffect, useContext, useState } from "react";

import { StyleSheet, Alert, View, Text } from "react-native";

import { FlatList } from "react-native-gesture-handler";

import AddButton from "../components/UI/Buttons/AddButton/AddButton";
import SkillItem from "../components/SkillItem/SkillItem";

import { Colors } from "../constants/colors";

import { SkillsContext } from "../store/SkillsContext";

const SkillListScreen = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<ISkillListItems[]>([]);
  const [isLoading, setIsloading] = useState(false);

  const { skills, getSkillsList } = useContext(SkillsContext);

  useEffect(() => {
    getSillList();
  }, []);

  const getSillList = async () => {
    try {
      setIsloading(true);
      const { rows } = await getAllSkillsFromDb();
      setData(rows);
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setIsloading(false);
    }
  };

  const onCreateNewSkill = () => {
    navigation.navigate("NewSkill");
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <Text style={styles.preloaderText}>Loading...</Text>
      </View>
    );
  }

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
