import React, { useEffect, useState, useRef, useContext } from "react";

import { StyleSheet, View, Keyboard, Pressable, Text } from "react-native";

import { NavigationProp } from "@react-navigation/native";

import BaseInput from "../components/UI/Inputs/BaseInput";
import SelectInput from "../components/UI/Inputs/SelectInput";

import { Colors } from "../constants/colors";
import Button from "../components/UI/Buttons/Button";

import { FormDataValues, IOption } from "../models/common.interface";
import { addSkill } from "../utils/database";
import { SkillsContext } from "../store/SkillsContext";

const data = [
  { key: "1", value: "1 hour" },
  { key: "2", value: "5 hours" },
  { key: "3", value: "10 hours" },
  { key: "4", value: "50 hours" },
  { key: "5", value: "100 hours" },
  { key: "6", value: "500 hours" },
  { key: "7", value: "1000 hours" },
  { key: "8", value: "5000 hours" },
  { key: "9", value: "10000 hours" },
];

interface NewSkillScreenProps {
  navigation: NavigationProp<any, any>;
}

const NewSkillScreen: React.FC<NewSkillScreenProps> = ({ navigation }) => {
  const [isSelectExpanded, setIsSelectExpanded] = useState(false);
  const [progressValue, setProgressValue] = useState("");
  const [formError, setFormError] = useState<(keyof FormDataValues)[] | null>(
    null
  );
  const { getSkillsList } = useContext(SkillsContext);

  const formData = useRef<FormDataValues>({
    title: "",
    progress: "",
    goal: "",
    date: "",
  });

  useEffect(() => {
    if (isSelectExpanded) {
      Keyboard.dismiss();
    }
  }, [isSelectExpanded]);

  const handlePressOnScreen = () => {
    setIsSelectExpanded(false);
    Keyboard.dismiss();
  };

  const setInvalidInput = (key: keyof FormDataValues) => {
    setFormError((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, key];
      }
      return [key];
    });
  };

  const handleFormValidation = () => {
    const { title, progress, goal } = formData.current;

    if (!title || !progress || !goal) {
      if (!title) setInvalidInput("title");
      if (!progress) setInvalidInput("progress");
      if (!goal) setInvalidInput("goal");

      return false;
    }

    return true;
  };

  const handleFormSubmit = () => {
    if (!handleFormValidation()) {
      return;
    }

    addSkill({ ...formData.current, date: new Date().toISOString() });
    getSkillsList();
    navigation.navigate("Skills");
  };

  const handleFormData = (key: keyof FormDataValues, value: string) => {
    if (formError) {
      setFormError((prev) => {
        if (Array.isArray(prev)) {
          return prev?.filter((item) => item !== key);
        }
        return prev;
      });
    }
    formData.current = { ...formData.current, [key]: value };
  };

  return (
    <Pressable
      style={styles.rootContainer}
      onPress={handlePressOnScreen}
      android_disableSound={true}
    >
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.label}>Title</Text>
          <BaseInput
            props={{
              placeholder: "Skill Name",
              onChangeText: (text) => handleFormData("title", text),
              onFocus: () => {
                setIsSelectExpanded(false);
              },
            }}
            style={styles.textInput}
            error={!!formError?.find((item) => item === "title")}
          />
        </View>
        <View style={styles.gap} />
        <View>
          <Text style={styles.label}>Current Progress</Text>
          <BaseInput
            props={{
              placeholder: "Time in hours",
              keyboardType: "numeric",
              value: progressValue,
              onChangeText: (text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setProgressValue(numericText);
                handleFormData("progress", numericText);
              },
              onFocus: () => {
                setIsSelectExpanded(false);
              },
            }}
            style={styles.textInput}
            error={!!formError?.find((item) => item === "progress")}
          />
        </View>
        <View style={styles.gap} />
        <Text style={styles.label}>Goal</Text>
        <SelectInput
          data={data}
          height={50}
          onSelect={(item: IOption) =>
            handleFormData("goal", parseInt(item.value, 10) + "")
          }
          isExpanded={isSelectExpanded}
          setIsExpanded={setIsSelectExpanded}
          placeholder="Select your goal"
          error={!!formError?.find((item) => item === "goal")}
        />
        <View style={{ height: 44 }} />
        <Button title={"Save"} onPress={handleFormSubmit} />
      </View>
    </Pressable>
  );
};

export default NewSkillScreen;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: Colors.black,
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
  textInput: {},
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
  label: {
    fontSize: 18,
    color: Colors.white,
    paddingBottom: 10,
    paddingLeft: 10,
  },
});
