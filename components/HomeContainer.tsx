// screens/HomeContainer.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

// Screens
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../components/home/SearchScreen";
import CreateScreen from "./home/CreateScreen";
import ReelsScreen from "./home/ReelsScreen";
import ProfileScreen from "./home/ProfileScreen";

// Bottom Tab
import CustomBottomTab from "../components/CustomBottomTab";

type Tab = "Home" | "Search" | "Create" | "Reels" | "Profile";

const HomeContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <HomeScreen />;
      case "Search":
        return <SearchScreen />;
      case "Create":
        return <CreateScreen />;
      case "Reels":
        return <ReelsScreen />;
      case "Profile":
        return <ProfileScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <CustomBottomTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0F" },
  content: { flex: 1 },
});
