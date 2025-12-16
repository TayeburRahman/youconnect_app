import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet, // Import StyleSheet
  Dimensions, // Import Dimensions for responsive design
  SafeAreaView, // Import SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import {
  SearchItem,
  SearchUserItem,
  SearchHashtagItem,
  SearchPostItem,
  SearchEventItem,
  RootTabParamList,
} from "../types"; // Corrected type imports
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"; // Import BottomTabScreenProps

const { width } = Dimensions.get("window");

type Props = BottomTabScreenProps<RootTabParamList, "Search">;

const SearchScreen: React.FC<Props> = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("Users");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Demo data for each tab
  const demoUsers: SearchUserItem[] = [
    {
      id: "1",
      username: "daily.quotes333",
      avatarUri: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: "2",
      username: "nature_lovers",
      avatarUri: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "3",
      username: "skater_life",
      avatarUri: "https://i.pravatar.cc/150?img=13",
    },
  ];

  const demoHashtags: SearchHashtagItem[] = [
    { id: "1", hashtag: "#Inspiration" },
    { id: "2", hashtag: "#Nature" },
    { id: "3", hashtag: "#Skating" },
  ];

  const demoPosts: SearchPostItem[] = [
    {
      id: "1",
      username: "daily.quotes333",
      caption: "When life gives you lemons...",
      imageUri: "https://via.placeholder.com/300",
    },
    {
      id: "2",
      username: "nature_lovers",
      caption: "Exploring the beauty of nature.",
      imageUri: "https://via.placeholder.com/300",
    },
    {
      id: "3",
      username: "skater_life",
      caption: "Skating into the weekend.",
      imageUri: "https://via.placeholder.com/300",
    },
  ];

  const demoEvents: SearchEventItem[] = [
    {
      id: "1",
      eventName: "Beach Clean-up",
      date: "May 20, 2023",
      location: "Santa Monica Beach",
    },
    {
      id: "2",
      eventName: "Skateboard Championship",
      date: "June 15, 2023",
      location: "Los Angeles",
    },
    {
      id: "3",
      eventName: "Nature Walk",
      date: "July 10, 2023",
      location: "Yosemite National Park",
    },
  ];

  // Function to filter results based on the active tab and search query
  const filterResults = (data: SearchItem[]) => {
    if (!searchQuery) return []; // Return empty if no query

    return data.filter((item) => {
      let searchableValue = "";
      if ("username" in item) searchableValue = item.username;
      else if ("hashtag" in item) searchableValue = item.hashtag;
      else if ("eventName" in item) searchableValue = item.eventName;
      else if ("caption" in item) searchableValue = item.caption; // For posts

      return searchableValue.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  // Function to render content based on the active tab
  const renderTabContent = () => {
    const cardStyle = [
      styles.card,
      { backgroundColor: isDarkMode ? "#333" : "#FFF" },
    ];
    const cardTextStyle = { color: isDarkMode ? "#FFF" : "#000" };

    let dataToFilter: SearchItem[] = [];
    switch (activeTab) {
      case "Users":
        dataToFilter = demoUsers;
        break;
      case "Hashtags":
        dataToFilter = demoHashtags;
        break;
      case "Posts":
        dataToFilter = demoPosts;
        break;
      case "Events":
        dataToFilter = demoEvents;
        break;
      default:
        return null;
    }

    const filteredData = filterResults(dataToFilter);

    if (searchQuery && filteredData.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, { color: isDarkMode ? "#AAA" : "#666" }]}>
            No results found for "{searchQuery}"
          </Text>
        </View>
      );
    }

    return filteredData.map((item) => {
      switch (activeTab) {
        case "Users":
          const user = item as SearchUserItem;
          return (
            <View key={user.id} style={cardStyle}>
              <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
              <Text style={[styles.cardText, cardTextStyle]}>{user.username}</Text>
            </View>
          );
        case "Hashtags":
          const hashtag = item as SearchHashtagItem;
          return (
            <View key={hashtag.id} style={cardStyle}>
              <Text style={[styles.cardText, cardTextStyle]}>
                {hashtag.hashtag}
              </Text>
            </View>
          );
        case "Posts":
          const post = item as SearchPostItem;
          return (
            <View key={post.id} style={cardStyle}>
              <Text style={[styles.cardText, cardTextStyle]}>{post.username}</Text>
              <Image source={{ uri: post.imageUri }} style={styles.cardImage} />
              <Text style={[styles.cardText, cardTextStyle]}>{post.caption}</Text>
            </View>
          );
        case "Events":
          const event = item as SearchEventItem;
          return (
            <View key={event.id} style={cardStyle}>
              <Text style={[styles.cardText, cardTextStyle]}>
                {event.eventName}
              </Text>
              <Text style={[styles.cardText, cardTextStyle]}>{event.date}</Text>
              <Text style={[styles.cardText, cardTextStyle]}>
                {event.location}
              </Text>
            </View>
          );
        default:
          return null;
      }
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFFFFF" }]}>
      <View
        style={[
          styles.container,
        ]}
      >
        {/* Search Bar */}
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
            style={[styles.searchInput, { color: isDarkMode ? "#FFF" : "#000" }]}
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Suggestions Layer */}
        {searchQuery.length > 0 && (
          <View
            style={[
              styles.suggestionsContainer,
              { backgroundColor: isDarkMode ? "#333" : "#FFF" },
            ]}
          >
            <FlatList<SearchItem>
              data={
                activeTab === "Users"
                  ? demoUsers
                  : activeTab === "Hashtags"
                  ? demoHashtags
                  : activeTab === "Posts"
                  ? demoPosts
                  : demoEvents
              }
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const label =
                  "username" in item
                    ? item.username
                    : "hashtag" in item
                    ? item.hashtag
                    : "eventName" in item
                    ? item.eventName
                    : "caption" in item ? item.caption : ""; // Added for posts

                return (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => setSearchQuery(label)}
                  >
                    <Text
                      style={[
                        styles.suggestionText,
                        { color: isDarkMode ? "#FFF" : "#000" },
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {["Users", "Hashtags", "Posts", "Events"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  { color: isDarkMode ? "#AAA" : "#888" }, // Adjusted for dark mode
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content for the active tab */}
        <ScrollView style={styles.content}>{renderTabContent()}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Stylesheet definition (moved from SearchScreen.styles.ts)
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#f0f0f0", // Light background
        paddingHorizontal: 12,
        borderRadius: 8,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333", // Dark text
    },
    suggestionsContainer: {
        backgroundColor: "#fff", // Light background
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginTop: 8,
        position: "absolute",
        top: 80,
        left: 16,
        right: 16,
        maxHeight: 200,
        zIndex: 999,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0", // Light border
    },
    suggestionText: {
        fontSize: 14,
        color: "#333", // Dark text
    },
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        zIndex: 1,
    },
    tabText: {
        fontSize: 16,
        color: "#888", // Default tab text
        fontWeight: "bold",
    },
    activeTabText: {
        color: "#FF29B2", // Active tab color (pink)
        borderBottomWidth: 2,
        borderBottomColor: "#FF29B2",
    },
    content: {
        flex: 1,
        // marginBottom: 50, // Removed, as FlatList in HomeScreen and custom BottomTab might handle this
    },
    card: {
        marginBottom: 16,
        backgroundColor: "#f9f9f9", // Light background
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        fontSize: 14,
        color: "#333", // Dark text
        marginBottom: 8,
    },
    cardImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 8,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    noResultsText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SearchScreen;