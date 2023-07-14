import React from "react";
import { StyleSheet, Pressable, Text, View, Dimensions } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "../../constants/colors";
import SwipeableRow from "../SwipeableRow/SwipeableRow";
import { CARD_HEIGHT } from "../../constants/common";

interface SkillItemProps {
  flatListRef: any;
}

const SkillItem: React.FC<SkillItemProps> = ({ flatListRef }) => {
  const pressableOpacity = useSharedValue(1);

  const fadeAnimation = () => {
    pressableOpacity.value = withTiming(0.6, undefined, () => {
      pressableOpacity.value = withTiming(1);
    });
  };

  const handlePress = () => {
    fadeAnimation();
  };

  const rOpacityStyle = useAnimatedStyle(() => ({
    opacity: pressableOpacity.value,
  }));

  return (
    <SwipeableRow flatListRef={flatListRef}>
      <Pressable style={styles.itemContainer} onPress={handlePress}>
        <Animated.View style={[styles.animationContainer, rOpacityStyle]}>
          <LinearGradient
            style={styles.background}
            colors={[Colors.grey, "#9b8ea3"]}
            start={{ x: 2, y: 0.6 }}
            end={{ x: 0, y: 0 }}
            locations={[0, 0.8]}
          />

          <View style={styles.cardInfo}>
            <View>
              <Text style={styles.title}>Skill Title</Text>
              <Text style={styles.infoText}>Goal: 10000h</Text>
              <Text style={styles.infoText}>Progress: 500h</Text>
            </View>
            <View></View>
            <View style={styles.cardSubInfoContainer}>
              <Text style={styles.cardDate}>26.12.1993</Text>
              <Text style={styles.percentageText}>{(500 / 10000) * 100}%</Text>
            </View>
          </View>

          <View
            style={[
              styles.background,
              styles.progressBar,
              { width: `${(500 / 10000) * 107}%` },
            ]}
          ></View>
        </Animated.View>
      </Pressable>
    </SwipeableRow>
  );
};

export default React.memo(SkillItem);

const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get("window").width - 48,
    alignSelf: "center",
  },

  animationContainer: {
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    padding: 10,
  },
  swipeableAnimationViewContainer: {
    padding: 24,
    justifyContent: "center",
    width: "50%",
    borderRadius: 12,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: CARD_HEIGHT,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  infoText: {
    color: Colors.lightGrey,
  },
  cardSubInfoContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 60,
  },
  cardDate: {
    fontSize: 12,
    color: Colors.lightGrey,
  },
  percentageText: {
    color: "#2ef8a0",
    fontWeight: "bold",
  },
  progressBar: {
    height: CARD_HEIGHT,
    borderBottomColor: "#2ef8a0",
    borderBottomWidth: 3,
    borderBottomEndRadius: 0,
  },
});
