import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { FlatList } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "../../../constants/colors";
import { IOption } from "../../../models/common.interface";

interface SelectInputProps {
  data: IOption[];
  height: number;
  onSelect: (item: IOption) => void;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  placeholder?: string;
  error?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  data,
  height,
  onSelect,
  isExpanded,
  setIsExpanded,
  placeholder,
  error,
}) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  const [selectedItem, setSelectedItem] = useState<IOption>({
    key: "-1",
    value: placeholder ? placeholder : "Select option",
  });

  const dropDownHeight = useSharedValue(0);

  useEffect(() => {
    dropdownContainerHeight();
  }, [isExpanded]);

  const dropdownContainerHeight = () => {
    if (isExpanded) {
      dropDownHeight.value = withTiming(300);
    } else {
      dropDownHeight.value = withTiming(0);
    }
  };

  const rDropdownContainer = useAnimatedStyle(() => ({
    height: dropDownHeight.value,
  }));

  const handleSelect = (item: IOption) => {
    setSelectedItem(item);
    setIsExpanded(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={[styles.selectInput, error && styles.error, { height }]}
        onPress={() => setIsExpanded((prev) => !prev)}
      >
        <Text
          style={[
            styles.inputText,
            selectedItem.key === "-1" && { color: "gray" },
          ]}
        >
          {selectedItem.value}
        </Text>
        {isExpanded ? (
          <AntDesign name="close" size={24} color={"grey"} />
        ) : (
          <AntDesign name="down" size={24} color={"grey"} />
        )}
      </Pressable>

      <View>
        <Animated.View style={[styles.dropdownWrapper, rDropdownContainer]}>
          <FlatList
            style={[styles.dropdownContainer]}
            data={data}
            renderItem={({ item }) => (
              <View>
                <Pressable
                  onPress={() => handleSelect(item)}
                  style={[styles.dropdownItem]}
                >
                  <Text style={styles.dropdownItemText}>{item.value}</Text>
                </Pressable>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <Pressable android_disableSound={true} style={{ height: 12 }} />
            )}
            contentContainerStyle={[styles.dropdownContainerContent]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  rootContainer: {
    zIndex: 1,
  },
  selectInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.lightGrey,
    zIndex: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  error: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
  inputText: {
    fontSize: 16,
  },
  dropdownWrapper: {
    position: "absolute",
    top: -20,
    width: "100%",
    backgroundColor: "rgba(255,255,255, 0.2)",
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdownContainer: {
    width: "100%",
  },
  dropdownContainerContent: {
    paddingTop: 32,
  },
  dropdownItem: {
    justifyContent: "center",
    padding: 12,
    width: "100%",
    height: 50,
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  dropdownItemText: {
    fontSize: 16,
  },
});
