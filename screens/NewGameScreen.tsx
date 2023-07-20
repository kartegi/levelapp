import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import BaseInput from "../components/UI/Inputs/BaseInput";
import { Colors } from "../constants/colors";
import { SelectList } from "react-native-dropdown-select-list";

const data = [
  { key: "1", value: "Mobiles" },
  { key: "2", value: "Appliances" },
  { key: "3", value: "Cameras" },
  { key: "4", value: "Computers" },
  { key: "5", value: "Vegetables" },
  { key: "6", value: "Diary Products" },
  { key: "7", value: "Drinks" },
];

const NewGameScreen = () => {
  const [selected, setSelected] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  useEffect(() => {
    console.log("Changed", isSelectFocused);
  }, [isSelectFocused]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.formContainer}>
        <BaseInput
          props={{
            placeholder: "Title",
            onFocus: () => {
              setIsInputFocused(true);
              setIsSelectFocused(() => false);
              console.log("Focused");
            },
            onBlur: () => setIsInputFocused(false),
          }}
          style={styles.textInput}
        />
        <View style={styles.gap} />
        <SelectList
          placeholder="Select Level"
          setSelected={(val: string) => setSelected(val)}
          search={false}
          data={data}
          dropdownStyles={styles.selectDropdown}
          boxStyles={styles.selectContainer}
          inputStyles={styles.selectInput}
          dropdownTextStyles={styles.selectDropdownTextItem}
          dropdownShown={false}
        />
      </View>
    </View>
  );
};

export default NewGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
  },
  formContainer: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: Colors.teal,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  textInput: {
    zIndex: 3,
  },
  gap: {
    marginVertical: 10,
  },
  selectContainer: {
    height: 50,
    borderWidth: 0,
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  selectInput: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectDropdown: {
    position: "absolute",
    width: "100%",
    top: 42,
    backgroundColor: Colors.lightGrey,
    color: Colors.black,
    zIndex: 10,
  },
  selectDropdownTextItem: {
    color: Colors.black,
  },
});
