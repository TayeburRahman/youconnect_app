import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
  SafeAreaView, // Import SafeAreaView
  Dimensions, // Import Dimensions
  TouchableOpacity, // Import TouchableOpacity for CustomButton
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"; // Import BottomTabScreenProps
import { RootTabParamList } from "../types"; // Import RootTabParamList
import CustomButton from "../components/CustomButton"; // Import CustomButton
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

const { width } = Dimensions.get("window"); // Get screen width for responsive sizing

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

// Mock user data
const user = {
  name: "John Does",
  username: "@johndoe",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt. A passionate developer and tech enthusiast.",
  profilePicture: "https://i.pravatar.cc/150?img=18", // Using a placeholder image
  postsCount: 25,
  followersCount: 120,
  followingCount: 80,
};

const ProfileScreen: React.FC<Props> = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? "#0A0A0F" : "#F0F2F5" }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profileImage}
          />
          <Text
            style={[
              styles.profileName,
              { color: isDarkMode ? "#FFF" : "#000" },
            ]}
          >
            {user.name}
          </Text>
          <Text
            style={[
              styles.profileUsername,
              { color: isDarkMode ? "#AAA" : "#666" },
            ]}
          >
            {user.username}
          </Text>
          <Text
            style={[
              styles.bio,
              { color: isDarkMode ? "#CCC" : "#555" },
            ]}
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
                { color: isDarkMode ? "#CCC" : "#555" },
              ]}
            >
              Posts
            </Text>
            <Text
              style={[
                styles.statValue,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {user.postsCount}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statLabel,
                { color: isDarkMode ? "#CCC" : "#555" },
              ]}
            >
              Followers
            </Text>
            <Text
              style={[
                styles.statValue,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {user.followersCount}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statLabel,
                { color: isDarkMode ? "#CCC" : "#555" },
              ]}
            >
              Following
            </Text>
            <Text
              style={[
                styles.statValue,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {user.followingCount}
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <CustomButton
            title="Edit Profile"
            onPress={() => console.log("Edit Profile clicked")}
            buttonStyle={[styles.profileButton, { backgroundColor: isDarkMode ? "#333" : "#E0E0E0" }]}
            textStyle={{ color: isDarkMode ? "#FFF" : "#000" }}
          />
          <CustomButton
            title="Share Profile"
            onPress={() => console.log("Share Profile clicked")}
            buttonStyle={[styles.profileButton, { backgroundColor: isDarkMode ? "#333" : "#E0E0E0" }]}
            textStyle={{ color: isDarkMode ? "#FFF" : "#000" }}
          />
        </View>

        {/* Dark Mode Toggle */}
        <View style={[styles.optionRow, { borderBottomColor: isDarkMode ? "#333" : "#E0E0E0" }]}>
          <Text style={[styles.optionText, { color: isDarkMode ? "#FFF" : "#000" }]}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FF29B2" }}
            thumbColor={isDarkMode ? "#F4F3F4" : "#F4F3F4"}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>

        {/* Additional User List Button (Placeholder) */}
        <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: isDarkMode ? "#FFF" : "#000" }]}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#AAA" : "#666"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: isDarkMode ? "#FFF" : "#000" }]}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#AAA" : "#666"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: isDarkMode ? "#FFF" : "#000" }]}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#AAA" : "#666"} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    borderWidth: 3,
    borderColor: "#FF29B2", // Accent color
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileUsername: {
    fontSize: 16,
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
    maxWidth: '80%', // Limit bio width
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)', // Subtle background for stats
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ProfileScreen;