// components/CustomBottomTab.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../styles/HomeScreen.styles";

type Tab = "Home" | "Search" | "Create" | "Reels" | "Profile";

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const CustomBottomTab: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setActiveTab("Home")}>
        <Text
          style={
            activeTab === "Home" ? styles.bottomIconActive : styles.bottomIcon
          }
        >
          🏠
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Search")}>
        <Text
          style={
            activeTab === "Search" ? styles.bottomIconActive : styles.bottomIcon
          }
        >
          🔍
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Create")}>
        <View style={styles.createBtn}>
          <Text style={{ fontSize: 28, color: "#fff" }}>➕</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Reels")}>
        <Text
          style={
            activeTab === "Reels" ? styles.bottomIconActive : styles.bottomIcon
          }
        >
          🎬
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Profile")}>
        <Text
          style={
            activeTab === "Profile"
              ? styles.bottomIconActive
              : styles.bottomIcon
          }
        >
          👤
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBottomTab;
