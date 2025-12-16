import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import SearchScreen from "./screens/SearchScreen"; // Import SearchScreen
import ProfileScreen from "./screens/ProfileScreen"; // Import ProfileScreen
import BottomTab from "./components/BottomTab";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RootStackParamList, RootTabParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTab {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} /> {/* Add Search screen */}
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> {/* Add Profile screen */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}