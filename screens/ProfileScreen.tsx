import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  Button,
  ScrollView,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

// Mock user data
const user = {
  name: "John Does",
  username: "@johndoe",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt.",
  profilePicture: null, // Replace with actual profile picture URI or use a placeholder
  postsCount: 25,
  followersCount: 120,
  followingCount: 80,
};

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFF" },
      ]}
    >
      {/* Profile Header */}
      <View style={styles.header}>
        {/* <Image
          source={
            user.profilePicture
              ? { uri: user.profilePicture }
              : require("../assets/default-avatar.png")
          }
          style={styles.profileImage}
        /> */}
        <Text
          style={[
            styles.profileName,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {user.name}
        </Text>
        <Text
          style={[
            styles.profileUsername,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {user.username}
        </Text>
        <Text
          style={[styles.bio, isDarkMode ? styles.darkText : styles.lightText]}
        >
          {user.bio}
        </Text>
      </View>

      {/* Profile Stats (Posts, Followers, Following) */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statLabel,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Posts
          </Text>
          <Text
            style={[
              styles.statValue,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            {user.postsCount}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statLabel,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Followers
          </Text>
          <Text
            style={[
              styles.statValue,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            {user.followersCount}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statLabel,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Following
          </Text>
          <Text
            style={[
              styles.statValue,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            {user.followingCount}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Edit Profile"
          onPress={() => console.log("Edit Profile clicked")}
          color={isDarkMode ? "#FF4081" : "#FF29B2"}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.themeToggle}>
        <Text style={{ color: isDarkMode ? "#FFF" : "#000" }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Additional User List Button */}
      <View style={styles.userListButton}>
        <Button
          title="View Friends, Followers, and Following"
          onPress={() => console.log("Navigate to User List")}
          color={isDarkMode ? "#FF4081" : "#FF29B2"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FF4081", // Accent color
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileUsername: {
    fontSize: 16,
    color: "#888",
  },
  bio: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  themeToggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  darkText: {
    color: "#FFF",
  },
  lightText: {
    color: "#000",
  },
  userListButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
