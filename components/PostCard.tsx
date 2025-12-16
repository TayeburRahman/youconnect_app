import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PostCardProps, PostItem, PostData, EventData, StoryData, ActivityData } from '../types';
import ReactionButton from './ReactionButton'; // Import ReactionButton
import styles from '../styles/HomeScreen.styles'; // Import styles for PostCard

const { width } = Dimensions.get('window');

const PostCard: React.FC<PostCardProps> = ({ post, isDarkMode }) => {
  const renderPostContent = (item: PostItem) => {
    switch (item.postType) {
      case 'Post':
        const postItem = item as PostData;
        return (
          <View>
            <Text style={[styles.postText, { color: isDarkMode ? '#FFF' : '#000' }]}>{postItem.postContent}</Text>
            {postItem.selectedFeeling && (
              <Text style={[styles.postFeeling, { color: isDarkMode ? '#CCC' : '#555' }]}>
                is feeling {postItem.selectedFeeling.icon} {postItem.selectedFeeling.name}
              </Text>
            )}
            {postItem.postImages && postItem.postImages.length > 0 && (
              <View style={styles.postImageGrid}>
                {postItem.postImages.map((img, index) => (
                  <Image key={index} source={{ uri: img.uri }} style={styles.postImage} />
                ))}
              </View>
            )}
            {postItem.taggedFriends && postItem.taggedFriends.length > 0 && (
              <Text style={[styles.postTags, { color: isDarkMode ? '#CCC' : '#555' }]}>
                — with {postItem.taggedFriends.map(f => f.name).join(', ')}
              </Text>
            )}
            {postItem.selectedLocation && (
              <Text style={[styles.postLocation, { color: isDarkMode ? '#CCC' : '#555' }]}>
                at {postItem.selectedLocation}
              </Text>
            )}
          </View>
        );
      case 'Event':
        const eventItem = item as EventData;
        return (
          <View>
            <Text style={[styles.eventTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>{eventItem.eventName}</Text>
            <Text style={[styles.eventDescription, { color: isDarkMode ? '#CCC' : '#000' }]}>{eventItem.eventDescription}</Text>
            {eventItem.coverImage && (
              <Image source={{ uri: eventItem.coverImage.uri }} style={styles.eventCoverImage} />
            )}
            <Text style={[styles.eventDateTime, { color: isDarkMode ? '#AAA' : '#555' }]}>
              {eventItem.eventStartDate} - {eventItem.eventEndDate}
            </Text>
            {eventItem.selectedLocation && (
              <Text style={[styles.eventLocation, { color: isDarkMode ? '#AAA' : '#555' }]}>
                <Ionicons name="location" size={14} color={isDarkMode ? '#AAA' : '#555'} /> {eventItem.selectedLocation}
              </Text>
            )}
          </View>
        );
      case 'Story':
        const storyItem = item as StoryData;
        return (
          <View>
            {storyItem.storyImage && (
              <Image source={{ uri: storyItem.storyImage.uri }} style={styles.storyImage} />
            )}
            <Text style={[styles.storyText, { color: isDarkMode ? '#FFF' : '#000' }]}>{storyItem.storyText}</Text>
          </View>
        );
      case 'Activity':
        const activityItem = item as ActivityData;
        return (
          <View>
            <Text style={[styles.activityHeader, { color: isDarkMode ? '#FFF' : '#000' }]}>
              {activityItem.author.name} is {activityItem.selectedActivity.icon} {activityItem.selectedActivity.name}
            </Text>
            {activityItem.postContent && (
              <Text style={[styles.postText, { color: isDarkMode ? '#FFF' : '#000' }]}>{activityItem.postContent}</Text>
            )}
            {activityItem.artistCredit && (
              <Text style={[styles.artistCredit, { color: isDarkMode ? '#CCC' : '#555' }]}>
                (Credit: {activityItem.artistCredit})
              </Text>
            )}
            {activityItem.postImages && activityItem.postImages.length > 0 && (
              <View style={styles.postImageGrid}>
                {activityItem.postImages.map((img, index) => (
                  <Image key={index} source={{ uri: img.uri }} style={styles.postImage} />
                ))}
              </View>
            )}
            {activityItem.taggedFriends && activityItem.taggedFriends.length > 0 && (
              <Text style={[styles.postTags, { color: isDarkMode ? '#CCC' : '#555' }]}>
                — with {activityItem.taggedFriends.map(f => f.name).join(', ')}
              </Text>
            )}
            {activityItem.selectedLocation && (
              <Text style={[styles.postLocation, { color: isDarkMode ? '#CCC' : '#555' }]}>
                at {activityItem.selectedLocation}
              </Text>
            )}
            {activityItem.selectedFeeling && (
              <Text style={[styles.postFeeling, { color: isDarkMode ? '#CCC' : '#555' }]}>
                is feeling {activityItem.selectedFeeling.icon} {activityItem.selectedFeeling.name}
              </Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  const [myReaction, setMyReaction] = React.useState<typeof post.myReaction>(post.myReaction || null);

  const handleReact = (reaction: typeof myReaction) => {
    setMyReaction(reaction);
    // Here you would typically send this reaction to a backend
    console.log(`User reacted with ${reaction} to post ${post.id}`);
  };

  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' }]}>
      {/* Post Header */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
        <View>
          <Text style={[styles.authorName, { color: isDarkMode ? '#FFF' : '#000' }]}>{post.author.name}</Text>
          <View style={styles.postInfo}>
            <Text style={[styles.timestamp, { color: isDarkMode ? '#AAA' : '#555' }]}>{post.timestamp}</Text>
            <Ionicons name="earth" size={12} color={isDarkMode ? '#AAA' : '#555'} style={styles.visibilityIcon} />
            <Text style={[styles.visibility, { color: isDarkMode ? '#AAA' : '#555' }]}>{post.selectedVisibility}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.cardContent}>
        {renderPostContent(post)}
      </View>

      {/* Reactions and Comments */}
      <View style={styles.cardActions}>
        <ReactionButton
          reactionCounts={post.reactionCounts}
          myReaction={myReaction}
          onReact={handleReact}
          isDarkMode={isDarkMode}
        />
        <TouchableOpacity style={styles.commentButton}>
          <Ionicons name="chatbubble-outline" size={20} color={isDarkMode ? '#AAA' : '#555'} />
          <Text style={[styles.commentCount, { color: isDarkMode ? '#AAA' : '#555' }]}>
            {post.commentCount > 0 ? `${post.commentCount} Comments` : 'Comment'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCard;
