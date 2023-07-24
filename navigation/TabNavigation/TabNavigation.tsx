import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";
import ProfileScreen from "../../screens/ProfileScreen";
import SkillListScreen from "../../screens/SkillListScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
        headerTintColor: Colors.white,
        tabBarStyle: { backgroundColor: Colors.black, borderTopWidth: 0 },
        tabBarActiveTintColor: Colors.teal,
        tabBarInactiveTintColor: Colors.white,
      }}
    >
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Skills"
        component={SkillListScreen}
        initialParams={{ archive: false }}
        options={{
          title: "Skills",
          tabBarLabel: "Skills",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Archive"
        component={SkillListScreen}
        initialParams={{ archive: true }}
        options={{
          title: "Archive",
          tabBarLabel: "Archive",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
