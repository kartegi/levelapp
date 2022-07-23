import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function MainMenu() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    setTodos([text, ...todos]);
  };

  return (
    <View style={styles.container}>
      {show && (
        <View style={styles.form}>
          <TextInput
            placeholder="Add Todo"
            autoFocus={true}
            style={styles.input}
            onChangeText={setText}
          />
          <Text style={styles.add}>+</Text>
        </View>
      )}
      <View onTouchEnd={() => setShow(!show)} style={styles.button}>
        <Text style={styles.plus}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    position: "absolute",
    width: 70,
    height: 70,
    backgroundColor: "#ff6900",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    bottom: 100,
    right: 30,
  },

  plus: {
    color: "#fff",
    fontSize: 40,
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, .4)",
    padding: 10,
    width: 200,
    borderRadius: 10,
    fontSize: 20,
  },

  form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  add: {
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff6900",
    borderRadius: "50%",
  },
});
