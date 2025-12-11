// screens/CreateScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../styles/CreateScreen.styles";
import { LinearGradient } from "expo-linear-gradient";

const demoAISuggestions = [
  "#NeonVibes",
  "#CyberLife",
  "#AIContent",
  "#GenZMood",
  "#ReelsTime",
];

const CreateScreen: React.FC = () => {
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  // Pick image or video from gallery
  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
    }
  };

  // Add/Remove hashtag
  const toggleHashtag = (tag: string) => {
    if (selectedHashtags.includes(tag)) {
      setSelectedHashtags(selectedHashtags.filter((t) => t !== tag));
    } else {
      setSelectedHashtags([...selectedHashtags, tag]);
    }
  };

  // Post Handler
  const handlePost = () => {
    console.log("Posting:", { mediaUri, caption, selectedHashtags });
    // TODO: Connect to backend
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Post</Text>
          <TouchableOpacity onPress={handlePost}>
            <Text style={styles.headerBtn}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Media Preview */}
        <TouchableOpacity style={styles.mediaPreview} onPress={pickMedia}>
          {mediaUri ? (
            <Image
              source={{ uri: mediaUri }}
              style={{ width: "100%", height: "100%", borderRadius: 16 }}
            />
          ) : (
            <Text style={styles.mediaText}>Tap to add photo or video</Text>
          )}
        </TouchableOpacity>

        {/* Caption Input */}
        <TextInput
          placeholder="Write a caption..."
          placeholderTextColor="#888"
          style={styles.captionInput}
          multiline
          value={caption}
          onChangeText={setCaption}
        />

        {/* AI Hashtag Suggestions */}
        <View style={styles.aiSuggestionsContainer}>
          <Text
            style={{ color: "#FF29B2", fontWeight: "700", marginBottom: 8 }}
          >
            AI Suggestions
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {demoAISuggestions.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => toggleHashtag(tag)}
                style={[
                  styles.aiSuggestionTag,
                  selectedHashtags.includes(tag) && {
                    backgroundColor: "#FF29B2",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.aiSuggestionText,
                    selectedHashtags.includes(tag) && { color: "#fff" },
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateScreen;
