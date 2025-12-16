import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"; // Import BottomTabBarProps
import { useTheme } from "../contexts/ThemeContext";

const BottomTab: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { isDarkMode } = useTheme();

  const tabItems = [
    { name: "Home", icon: "home", iconOutline: "home-outline", label: "Home" },
    {
      name: "CreatePost",
      icon: "add-circle",
      iconOutline: "add-circle-outline",
      label: "Create",
    },
    { name: "Search", icon: "search", iconOutline: "search-outline" },

    { name: "Profile", icon: "person", iconOutline: "person-outline" },
  ];

  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bottomNav,
        {
          backgroundColor: isDarkMode ? "#1C1C1E" : "#FFFFFF",
          borderTopColor: isDarkMode ? "#3A3A3C" : "#E5E5EA",
          paddingBottom: insets.bottom, // Dynamically adjust padding for bottom safe area
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const tabItem = tabItems.find((item) => item.name === route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Ionicons
              name={
                isFocused
                  ? (tabItem?.icon as any) ||
                    (options.tabBarIcon as any) ||
                    "help-circle"
                  : (tabItem?.iconOutline as any) ||
                    (options.tabBarIcon as any) ||
                    "help-circle-outline"
              }
              size={26}
              color={isFocused ? "#FF29B2" : isDarkMode ? "#8E8E93" : "#8E8E93"}
            />
            <Text
              style={{
                color: isFocused
                  ? "#FF29B2"
                  : isDarkMode
                  ? "#8E8E93"
                  : "#8E8E93",
                fontSize: 10,
                marginTop: 2,
              }}
            >
              {tabItem?.label || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  bottomNav: {
    height: 95,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999, // Increased z-index to ensure it's always on top
    borderTopWidth: 1,
    // paddingBottom will be applied dynamically
  },
  tab: {
    flex: 1, // Distribute space evenly
    alignItems: "center",
    justifyContent: "center",
  },
});
