import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles/CreateScreen.styles";
import { useTheme } from "../../contexts/ThemeContext";
import PostForm from "./PostForm";
import StoryForm from "./StoryForm";
import ActivityForm from "./ActivityForm";
import EventForm from "./EventForm";
import usePostHandler from "./PostHandler"; // Import the custom hook
import { CreatePostFormProps } from "../../types";

// Mock Data
const MOCK_FRIENDS = [
  { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "3", name: "Peter Jones", avatar: "https://i.pravatar.cc/150?img=13" },
  {
    id: "4",
    name: "Liam Williams",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  { id: "5", name: "Olivia Brown", avatar: "https://i.pravatar.cc/150?img=15" },
];

const MOCK_LOCATIONS = [
  "New York, NY",
  "Los Angeles, CA",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
];

const MOCK_ACTIVITIES = [
  { name: "Watching a movie", icon: "film" },
  { name: "Playing a game", icon: "game-controller" },
  { name: "Listening to music", icon: "musical-notes" },
  { name: "Reading a book", icon: "book" },
  { name: "Traveling", icon: "airplane" },
  { name: "Eating", icon: "restaurant" },
  { name: "Working out", icon: "barbell" },
  { name: "Celebrating", icon: "gift" },
  { name: "Shopping", icon: "cart" },
  { name: "Cooking", icon: "fast-food" },
  { name: "Chilling", icon: "cafe" },
  { name: "Studying", icon: "school" },
  { name: "Creating art", icon: "brush" },
];

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme();
  // Post State
  const [postType, setPostType] = useState("Post");
  const [postContent, setPostContent] = useState<string>("");
  const [postImages, setPostImages] = useState<any[]>([]);
  // Modals State
  const [feelingModalVisible, setFeelingModalVisible] =
    useState<boolean>(false);
  const [activityModalVisible, setActivityModalVisible] =
    useState<boolean>(false);
  const [tagModalVisible, setTagModalVisible] = useState<boolean>(false);
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const [imageViewerVisible, setImageViewerVisible] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  // Selections State
  const [selectedFeeling, setSelectedFeeling] = useState<any>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [taggedFriends, setTaggedFriends] = useState<any[]>([]);
  const [tempTaggedFriends, setTempTaggedFriends] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("Public");
  // Event State
  const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState<string>("");
  const [eventEndDate, setEventEndDate] = useState<string>("");
  const [isSettingStartDate, setIsSettingStartDate] = useState(true);
  const [tempDate, setTempDate] = useState("");

  // Artist Credit
  const [artistCredit, setArtistCredit] = useState<string>("");
  // Search State
  const [friendSearch, setFriendSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const feelings = [
    { icon: "😊", name: "Happy" },
    { icon: "😂", name: "Laughing" },
    { icon: "😍", name: "Loved" },
    { icon: "😢", name: "Sad" },
  ];

  const postTypes = [
    { name: "Post", icon: "document-text" },
    { name: "Event", icon: "calendar" },
    { name: "Story", icon: "image" },
    { name: "Activity", icon: "game-controller" },
  ];

  const handleImageSelect = useCallback(async (isSingle: boolean = false) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: !isSingle,
      quality: 1,
      selectionLimit: isSingle ? 1 : 9,
    });
    if (!result.canceled) {
      if (isSingle) {
        setPostImages(result.assets);
      } else {
        setPostImages((prevImages) => [...prevImages, ...result.assets]);
      }
    }
  }, []);

  const removeImage = (index: number) => {
    setPostImages(postImages.filter((_, i) => i !== index));
  };

  const openTagModal = () => {
    setTempTaggedFriends([...taggedFriends]);
    setTagModalVisible(true);
  };

  const handleTagDone = () => {
    setTaggedFriends([...tempTaggedFriends]);
    setTagModalVisible(false);
  };

  const toggleTempFriendTag = (friend: any) => {
    if (tempTaggedFriends.some((f) => f.id === friend.id)) {
      setTempTaggedFriends(tempTaggedFriends.filter((f) => f.id !== friend.id));
    } else {
      setTempTaggedFriends([...tempTaggedFriends, friend]);
    }
  };

  const openImageViewer = (uri: string) => {
    setSelectedImage(uri);
    setImageViewerVisible(true);
  };

  const filteredFriends = useMemo(
    () =>
      MOCK_FRIENDS.filter((f) =>
        f.name.toLowerCase().includes(friendSearch.toLowerCase())
      ),
    [friendSearch]
  );

  const filteredLocations = useMemo(
    () =>
      MOCK_LOCATIONS.filter((l) =>
        l.toLowerCase().includes(locationSearch.toLowerCase())
      ),
    [locationSearch]
  );

  const handleDateDone = () => {
    if (isSettingStartDate) {
      setEventStartDate(tempDate);
    } else {
      setEventEndDate(tempDate);
    }
    setDatePickerVisible(false);
    setTempDate("");
  };

  const showDatePicker = (isStart: boolean) => {
    setIsSettingStartDate(isStart);
    setTempDate(isStart ? eventStartDate : eventEndDate);
    setDatePickerVisible(true);
  };

  const setQuickDateTime = useCallback(
    (option: "now" | "hour" | "tomorrow" | "week") => {
      const now = new Date();
      let newDate = new Date(now);
      switch (option) {
        case "now":
          // newDate is already now
          break;
        case "hour":
          newDate.setHours(now.getHours() + 1);
          break;
        case "tomorrow":
          newDate.setDate(now.getDate() + 1);
          newDate.setHours(9, 0, 0, 0); // Default to 9:00 AM
          break;
        case "week":
          newDate.setDate(now.getDate() + 7);
          newDate.setHours(9, 0, 0, 0); // Default to 9:00 AM next week
          break;
      }
      setTempDate(newDate.toLocaleString());
    },
    []
  ); // Empty dependency array because setTempDate is a state setter

  const resetForm = useCallback(() => {
    setPostContent("");
    setPostImages([]);
    setSelectedFeeling(null);
    setTaggedFriends([]);
    setTempTaggedFriends([]);
    setSelectedLocation(null);
    setSelectedVisibility("Public");
    setEventName("");
    setEventStartDate("");
    setEventEndDate("");
    setSelectedActivity(null);
    setArtistCredit("");
  }, []);

  const [isPosting, setIsPosting] = useState(false); // New state for loading indicator

  const { handlePostSubmit: originalHandlePostSubmit } = usePostHandler({
    postType,
    postContent,
    postImages,
    taggedFriends,
    selectedLocation,
    selectedVisibility,
    eventName,
    eventStartDate,
    eventEndDate,
    selectedActivity,
    artistCredit,
    selectedFeeling,
    resetForm,
  });

  const handlePostSubmit = async () => {
    setIsPosting(true);
    try {
      await originalHandlePostSubmit();
      onClose(); // Close the screen after successful post
    } catch (error) {
      console.error("Error posting:", error);
      // Optionally show an alert to the user
    } finally {
      setIsPosting(false);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {" "}
      {/* Removed SafeAreaView and Header section */}
      {/* Post Type Selector */}
      <View style={styles.postTypeContainer}>
        <View
          style={[
            styles.segmentedControl,
            { backgroundColor: isDarkMode ? "#1C1C1E" : "#E5E5EA" },
          ]}
        >
          {postTypes.map((type) => (
            <TouchableOpacity
              key={type.name}
              style={[
                styles.segmentButton,
                postType === type.name && {
                  backgroundColor: isDarkMode ? "#FF29B2" : "#fff",
                },
              ]}
              onPress={() => setPostType(type.name)}
              disabled={isPosting} // Disable while posting
            >
              <Ionicons
                name={
                  postType === type.name
                    ? (type.icon as any)
                    : ((type.icon + "-outline") as any)
                }
                size={20}
                color={
                  postType === type.name
                    ? isDarkMode
                      ? "#fff"
                      : "#000"
                    : isDarkMode
                    ? "#AAA"
                    : "#888"
                }
              />
              <Text
                style={[
                  styles.segmentText,
                  {
                    color:
                      postType === type.name
                        ? isDarkMode
                          ? "#fff"
                          : "#000"
                        : isDarkMode
                        ? "#AAA"
                        : "#888",
                    marginLeft: 5,
                  },
                ]}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
        {postType === "Post" && (
          <PostForm
            isDarkMode={isDarkMode}
            postContent={postContent}
            setPostContent={setPostContent}
            postImages={postImages}
            handleImageSelect={handleImageSelect}
            removeImage={removeImage}
            openImageViewer={openImageViewer}
            openTagModal={openTagModal}
            selectedFeeling={selectedFeeling}
            setFeelingModalVisible={setFeelingModalVisible}
            taggedFriends={taggedFriends}
            selectedLocation={selectedLocation}
            setLocationModalVisible={setLocationModalVisible}
          />
        )}
        {postType === "Story" && (
          <StoryForm
            isDarkMode={isDarkMode}
            postContent={postContent}
            setPostContent={setPostContent}
            postImages={postImages}
            handleImageSelect={handleImageSelect}
          />
        )}
        {postType === "Activity" && (
          <ActivityForm
            isDarkMode={isDarkMode}
            postContent={postContent}
            setPostContent={setPostContent}
            postImages={postImages}
            handleImageSelect={handleImageSelect}
            removeImage={removeImage}
            openImageViewer={openImageViewer}
            selectedActivity={selectedActivity}
            setActivityModalVisible={setActivityModalVisible}
            artistCredit={artistCredit}
            setArtistCredit={setArtistCredit}
            openTagModal={openTagModal}
            taggedFriends={taggedFriends}
            selectedLocation={selectedLocation}
            setLocationModalVisible={setLocationModalVisible}
            setFeelingModalVisible={setFeelingModalVisible}
            selectedFeeling={selectedFeeling}
          />
        )}
        {postType === "Event" && (
          <EventForm
            isDarkMode={isDarkMode}
            eventName={eventName}
            setEventName={setEventName}
            postContent={postContent}
            setPostContent={setPostContent}
            eventStartDate={eventStartDate}
            showDatePicker={showDatePicker}
            eventEndDate={eventEndDate}
            postImages={postImages}
            handleImageSelect={handleImageSelect}
            selectedLocation={selectedLocation}
            setLocationModalVisible={setLocationModalVisible}
            setPostImages={setPostImages}
          />
        )}

        {postType !== "Story" && (
          <View
            style={[
              styles.segmentedControl,
              { backgroundColor: isDarkMode ? "#1C1C1E" : "#E5E5EA" },
            ]}
          >
            {["Public", "Friends", "Only Me"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.segmentButton,
                  selectedVisibility === item && {
                    backgroundColor: isDarkMode ? "#FF29B2" : "#fff",
                  },
                ]}
                onPress={() => setSelectedVisibility(item)}
                disabled={isPosting} // Disable while posting
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color:
                        selectedVisibility === item
                          ? isDarkMode
                            ? "#fff"
                            : "#000"
                          : isDarkMode
                          ? "#AAA"
                          : "#888",
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      <LinearGradient colors={["#8E24AA", "#FF4081"]} style={styles.postButton}>
        <TouchableOpacity onPress={handlePostSubmit} disabled={isPosting}>
          {isPosting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.postButtonText}>Post</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
      {/* Modals */}
      {[
        {
          visible: feelingModalVisible,
          onRequestClose: () => setFeelingModalVisible(false),
          title: "How are you feeling?",
          data: feelings,
          renderItem: ({ item }: any) => (
            <TouchableOpacity
              style={styles.feelingItem}
              onPress={() => {
                setSelectedFeeling(item);
                setFeelingModalVisible(false);
              }}
            >
              <Text style={{ fontSize: 24 }}>{item.icon}</Text>
              <Text
                style={[
                  styles.feelingText,
                  { color: isDarkMode ? "#FFF" : "#000" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ),
        },
        {
          visible: activityModalVisible,
          onRequestClose: () => setActivityModalVisible(false),
          title: "What are you doing?",
          data: MOCK_ACTIVITIES,
          renderItem: ({ item }: any) => (
            <TouchableOpacity
              style={styles.feelingItem}
              onPress={() => {
                setSelectedActivity(item);
                setActivityModalVisible(false);
              }}
            >
              <Ionicons
                name={item.icon as any}
                size={24}
                color={isDarkMode ? "#FFF" : "#000"}
              />
              <Text
                style={[
                  styles.feelingText,
                  { color: isDarkMode ? "#FFF" : "#000" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ),
        },
        {
          visible: tagModalVisible,
          onRequestClose: () => setTagModalVisible(false),
          onDone: handleTagDone,
          title: "Tag Friends",
          searchPlaceholder: "Search for friends...",
          searchValue: friendSearch,
          onSearchChange: setFriendSearch,
          data: filteredFriends,
          renderItem: ({ item }: any) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => toggleTempFriendTag(item)}
            >
              <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
              <Text
                style={[
                  styles.feelingText,
                  { color: isDarkMode ? "#FFF" : "#000" },
                ]}
              >
                {item.name}
              </Text>
              <Ionicons
                name={
                  tempTaggedFriends.some((f) => f.id === item.id)
                    ? "checkbox"
                    : "square-outline"
                }
                size={24}
                color={isDarkMode ? "#FF29B2" : "#8E24AA"}
              />
            </TouchableOpacity>
          ),
          hasDoneButton: true,
        },
        {
          visible: locationModalVisible,
          onRequestClose: () => setLocationModalVisible(false),
          title: "Add Location",
          searchPlaceholder: "Search for a location...",
          searchValue: locationSearch,
          onSearchChange: setLocationSearch,
          data: filteredLocations,
          renderItem: ({ item }: any) => (
            <TouchableOpacity
              style={styles.locationItem}
              onPress={() => {
                setSelectedLocation(item);
                setLocationModalVisible(false);
              }}
            >
              <Ionicons
                name="location-sharp"
                size={24}
                color={isDarkMode ? "#FFF" : "#000"}
              />
              <Text
                style={[
                  styles.feelingText,
                  { color: isDarkMode ? "#FFF" : "#000" },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ),
        },
      ].map((modalProps, index) => (
        <Modal
          key={index}
          animationType="slide"
          transparent={true}
          visible={modalProps.visible}
          onRequestClose={modalProps.onRequestClose}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPressOut={modalProps.onRequestClose}
          >
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalContent,
                  { backgroundColor: isDarkMode ? "#1C1C1E" : "#FFF" },
                ]}
              >
                <View style={styles.modalHeader}>
                  <View style={styles.closeBar} />
                  <Text
                    style={[
                      styles.modalTitle,
                      { color: isDarkMode ? "#FFF" : "#000" },
                    ]}
                  >
                    {modalProps.title}
                  </Text>
                </View>
                {modalProps.searchPlaceholder && (
                  <TextInput
                    style={[
                      styles.searchInput,
                      {
                        color: isDarkMode ? "#FFF" : "#000",
                        backgroundColor: isDarkMode ? "#333" : "#F0F2F5",
                      },
                    ]}
                    placeholder={modalProps.searchPlaceholder}
                    placeholderTextColor="#888"
                    value={modalProps.searchValue}
                    onChangeText={modalProps.onSearchChange}
                  />
                )}
                <FlatList
                  data={modalProps.data}
                  renderItem={modalProps.renderItem}
                  keyExtractor={(item: any, idx: any) =>
                    item.id ? item.id.toString() : idx.toString()
                  }
                />
                {modalProps.hasDoneButton && (
                  <TouchableOpacity
                    style={[
                      styles.doneButton,
                      { backgroundColor: isDarkMode ? "#FF29B2" : "#8E24AA" },
                    ]}
                    onPress={(modalProps as any).onDone}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      ))}
      {datePickerVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={datePickerVisible}
          onRequestClose={() => setDatePickerVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPressOut={() => setDatePickerVisible(false)}
          >
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalContent,
                  { backgroundColor: isDarkMode ? "#1C1C1E" : "#FFF" },
                ]}
              >
                <Text
                  style={[
                    styles.modalTitle,
                    { color: isDarkMode ? "#FFF" : "#000" },
                  ]}
                >
                  {isSettingStartDate ? "Set Start Date" : "Set End Date"}
                </Text>
                <View style={styles.quickDateTimeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.quickDateTimeButton,
                      { backgroundColor: isDarkMode ? "#333" : "#F0F2F5" },
                    ]}
                    onPress={() => setQuickDateTime("now")}
                  >
                    <Text
                      style={[
                        styles.quickDateTimeText,
                        { color: isDarkMode ? "#FFF" : "#000" },
                      ]}
                    >
                      Now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.quickDateTimeButton,
                      { backgroundColor: isDarkMode ? "#333" : "#F0F2F5" },
                    ]}
                    onPress={() => setQuickDateTime("hour")}
                  >
                    <Text
                      style={[
                        styles.quickDateTimeText,
                        { color: isDarkMode ? "#FFF" : "#000" },
                      ]}
                    >
                      In 1 hour
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.quickDateTimeButton,
                      { backgroundColor: isDarkMode ? "#333" : "#F0F2F5" },
                    ]}
                    onPress={() => setQuickDateTime("tomorrow")}
                  >
                    <Text
                      style={[
                        styles.quickDateTimeText,
                        { color: isDarkMode ? "#FFF" : "#000" },
                      ]}
                    >
                      Tomorrow
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.quickDateTimeButton,
                      { backgroundColor: isDarkMode ? "#333" : "#F0F2F5" },
                    ]}
                    onPress={() => setQuickDateTime("week")}
                  >
                    <Text
                      style={[
                        styles.quickDateTimeText,
                        { color: isDarkMode ? "#FFF" : "#000" },
                      ]}
                    >
                      Next Week
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      color: isDarkMode ? "#FFF" : "#000",
                      backgroundColor: isDarkMode ? "#333" : "#F0F2F5",
                    },
                  ]}
                  placeholder="MM/DD/YYYY HH:MM AM/PM"
                  placeholderTextColor="#888"
                  value={tempDate}
                  onChangeText={setTempDate}
                />
                <TouchableOpacity
                  style={[
                    styles.doneButton,
                    { backgroundColor: isDarkMode ? "#FF29B2" : "#8E24AA" },
                  ]}
                  onPress={handleDateDone}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      )}
      {/* Image Viewer Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageViewerVisible}
        onRequestClose={() => setImageViewerVisible(false)}
      >
        <View style={styles.imageViewerBackdrop}>
          <TouchableOpacity
            style={styles.imageViewerCloseButton}
            onPress={() => setImageViewerVisible(false)}
          >
            <Ionicons name="close" size={32} color="#FFF" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage || "" }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CreatePostForm;
