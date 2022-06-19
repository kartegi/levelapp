import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

let mill = 0;

const Stopwatch = () => {
  const [hours, setHours] = useState("00");
  const [minunts, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [milliseconds, setMilliseconds] = useState("00");
  const [isActive, setActive] = useState(true);
  const [watch, setWatch] = useState(null);

  const runWatch = () => {
    const id = setInterval(() => {
      mill += 10;

      const date = new Date(mill);

      setHours(("0" + date.getUTCHours()).slice(-2));
      setMinutes(("0" + date.getUTCMinutes()).slice(-2));
      setSeconds(("0" + date.getUTCSeconds()).slice(-2));
      setMilliseconds(("0" + date.getUTCMilliseconds()).slice(-3, -1));
    }, 10);

    setWatch(id);
  };

  const stopWatch = () => {
    clearInterval(watch);
  };

  const startWatch = () => {
    setActive(!isActive);

    if (isActive) runWatch();
    else stopWatch();
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.time}
      >{`${hours}:${minunts}:${seconds}:${milliseconds}`}</Text>
      <Button onPress={startWatch} title="Start" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: "100px",
  },
});

export default Stopwatch;
