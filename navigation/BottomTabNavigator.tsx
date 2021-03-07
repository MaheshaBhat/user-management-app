import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";

// import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ContactScreen from "../screens/Contact";
import HomeScreen from "../screens/Home";
import SettingScreen from "../screens/Setting";
import ContactHeader from "../components/ContactHeader";

import {
  BottomTabParamList,
  ContactParamList,
  HomeParamList,
  SettingParamList,
} from "../types";
import { AppContext, contextType } from "../context";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const { theme } = useContext<contextType>(AppContext);

  return (
    <BottomTab.Navigator
      initialRouteName="Contact"
      tabBarOptions={{ activeTintColor: theme.colors.tint }}
    >
      <BottomTab.Screen
        name="Contact"
        component={ContactNavigator}
        options={{
          tabBarIcon: ({ color }: any) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }: any) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingNavigator}
        options={{
          tabBarIcon: ({ color }: any) => (
            <TabBarIcon name="settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ContactStack = createStackNavigator<ContactParamList>();

function ContactNavigator() {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          headerTitle: "Contact",
          header: (props) => <ContactHeader {...props} />,
        }}
      />
    </ContactStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

const SettingStack = createStackNavigator<SettingParamList>();

function SettingNavigator() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerTitle: "Settings" }}
      />
    </SettingStack.Navigator>
  );
}
