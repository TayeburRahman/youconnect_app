import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/SearchScreen.styles";
import type { SearchItem, UserItem } from "./types/search.type";
import { useTheme } from "../contexts/ThemeContext";

const SearchScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("Users");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Demo data for each tab
  const demoUsers = [
    {
      id: 1,
      username: "daily.quotes333",
      avatarUri: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      username: "nature_lovers",
      avatarUri: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      username: "skater_life",
      avatarUri: "https://via.placeholder.com/60",
    },
  ];

  const demoHashtags = [
    { id: 1, hashtag: "#Inspiration" },
    { id: 2, hashtag: "#Nature" },
    { id: 3, hashtag: "#Skating" },
  ];

  const demoPosts = [
    {
      id: 1,
      username: "daily.quotes333",
      caption: "When life gives you lemons...",
      imageUri: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      username: "nature_lovers",
      caption: "Exploring the beauty of nature.",
      imageUri: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      username: "skater_life",
      caption: "Skating into the weekend.",
      imageUri: "https://via.placeholder.com/300",
    },
  ];

  const demoEvents = [
    {
      id: 1,
      eventName: "Beach Clean-up",
      date: "May 20, 2023",
      location: "Santa Monica Beach",
    },
    {
      id: 2,
      eventName: "Skateboard Championship",
      date: "June 15, 2023",
      location: "Los Angeles",
    },
    {
      id: 3,
      eventName: "Nature Walk",
      date: "July 10, 2023",
      location: "Yosemite National Park",
    },
  ];

  // Function to filter results based on the active tab and search query
  const filterResults = (data: any[]) => {
    return data.filter((item: any) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  // Function to render content based on the active tab
  const renderTabContent = () => {
    const cardStyle = [
      styles.card,
      { backgroundColor: isDarkMode ? "#333" : "#FFF" },
    ];
    const cardTextStyle = { color: isDarkMode ? "#FFF" : "#000" };

    switch (activeTab) {
      case "Users":
        return filterResults(demoUsers).map((user) => (
          <View key={user.id} style={cardStyle}>
            <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
            <Text style={[styles.cardText, cardTextStyle]}>{user.username}</Text>
          </View>
        ));
      case "Hashtags":
        return filterResults(demoHashtags).map((hashtag) => (
          <View key={hashtag.id} style={cardStyle}>
            <Text style={[styles.cardText, cardTextStyle]}>
              {hashtag.hashtag}
            </Text>
          </View>
        ));
      case "Posts":
        return filterResults(demoPosts).map((post) => (
          <View key={post.id} style={cardStyle}>
            <Text style={[styles.cardText, cardTextStyle]}>{post.username}</Text>
            <Image source={{ uri: post.imageUri }} style={styles.cardImage} />
            <Text style={[styles.cardText, cardTextStyle]}>{post.caption}</Text>
          </View>
        ));
      case "Events":
        return filterResults(demoEvents).map((event) => (
          <View key={event.id} style={cardStyle}>
            <Text style={[styles.cardText, cardTextStyle]}>
              {event.eventName}
            </Text>
            <Text style={[styles.cardText, cardTextStyle]}>{event.date}</Text>
            <Text style={[styles.cardText, cardTextStyle]}>
              {event.location}
            </Text>
          </View>
        ));
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFFFFF" },
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
                  : "";

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
                { color: isDarkMode ? "#888" : "#888" },
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
  );
};

export default SearchScreen;
