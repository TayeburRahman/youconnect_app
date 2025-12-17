import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";

interface FeelingBadgeProps {
  feelingIcon: string;
  feelingName: string;
}

const FeelingBadge: React.FC<FeelingBadgeProps> = ({
  feelingIcon,
  feelingName,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Animated.View
      entering={SlideInRight.duration(200)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 14,
        backgroundColor: isDarkMode ? "#2C2C2E" : "#F0F2F5",
      }}
    >
      <Animated.Text entering={FadeIn.duration(200)} style={{ fontSize: 14 }}>
        {feelingIcon}
      </Animated.Text>
      <Text
        style={{
          marginLeft: 4,
          fontSize: 12,
          fontWeight: "600",
          color: isDarkMode ? "#DDD" : "#555",
        }}
      >
        {feelingName}
      </Text>
    </Animated.View>
  );
};

export default FeelingBadge;
