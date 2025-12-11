// screens/SearchScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../styles/HomeScreen.styles";

const trendingHashtags = [
  "#NeonVibes",
  "#CyberLife",
  "#AIContent",
  "#GenZMood",
  "#ReelsTime",
];

const suggestedUsers = [
  { id: "1", name: "Rayhan", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "2", name: "Sanjida", avatar: "https://i.pravatar.cc/150?img=45" },
  { id: "3", name: "Ariana", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: "4", name: "Zara", avatar: "https://i.pravatar.cc/150?img=56" },
];

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Search Bar */}
      <LinearGradient
        colors={["#4f46e5", "#6d60ff"]}
        style={{
          margin: 12,
          borderRadius: 12,
          padding: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#0A0A0F",
            borderRadius: 10,
            paddingHorizontal: 12,
            height: 44,
          }}
        >
          <Text style={{ fontSize: 18, color: "#FF29B2", marginRight: 8 }}>
            🔍
          </Text>
          <TextInput
            placeholder="Search users, hashtags..."
            placeholderTextColor="#888"
            style={{ color: "#fff", flex: 1, fontSize: 16 }}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </LinearGradient>

      {/* Trending Hashtags */}
      <View style={{ marginHorizontal: 16, marginVertical: 12 }}>
        <Text
          style={{
            color: "#FF29B2",
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Trending
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {trendingHashtags.map((tag) => (
            <LinearGradient
              key={tag}
              colors={["#FF29B2", "#00D1FF"]}
              style={{
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>{tag}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>

      {/* Suggested Users */}
      <View style={{ marginHorizontal: 16, marginVertical: 12 }}>
        <Text
          style={{
            color: "#FF29B2",
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Suggested Users
        </Text>
        <FlatList
          data={suggestedUsers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  borderWidth: 2,
                  borderColor: "#FF29B2",
                }}
              />
              <Text style={{ color: "#fff", marginTop: 4 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recent Searches Placeholder */}
      <View style={{ marginHorizontal: 16, marginVertical: 12 }}>
        <Text
          style={{
            color: "#FF29B2",
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Recent Searches
        </Text>
        <Text style={{ color: "#888", fontSize: 14 }}>No recent searches</Text>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
