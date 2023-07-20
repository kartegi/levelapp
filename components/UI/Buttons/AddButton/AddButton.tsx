import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "../../../../constants/colors";

interface AddButtonProps {
  onPress: () => void;
  iconContainerStyle: ViewStyle;
}

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
  iconContainerStyle,
}) => {
  return (
    <Pressable style={[styles.container, iconContainerStyle]} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.green,
  },
  plus: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 38,
    fontWeight: "bold",
    color: Colors.white,
    height: 20,
    lineHeight: 32,
  },
});
