// screens/ProfileScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

type Post = {
  id: string;
  type: "image" | "video";
  media: string;
};

const demoPosts: Post[] = [
  { id: "1", type: "image", media: "https://picsum.photos/300/300?random=1" },
  { id: "2", type: "image", media: "https://picsum.photos/300/300?random=2" },
  { id: "3", type: "image", media: "https://picsum.photos/300/300?random=3" },
  { id: "4", type: "image", media: "https://picsum.photos/300/300?random=4" },
];

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Posts" | "Reels">("Posts");

  const renderPost = ({ item }: { item: Post }) => (
    <Image
      source={{ uri: item.media }}
      style={{
        width: width / 3 - 4,
        height: width / 3 - 4,
        margin: 2,
        borderRadius: 8,
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      {/* Header */}
      <View style={{ alignItems: "center", paddingVertical: 16 }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#FF29B2",
          }}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            marginTop: 8,
          }}
        >
          Rayhan
        </Text>
        <Text style={{ color: "#888", fontSize: 14, marginTop: 4 }}>
          Tech & Travel Enthusiast
        </Text>

        {/* Follow / Message / Edit */}
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <TouchableOpacity
            style={{
              marginHorizontal: 8,
              padding: 8,
              borderRadius: 12,
              backgroundColor: "#FF29B2",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 8,
              padding: 8,
              borderRadius: 12,
              backgroundColor: "#6d60ff",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 8,
              padding: 8,
              borderRadius: 12,
              backgroundColor: "#00D1FF",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 12,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            34
          </Text>
          <Text style={{ color: "#888", fontSize: 14 }}>Posts</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            1.2k
          </Text>
          <Text style={{ color: "#888", fontSize: 14 }}>Followers</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            512
          </Text>
          <Text style={{ color: "#888", fontSize: 14 }}>Following</Text>
        </View>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: 1,
          borderBottomColor: "#222",
        }}
      >
        <TouchableOpacity onPress={() => setActiveTab("Posts")}>
          <Text
            style={{
              color: activeTab === "Posts" ? "#FF29B2" : "#888",
              fontWeight: "700",
              paddingVertical: 8,
            }}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Reels")}>
          <Text
            style={{
              color: activeTab === "Reels" ? "#FF29B2" : "#888",
              fontWeight: "700",
              paddingVertical: 8,
            }}
          >
            Reels
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <FlatList
        data={demoPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
