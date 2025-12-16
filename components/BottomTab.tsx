import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

interface BottomTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabItems = [
  { name: "Home", icon: "home", iconOutline: "home-outline" },
  { name: "Search", icon: "search", iconOutline: "search-outline" },
  { name: "Create", icon: "add-circle", iconOutline: "add-circle-outline" },
  { name: "Profile", icon: "person", iconOutline: "person-outline" },
];

const BottomTab: React.FC<BottomTabProps> = ({ activeTab, setActiveTab }) => {
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.bottomNav,
        {
          backgroundColor: isDarkMode ? "#1C1C1E" : "#FFFFFF",
          borderTopColor: isDarkMode ? "#3A3A3C" : "#E5E5EA",
        },
      ]}
    >
      {tabItems.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => setActiveTab(tab.name)}
          style={styles.tab}
        >
          <Ionicons
            name={
              activeTab === tab.name
                ? (tab.icon as any)
                : (tab.iconOutline as any)
            }
            size={26}
            color={
              activeTab === tab.name
                ? "#FF29B2"
                : isDarkMode
                ? "#8E8E93"
                : "#8E8E93"
            }
          />
          <Text
            style={{
              color:
                activeTab === tab.name
                  ? "#FF29B2"
                  : isDarkMode
                  ? "#8E8E93"
                  : "#8E8E93",
              fontSize: 10,
              marginTop: 2,
            }}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  bottomNav: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopWidth: 1,
    paddingBottom: 10, // For notch space
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
});
