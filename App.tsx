import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import createBottomTabNavigator
import { SafeAreaView } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import BottomTab from "./components/BottomTab"; // Import your custom BottomTab component
import { ThemeProvider } from "./contexts/ThemeContext";
import { RootStackParamList, RootTabParamList } from "./types"; // Import RootTabParamList

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>(); // Create a Tab navigator

// Define the Bottom Tab Navigator component
const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTab {...props} />} // Use your custom BottomTab component
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      {/* Add other tab screens here */}
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
            <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} /> {/* Use the new MainTabNavigator */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}