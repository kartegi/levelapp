import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import NewSkillScreen from "../../screens/NewSkillScreen";
import TabNavigation from "../TabNavigation/TabNavigation";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NewSkill" component={NewSkillScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
