import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BottomTab from "./BottomTab";

const HomeContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <HomeScreen />;
      case "Search":
        return <SearchScreen />;
      case "Create":
        return <CreatePostScreen />;
      case "Profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFF" },
      ]}
    >
      <View style={styles.content}>{renderScreen()}</View>
      <BottomTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={styles.themeToggle}>
        <Text style={{ color: isDarkMode ? "#FFF" : "#000" }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  themeToggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});
