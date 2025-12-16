import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/HomeScreen.styles";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for icons
import { useTheme } from "../contexts/ThemeContext";

const placeholderImage = "https://via.placeholder.com/60"; // Placeholder image for profiles

const HomeScreen: React.FC = () => {
  const { isDarkMode } = useTheme();

  const posts = [
    {
      id: 1,
      username: "party_arty_dk",
      caption:
        "Yesterday I've painted this picture to express my gratitude towards people who always like my posts.",
      imageUri: "https://via.placeholder.com/300", // Placeholder image for posts
      comments: 20,
      likes: 300,
    },
    {
      id: 2,
      username: "john_doe",
      caption: "Having a great time with friends at the beach!",
      imageUri: "https://via.placeholder.com/300", // Placeholder image for posts
      comments: 50,
      likes: 800,
    },
    {
      id: 3,
      username: "jane_doe",
      caption: "Here's a text post just to share some thoughts.",
      imageUri: "", // No image for text post
      comments: 10,
      likes: 150,
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFFFFF" },
      ]}
    >
      {/* Connected Section */}
      <View style={styles.connectedContainer}>
        <Text
          style={[
            styles.connectedText,
            { color: isDarkMode ? "#FFF" : "#000" },
          ]}
        >
          Connected
        </Text>
        <View style={styles.profileRow}>
          {/* Display profile images */}
          <Image
            source={{ uri: placeholderImage }}
            style={styles.profileImage}
          />
          <Image
            source={{ uri: placeholderImage }}
            style={styles.profileImage}
          />
          <Image
            source={{ uri: placeholderImage }}
            style={styles.profileImage}
          />
          <Image
            source={{ uri: placeholderImage }}
            style={styles.profileImage}
          />
          <Image
            source={{ uri: placeholderImage }}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Posts */}
      {posts.map((post) => (
        <View
          key={post.id}
          style={[
            styles.postCard,
            { backgroundColor: isDarkMode ? "#333" : "#FFF" },
          ]}
        >
          <View style={styles.postHeader}>
            <Image
              source={{ uri: placeholderImage }}
              style={styles.profileImage}
            />
            <Text
              style={[styles.username, { color: isDarkMode ? "#FFF" : "#000" }]}
            >
              {post.username}
            </Text>
          </View>

          {/* Post Image */}
          {post.imageUri ? (
            <Image source={{ uri: post.imageUri }} style={styles.postImage} />
          ) : (
            <Text
              style={[
                styles.postCaption,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {post.caption}
            </Text>
          )}

          {/* Caption Text */}
          <Text
            style={[
              styles.postCaption,
              { color: isDarkMode ? "#FFF" : "#000" },
            ]}
          >
            {post.caption}
          </Text>

          {/* Engagement Section: Comments, Likes */}
          <View style={styles.postEngagement}>
            <View style={styles.commentSection}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={isDarkMode ? "#FFF" : "#000"}
              />
              <Text
                style={[
                  styles.engagementText,
                  { color: isDarkMode ? "#FFF" : "#000" },
                ]}
              >
                {post.comments} comments
              </Text>
            </View>
            <View style={styles.likeSection}>
              <Text
                style={[
                  styles.engagementText,
                  { color: isDarkMode ? "#FFF" : "#000" },
                ]}
              >
                You & {post.likes} others
              </Text>
              <Ionicons
                name="heart"
                size={20}
                color="#FF29B2" // Pink color for the heart button
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
