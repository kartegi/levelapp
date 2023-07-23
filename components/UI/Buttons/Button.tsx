import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../../constants/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  const opacity = useSharedValue(1);

  const fadeAnimation = () => {
    opacity.value = withTiming(0.8, undefined, () => {
      opacity.value = withTiming(1);
    });
  };

  const rButtonStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleButtonPress = () => {
    fadeAnimation();
    onPress();
  };

  return (
    <Pressable style={styles.rootContainer} onPress={handleButtonPress}>
      <Animated.View style={[styles.innerContainer, rButtonStyle]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  rootContainer: {
    alignSelf: "center",
    width: "100%",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.teal,
    width: "100%",
    height: 50,
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
  },
});
