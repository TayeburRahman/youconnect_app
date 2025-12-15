import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BottomTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomTab: React.FC<BottomTabProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setActiveTab("Home")}>
        <Text style={activeTab === "Home" ? styles.activeTab : styles.tabText}>
          🏠 Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Search")}>
        <Text
          style={activeTab === "Search" ? styles.activeTab : styles.tabText}
        >
          🔍 Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Create")}>
        <Text
          style={activeTab === "Create" ? styles.activeTab : styles.tabText}
        >
          ➕ Create
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Profile")}>
        <Text
          style={activeTab === "Profile" ? styles.activeTab : styles.tabText}
        >
          👤 Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  bottomNav: {
    height: 70,
    backgroundColor: "#222",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  tabText: {
    color: "#888",
    fontSize: 18,
  },
  activeTab: {
    color: "#FF29B2",
    fontSize: 20,
  },
});
