import {
  StyleSheet,
  View,
  ViewStyle,
  TextInput,
  TextInputProps,
} from "react-native";
import React from "react";
import { Colors } from "../../../constants/colors";

interface BaseInputProps {
  style?: ViewStyle | ViewStyle[];
  props?: TextInputProps;
  error?: boolean;
}

const BaseInput: React.FC<BaseInputProps> = ({ style, props, error }) => {
  return (
    <View style={[styles.inputContainer, style, error && styles.error]}>
      <TextInput style={[styles.input, props?.style]} {...props} />
    </View>
  );
};

export default BaseInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  input: {
    height: 50,
    padding: 12,
    fontSize: 16,
    // fontWeight: "bold",
    color: Colors.grey,
  },
  error: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
});
