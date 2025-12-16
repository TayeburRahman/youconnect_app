import React from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StoryFormProps } from '../../types';
import styles from '../../styles/CreateScreen.styles';

const StoryForm: React.FC<StoryFormProps> = ({
  isDarkMode,
  postContent,
  setPostContent,
  postImages,
  handleImageSelect,
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.storyImagePicker}
        onPress={() => handleImageSelect(true)}
      >
        {postImages.length > 0 ? (
          <Image
            source={{ uri: postImages[0].uri }}
            style={styles.storyImage}
          />
        ) : (
          <>
            <Ionicons name="camera" size={60} color="#888" />
            <Text style={{ color: '#888', fontSize: 18, marginTop: 10 }}>
              Tap to add a photo/video
            </Text>
          </>
        )}
      </TouchableOpacity>
      <TextInput
        style={[styles.captionInput, { color: isDarkMode ? '#FFF' : '#000' }]}
        placeholder="Story Text (optional)"
        placeholderTextColor="#888"
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />
    </>
  );
};

export default StoryForm;
