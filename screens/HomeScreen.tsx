// screens/HomeScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { styles } from "../styles/HomeScreen.styles";

type Post = {
  id: string;
  type: "image" | "video" | "text";
  username: string;
  avatar: string;
  media?: string;
  caption: string;
  likes: number;
  comments: number;
};

const demoPosts: Post[] = [
  {
    id: "1",
    type: "image",
    username: "Rayhan",
    avatar: "https://i.pravatar.cc/150?img=12",
    media: "https://images.pexels.com/photos/2088171/pexels-photo-2088171.jpeg",
    caption: "Chilling with the vibes ✨",
    likes: 2300,
    comments: 180,
  },
  {
    id: "2",
    type: "video",
    username: "Ariana",
    avatar: "https://i.pravatar.cc/150?img=32",
    media: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    caption: "Peaceful place 🌿🍃",
    likes: 1900,
    comments: 120,
  },
  {
    id: "3",
    type: "text",
    username: "Sanjida",
    avatar: "https://i.pravatar.cc/150?img=45",
    caption: "Start your day with a grateful heart 🤍",
    likes: 540,
    comments: 22,
  },
];

const stories = [
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=45",
  "https://i.pravatar.cc/150?img=56",
];

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ForYou" | "Following">("ForYou");

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={{ color: "#888", fontSize: 12 }}>2h ago</Text>
        </View>
        <Text style={styles.menu}>⋯</Text>
      </View>

      {/* Media */}
      {item.type === "image" && (
        <Image
          source={{ uri: item.media }}
          style={styles.media}
          resizeMode="cover"
        />
      )}

      {item.type === "video" && item.media && (
        <Video
          source={{ uri: item.media }}
          style={styles.media}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false}
          isLooping
        />
      )}

      {item.type === "text" && (
        <View style={styles.textPost}>
          <Text style={styles.textCaption}>{item.caption}</Text>
        </View>
      )}

      {/* Caption */}
      {item.type !== "text" && (
        <View style={{ paddingHorizontal: 14, paddingTop: 8 }}>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity>
          <Text style={styles.actionBtn}>❤️ {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionBtn}>💬 {item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionBtn}>🔁</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionBtn}>📤</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionBtn}>🔗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Text style={styles.logo}>NeonApp</Text>
        <Text style={styles.navIcon}>🔍</Text>
        <Text style={styles.navIcon}>🛎️</Text>
      </View>

      {/* Stories */}
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.storiesContainer}
        renderItem={({ item }) => (
          <View style={styles.storyCircle}>
            <Image source={{ uri: item }} style={styles.storyAvatar} />
          </View>
        )}
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab("ForYou")}>
          <Text
            style={[styles.tabText, activeTab === "ForYou" && styles.activeTab]}
          >
            For You
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("Following")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "Following" && styles.activeTab,
            ]}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        data={demoPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.bottomIconActive}>🏠</Text>
        <Text style={styles.bottomIcon}>🔍</Text>
        <Text style={styles.bottomIcon}>➕</Text>
        <Text style={styles.bottomIcon}>🎬</Text>
        <Text style={styles.bottomIcon}>👤</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
