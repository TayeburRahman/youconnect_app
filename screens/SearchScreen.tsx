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

const SearchScreen: React.FC = () => {
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
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Users":
        return filterResults(demoUsers).map((user) => (
          <View key={user.id} style={styles.card}>
            <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
            <Text style={styles.cardText}>{user.username}</Text>
          </View>
        ));
      case "Hashtags":
        return filterResults(demoHashtags).map((hashtag) => (
          <View key={hashtag.id} style={styles.card}>
            <Text style={styles.cardText}>{hashtag.hashtag}</Text>
          </View>
        ));
      case "Posts":
        return filterResults(demoPosts).map((post) => (
          <View key={post.id} style={styles.card}>
            <Text style={styles.cardText}>{post.username}</Text>
            <Image source={{ uri: post.imageUri }} style={styles.cardImage} />
            <Text style={styles.cardText}>{post.caption}</Text>
          </View>
        ));
      case "Events":
        return filterResults(demoEvents).map((event) => (
          <View key={event.id} style={styles.card}>
            <Text style={styles.cardText}>{event.eventName}</Text>
            <Text style={styles.cardText}>{event.date}</Text>
            <Text style={styles.cardText}>{event.location}</Text>
          </View>
        ));
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search here"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Suggestions Layer */}
      {searchQuery.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={
              activeTab === "Users"
                ? demoUsers
                : activeTab === "Hashtags"
                ? demoHashtags
                : activeTab === "Posts"
                ? demoPosts
                : demoEvents
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() =>
                  setSearchQuery(
                    item.username || item.hashtag || item.eventName || ""
                  )
                }
              >
                <Text style={styles.suggestionText}>
                  {item.username || item.hashtag || item.eventName}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
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
