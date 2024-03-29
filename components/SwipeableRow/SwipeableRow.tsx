import React, { ReactNode, useContext, useRef } from "react";

import { StyleSheet, Animated as ReactAnimated, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { ISkillListItems } from "../../models/common.interface";
import { deleteSkill, updateSkill } from "../../utils/database";
import { SkillsContext } from "../../store/SkillsContext";

interface SwipeableRowProps {
  children: ReactNode;
  archive: 1 | 0;
  item: ISkillListItems;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  archive,
  item,
}) => {
  const { getSkillsList } = useContext(SkillsContext);

  const swipeableRef = useRef<Swipeable | null>(null);
  const rowHeight = useSharedValue(80);
  const marginVertical = useSharedValue(10);
  const swipeDirection = useSharedValue(0);

  const renderLeftActions = (
    progress: ReactAnimated.AnimatedInterpolation<number>,
    dragX: ReactAnimated.AnimatedInterpolation<number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [24, 70, 90, 160],
      outputRange: [0, 1, 1, 0],
    });

    return (
      <ReactAnimated.View style={[styles.arvhiveIconContainer, { opacity }]}>
        {archive ? (
          <Ionicons
            name="arrow-up-circle-outline"
            size={48}
            color={Colors.teal}
          />
        ) : (
          <Ionicons
            name="arrow-down-circle-outline"
            size={48}
            color={Colors.teal}
          />
        )}
      </ReactAnimated.View>
    );
  };

  const renderRightActions = (
    progress: ReactAnimated.AnimatedInterpolation<number>,
    dragX: ReactAnimated.AnimatedInterpolation<number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-160, -100, -60, -24],
      outputRange: [0, 1, 1, 0],
    });

    return (
      <ReactAnimated.View style={[styles.deleteIconContainer, { opacity }]}>
        <Ionicons name="remove-circle-outline" size={48} color={Colors.red} />
      </ReactAnimated.View>
    );
  };

  const itemRemoveAnimation = (action: "archive" | "delete") => {
    swipeDirection.value = withTiming(action === "archive" ? 300 : -300);
    rowHeight.value = withDelay(100, withTiming(0));
    marginVertical.value = withTiming(0);
  };

  const removeItem = async () => {
    try {
      await deleteSkill(item.id);
      itemRemoveAnimation("delete");
      await getSkillsList();
    } catch (error) {
      Alert.alert("Error", error as string);
    }
  };

  const updateItem = async () => {
    try {
      await updateSkill(item.id, [
        { key: "isarchive", value: item.isarchive ^ 1 },
      ]);
      itemRemoveAnimation("archive");
      await getSkillsList();
    } catch (error) {}
  };

  const onRowOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      Alert.alert(
        `Are you sure you want to ${archive ? "unarchive" : "archive"}?`,
        "",
        [
          {
            text: "Continue",
            onPress: () => updateItem(),
          },
          {
            text: "Cancel",
            onPress: () => swipeableRef.current?.close(),
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert("Are you sure you want to delete?", "", [
        {
          text: "Continue",
          onPress: () => removeItem(),
        },
        {
          text: "Cancel",
          onPress: () => swipeableRef.current?.close(),
          style: "cancel",
        },
      ]);
    }
  };

  const rStyle = useAnimatedStyle(() => ({
    height: rowHeight.value,
    marginVertical: marginVertical.value,
    left: swipeDirection.value,
    right: swipeDirection.value,
  }));

  return (
    <Swipeable
      ref={(ref) => (swipeableRef.current = ref)}
      friction={3}
      leftThreshold={75}
      rightThreshold={75}
      onSwipeableOpen={onRowOpen}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <Animated.View style={rStyle}>{children}</Animated.View>
    </Swipeable>
  );
};

export default SwipeableRow;

const styles = StyleSheet.create({
  arvhiveIconContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 34,
  },
  deleteIconContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 34,
  },
});
