import React from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActivityFormProps } from "../../types";
import styles from "../../styles/CreateScreen.styles";

const ActivityForm: React.FC<ActivityFormProps> = ({
  isDarkMode,
  postContent,
  setPostContent,
  postImages,
  handleImageSelect,
  removeImage,
  openImageViewer,
  selectedActivity,
  setActivityModalVisible,
  artistCredit,
  setArtistCredit,
  openTagModal,
  taggedFriends,
  selectedLocation,
  setLocationModalVisible,
  setFeelingModalVisible,
  selectedFeeling,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: isDarkMode ? "#1C1C1E" : "#FFF",
            justifyContent: "flex-start",
            marginVertical: 10,
          },
        ]}
        onPress={() => setActivityModalVisible(true)}
      >
        <Ionicons
          name={(selectedActivity?.icon || "game-controller") as any}
          size={24}
          color="#F55752"
        />
        <Text
          style={[styles.actionText, { color: isDarkMode ? "#FFF" : "#000" }]}
          numberOfLines={1}
        >
          {selectedActivity?.name || "Select Activity"}
        </Text>
      </TouchableOpacity>
      {selectedActivity?.name === "Creating art" && (
        <TextInput
          style={[
            styles.inputField,
            {
              color: isDarkMode ? "#FFF" : "#000",
              backgroundColor: isDarkMode ? "#1C1C1E" : "#FFF",
              marginTop: 10,
            },
          ]}
          placeholder="Artist Credit (optional)"
          placeholderTextColor="#888"
          value={artistCredit}
          onChangeText={setArtistCredit}
        />
      )}
      <TextInput
        style={[styles.captionInput, { color: isDarkMode ? "#FFF" : "#000" }]}
        placeholder="What's on your mind?"
        placeholderTextColor="#888"
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />
      <FlatList
        data={[...postImages, {}]}
        renderItem={({ item, index }: any) =>
          index === postImages.length ? (
            <TouchableOpacity
              style={[
                styles.imageContainer,
                { borderColor: isDarkMode ? "#555" : "#CCC" },
              ]}
              onPress={() => handleImageSelect(false)}
            >
              <Ionicons name="add" size={40} color="#888" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => openImageViewer(item.uri)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="close-circle" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        style={styles.imageGrid}
      />
      <View
        style={[
          styles.actionsContainer,
          { backgroundColor: isDarkMode ? "#1C1C1E" : "#FFF" },
        ]}
      >
        <TouchableOpacity style={styles.actionButton} onPress={openTagModal}>
          <Ionicons name="pricetag" size={24} color="#33C759" />
          <Text
            style={[styles.actionText, { color: isDarkMode ? "#FFF" : "#000" }]}
          >
            {taggedFriends.length > 0
              ? `${taggedFriends.length} tagged`
              : "Tag"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setFeelingModalVisible(true)}
        >
          <Ionicons name="happy" size={24} color="#F5C33B" />
          <Text
            style={[styles.actionText, { color: isDarkMode ? "#FFF" : "#000" }]}
          >
            {selectedFeeling?.name || "Feeling"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setLocationModalVisible(true)}
        >
          <Ionicons name="location" size={24} color="#F55752" />
          <Text
            style={[styles.actionText, { color: isDarkMode ? "#FFF" : "#000" }]}
            numberOfLines={1}
          >
            {selectedLocation || "Location"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ActivityForm;
