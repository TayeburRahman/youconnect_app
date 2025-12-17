import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

type UserProfileRouteProp = RouteProp<
  { UserProfile: { userId: string; userName: string; userAvatar: string } },
  "UserProfile"
>;

export default function UserProfileScreen() {
  const route = useRoute<UserProfileRouteProp>();
  const { userId, userName, userAvatar } = route.params;
  const { isDarkMode } = useTheme();
  const [friendRequested, setFriendRequested] = useState(false);

  const onSendFriendRequest = () => {
    setFriendRequested(true);
    Alert.alert("Friend Request", `Friend request sent to ${userName}!`);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFF" },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Ionicons
            name="person-circle"
            size={120}
            color={isDarkMode ? "#888" : "#CCC"}
          />
        </View>

        <Text
          style={[styles.userName, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          {userName}
        </Text>
        <Text
          style={[styles.userUsername, { color: isDarkMode ? "#AAA" : "#555" }]}
        >
          @{userName.toLowerCase().replace(/\s/g, "")}
        </Text>

        <TouchableOpacity
          style={[
            styles.friendRequestButton,
            {
              backgroundColor: friendRequested
                ? "#4ade80"
                : isDarkMode
                  ? "#3B82F6"
                  : "#007AFF",
            },
          ]}
          onPress={onSendFriendRequest}
          disabled={friendRequested}
        >
          <Text style={styles.friendRequestText}>
            {friendRequested ? "Request Sent" : "Send Friend Request"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 24,
  },
  userName: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  userUsername: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 24,
  },
  friendRequestButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  friendRequestText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
