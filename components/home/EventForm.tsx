import React from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventFormProps } from '../../types';
import styles from '../../styles/CreateScreen.styles';

const EventForm: React.FC<EventFormProps> = ({
  isDarkMode,
  eventName,
  setEventName,
  postContent,
  setPostContent,
  eventStartDate,
  showDatePicker,
  eventEndDate,
  postImages,
  handleImageSelect,
  selectedLocation,
  setLocationModalVisible,
  setPostImages,
}) => {
  return (
    <>
      <TextInput
        style={[
          styles.inputField,
          {
            color: isDarkMode ? '#FFF' : '#000',
            backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
          },
        ]}
        placeholder="Event Name"
        placeholderTextColor="#888"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={[styles.captionInput, { color: isDarkMode ? '#FFF' : '#000' }]}
        placeholder="Event Description"
        placeholderTextColor="#888"
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={[
            styles.datePickerButton,
            { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
          ]}
          onPress={() => showDatePicker(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color={isDarkMode ? '#FFF' : '#000'}
          />
          <Text
            style={[
              styles.datePickerText,
              { color: isDarkMode ? '#FFF' : '#000' },
            ]}
          >
            {eventStartDate || 'Start Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.datePickerButton,
            { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
          ]}
          onPress={() => showDatePicker(false)}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color={isDarkMode ? '#FFF' : '#000'}
          />
          <Text
            style={[
              styles.datePickerText,
              { color: isDarkMode ? '#FFF' : '#000' },
            ]}
          >
            {eventEndDate || 'End Date'}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.smallImageContainer,
          { marginTop: 10, marginBottom: 10 },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.smallImageButton,
            { borderColor: isDarkMode ? '#555' : '#CCC' },
          ]}
          onPress={() => handleImageSelect(true)}
        >
          {postImages.length > 0 ? (
            <Image
              source={{ uri: postImages[0].uri }}
              style={styles.smallImagePreview}
            />
          ) : (
            <Ionicons name="camera" size={24} color="#888" />
          )}
        </TouchableOpacity>
        {postImages.length > 0 && (
          <TouchableOpacity
            style={styles.removeSmallImageButton}
            onPress={() => setPostImages([])}
          >
            <Ionicons name="close-circle" size={20} color="#000" />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.actionText,
            { color: isDarkMode ? '#FFF' : '#000', marginLeft: 10 },
          ]}
        >
          Add Cover Image
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
            justifyContent: 'flex-start',
            marginVertical: 10,
          },
        ]}
        onPress={() => setLocationModalVisible(true)}
      >
        <Ionicons name="location" size={24} color="#F55752" />
        <Text
          style={[styles.actionText, { color: isDarkMode ? '#FFF' : '#000' }]}
          numberOfLines={1}
        >
          {selectedLocation || 'Add Location'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default EventForm;