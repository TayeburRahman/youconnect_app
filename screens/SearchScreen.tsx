import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import PostCard from "../components/PostCard";
import { RootTabParamList, PostItem, SearchUserItem } from "../types"; // Ensure correct types are imported
import demoFeed from "../demo_createpost_data.json"; // Demo data import

type Props = BottomTabScreenProps<RootTabParamList, "Search">;
type TabKey = "All" | "People" | "Posts" | "Events" | "Activities";

const TABS: TabKey[] = ["All", "People", "Posts", "Events", "Activities"];

// Normalize the text for filtering (case insensitive)
function normalize(text: unknown): string {
  return String(text ?? "")
    .toLowerCase()
    .trim();
}

export default function SearchScreen(_: Props) {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Cast feed data and ensure types
  const feed = useMemo(() => demoFeed as PostItem[], []);

  // Separate feed by post types
  const { posts, events, activities } = useMemo(() => {
    const posts: PostItem[] = [];
    const events: PostItem[] = [];
    const activities: PostItem[] = [];

    feed.forEach((item) => {
      if (!item || typeof item !== "object") return;
      switch ((item as any).postType) {
        case "Post":
          posts.push(item);
          break;
        case "Event":
          events.push(item);
          break;
        case "Activity":
          activities.push(item);
          break;
      }
    });

    return { posts, events, activities };
  }, [feed]);

  // Extract unique people from feed authors
  const people = useMemo(() => {
    const map = new Map<string, SearchUserItem>();
    feed.forEach((item) => {
      const author = (item as any).author;
      if (author?.id && !map.has(author.id)) {
        // @ts-ignore
        map.set(author.id, {
          id: String(author.id),
          name: String(author.name ?? "Unknown"),
          avatar: String(author.avatar ?? ""),
        });
      }
    });
    return Array.from(map.values());
  }, [feed]);

  // Select data list based on active tab
  const baseList = useMemo(() => {
    switch (activeTab) {
      case "All":
        return feed;
      case "People":
        return people;
      case "Posts":
        return posts;
      case "Events":
        return events;
      case "Activities":
        return activities;
      default:
        return [];
    }
  }, [activeTab, feed, people, posts, events, activities]);

  // Filter list by search query
  const filteredList = useMemo(() => {
    const query = normalize(searchQuery);
    if (!query) return baseList;

    if (activeTab === "People") {
      return (baseList as SearchUserItem[]).filter((user) =>
        normalize(user.name).includes(query)
      );
    }

    // Filter post/event/activity by relevant fields
    return (baseList as PostItem[]).filter((item) => {
      const fields = [
        (item as any)?.author?.name,
        (item as any)?.postContent,
        (item as any)?.eventName,
        (item as any)?.eventDescription,
        (item as any)?.storyText,
        (item as any)?.selectedActivity?.name,
        (item as any)?.selectedLocation,
        (item as any)?.selectedFeeling?.name,
      ];

      const haystack = fields.filter(Boolean).map(normalize).join(" ");
      return haystack.includes(query);
    });
  }, [baseList, activeTab, searchQuery]);

  // Render person row for People tab
  const renderPersonRow = (user: SearchUserItem) => (
    <TouchableOpacity
      key={user.id}
      style={[
        styles.personRow,
        { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFF" },
      ]}
      activeOpacity={0.7}
      onPress={() =>
        // @ts-ignore
        navigation.navigate("UserProfile", {
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
        })
      }
    >
      <View style={styles.avatarPlaceholder}>
        {user.avatar ? (
          <Ionicons name="person-circle" size={48} color="#888" />
        ) : (
          <Ionicons name="person-circle-outline" size={48} color="#888" />
        )}
      </View>
      <View style={styles.personInfo}>
        <Text
          style={[styles.personName, { color: isDarkMode ? "#FFF" : "#000" }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user.name}
        </Text>
        <Text
          style={[
            styles.personUsername,
            { color: isDarkMode ? "#AAA" : "#555" },
          ]}
        >
          @{user?.name?.toLowerCase().replace(/\s/g, "")}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.friendRequestBtn,
          { backgroundColor: isDarkMode ? "#3B82F6" : "#007AFF" },
        ]}
        onPress={() => alert(`Friend request sent to ${user.name}`)}
      >
        <Text style={styles.friendRequestText}>Add Friend</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Render Post/Event/Activity cards
  const renderPostRow = (item: PostItem) => (
    <PostCard key={item.id} post={item} isDarkMode={isDarkMode} />
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFFFFF" },
      ]}
    >
      <View style={styles.container}>
        {/* Search Input */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: isDarkMode ? "#333" : "#F5F5F5" },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search here"
            placeholderTextColor="#888"
            style={[
              styles.searchInput,
              { color: isDarkMode ? "#FFF" : "#000" },
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isDarkMode ? "#AAA" : "#888" },
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && (
                <View
                  style={[
                    styles.activeTabUnderline,
                    { backgroundColor: isDarkMode ? "#FFF" : "#000" },
                  ]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ScrollView List */}
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {filteredList.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text
                style={[
                  styles.noResultsText,
                  { color: isDarkMode ? "#AAA" : "#666" },
                ]}
              >
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : "No items to show."}
              </Text>
            </View>
          ) : activeTab === "People" ? (
            (filteredList as SearchUserItem[]).map(renderPersonRow)
          ) : (
            (filteredList as PostItem[]).map(renderPostRow)
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 12 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, height: 40 },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  tabButton: { paddingBottom: 6, alignItems: "center" },
  tabText: { fontSize: 16, fontWeight: "600" },
  activeTabText: { fontWeight: "700" },
  activeTabUnderline: {
    height: 2,
    width: "100%",
    marginTop: 4,
    borderRadius: 2,
  },
  content: { paddingBottom: 20 },
  noResultsContainer: { marginTop: 40, alignItems: "center" },
  noResultsText: { fontSize: 16, fontWeight: "600" },

  // People row styles
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  personInfo: {
    flex: 1,
    marginLeft: 12,
  },
  personName: {
    fontSize: 18,
    fontWeight: "600",
  },
  personUsername: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 2,
  },
  friendRequestBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  friendRequestText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
