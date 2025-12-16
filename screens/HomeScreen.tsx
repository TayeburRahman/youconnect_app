import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList, // Import FlatList
  TouchableOpacity,
} from "react-native";
import styles from "../styles/HomeScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import PostCard from "../components/PostCard"; // Import PostCard
import { PostItem, User } from "../types"; // Import PostItem type

// Mock Data
import demoPostData from '../demo_createpost_data.json'; // Import mock data

const placeholderImage = "https://via.placeholder.com/60"; // Placeholder image for profiles

// Extended MOCK_FRIENDS to include in demo data
const MOCK_HOMESCREEN_FRIENDS: User[] = [
    { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: "3", name: "Peter Jones", avatar: "https://i.pravatar.cc/150?img=13" },
    { id: "4", name: "Liam Williams", avatar: "https://i.pravatar.cc/150?img=14" },
    { id: "5", name: "Olivia Brown", avatar: "https://i.pravatar.cc/150?img=15" },
    { id: "6", name: "Ethan Green", avatar: "https://i.pravatar.cc/150?img=16" },
    { id: "7", name: "Sophia White", avatar: "https://i.pravatar.cc/150?img=17" },
];


const HomeScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setPosts(demoPostData as PostItem[]);
  }, []);


  const renderPostItem = ({ item }: { item: PostItem }) => (
    <PostCard post={item} isDarkMode={isDarkMode} />
  );

  return (
    <View // Changed from ScrollView to View as FlatList handles scrolling
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
        <FlatList
            data={MOCK_HOMESCREEN_FRIENDS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={{ alignItems: 'center', marginRight: 15 }}>
                    <Image
                        source={{ uri: item.avatar }}
                        style={styles.profileImage}
                    />
                    <Text style={{ color: isDarkMode ? '#FFF' : '#000', fontSize: 12, marginTop: 5 }}>
                        {item.name.split(' ')[0]}
                    </Text>
                </View>
            )}
        />
      </View>

      {/* Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={styles.postListContainer} // Add style for FlatList content
      />
    </View>
  );
};

export default HomeScreen;