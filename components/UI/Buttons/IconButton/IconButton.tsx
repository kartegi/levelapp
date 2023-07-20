import React from "react";

import { StyleSheet, Text, View, Pressable, ViewStyle } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
  onPress: () => void;
  iconContainerStyle: ViewStyle;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
  iconContainerStyle,
}) => {
  const opacity = useSharedValue(1);

  const handlerPressEvent = () => {
    opacity.value = withTiming(0.8, undefined, () => {
      opacity.value = withTiming(1);
    });
    onPress();
  };

  const rTransformStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onPress={handlerPressEvent}
      style={[iconContainerStyle && iconContainerStyle]}
    >
      <Animated.View style={[rTransformStyle]}>
        <Ionicons name={icon} size={size} color={color} />
      </Animated.View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
