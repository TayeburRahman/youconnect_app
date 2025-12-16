import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const UserListScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const users = [
    { name: "Alice", status: "Friend" },
    { name: "Bob", status: "Follower" },
    { name: "Charlie", status: "Following" },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFF" },
      ]}
    >
      {users.map((user, index) => (
        <View
          key={index}
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? "#333" : "#f4f4f4" },
          ]}
        >
          <Text
            style={[styles.cardText, { color: isDarkMode ? "#FFF" : "#333" }]}
          >
            {user.name} ({user.status})
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
  },
});

export default UserListScreen;
