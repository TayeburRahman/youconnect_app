import React, { useState, useCallback, useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

import ReactionButton from "./ReactionButton";
import FeelingBadge from "./FeelingBadge"; // Import FeelingBadge

import {
  PostCardProps,
  PostItem,
  PostData,
  EventData,
  StoryData,
  ActivityData,
} from "../types";
import styles from "../styles/HomeScreen.styles";

/** Type guard for posts that support feelings */
const hasFeeling = (item: PostItem): item is PostData | ActivityData => {
  return (
    "selectedFeeling" in item &&
    item.selectedFeeling !== null &&
    item.selectedFeeling !== undefined
  );
};

const PostCard: React.FC<PostCardProps> = ({ post, isDarkMode }) => {
  const [myReaction, setMyReaction] = useState<typeof post.myReaction>(
    post.myReaction ?? null
  );

  const handleReact = useCallback(
    (reaction: typeof myReaction) => {
      setMyReaction(reaction);
      console.log(`User reacted with ${reaction} to post ${post.id}`);
    },
    [post.id]
  );

  const feeling = useMemo(() => {
    return hasFeeling(post) ? post.selectedFeeling : null;
  }, [post]);

  const renderPostContent = (item: PostItem) => {
    switch (item.postType) {
      case "Post":
        const postItem = item as PostData;
        return (
          <View>
            <Text
              style={[styles.postText, { color: isDarkMode ? "#FFF" : "#000" }]}
            >
              {postItem.postContent}
            </Text>

            {/* Single Image */}
            {postItem.postImages?.length === 1 && (
              <Image
                source={{ uri: postItem.postImages[0].uri }}
                style={styles.singlePostImage}
              />
            )}

            {/* Multiple Images */}
            {postItem.postImages && postItem.postImages.length > 1 && (
              <View style={styles.postImageGrid}>
                {postItem.postImages.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img.uri }}
                    style={styles.postImage}
                  />
                ))}
              </View>
            )}

            {/* Tagged Friends */}
            {!!postItem.taggedFriends?.length && (
              <Text
                style={[
                  styles.postTags,
                  { color: isDarkMode ? "#CCC" : "#555" },
                ]}
              >
                — with {postItem.taggedFriends.map((f) => f.name).join(", ")}
              </Text>
            )}

            {/* Location */}
            {postItem.selectedLocation && (
              <Text
                style={[
                  styles.postLocation,
                  { color: isDarkMode ? "#CCC" : "#555" },
                ]}
              >
                at {postItem.selectedLocation}
              </Text>
            )}
          </View>
        );

      case "Event":
        const eventItem = item as EventData;
        return (
          <View>
            <Text
              style={[
                styles.eventTitle,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {eventItem.eventName}
            </Text>
            <Text
              style={[
                styles.eventDescription,
                { color: isDarkMode ? "#CCC" : "#000" },
              ]}
            >
              {eventItem.eventDescription}
            </Text>
            {eventItem.coverImage && (
              <Image
                source={{ uri: eventItem.coverImage.uri }}
                style={styles.eventCoverImage}
              />
            )}
          </View>
        );

      case "Story":
        const storyItem = item as StoryData;
        return (
          <View>
            {storyItem.storyImage && (
              <Image
                source={{ uri: storyItem.storyImage.uri }}
                style={styles.storyImage}
              />
            )}
            <Text
              style={[
                styles.storyText,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {storyItem.storyText}
            </Text>
          </View>
        );

      case "Activity":
        const activityItem = item as ActivityData;
        return (
          <View>
            <Text
              style={[styles.postText, { color: isDarkMode ? "#FFF" : "#000" }]}
            >
              {activityItem.postContent}
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? "#1C1C1E" : "#FFF" },
      ]}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: post.author.avatar }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.authorName,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {post.author.name}
            </Text>

            {/* Feeling Badge */}
            {feeling && (
              <FeelingBadge
                feelingIcon={feeling.icon}
                feelingName={feeling.name}
              />
            )}
          </View>

          <View style={styles.postInfo}>
            <Text
              style={[
                styles.timestamp,
                { color: isDarkMode ? "#AAA" : "#555" },
              ]}
            >
              {post.timestamp}
            </Text>
            <Ionicons
              name="earth"
              size={12}
              color={isDarkMode ? "#AAA" : "#555"}
              style={styles.visibilityIcon}
            />
            <Text
              style={[
                styles.visibility,
                { color: isDarkMode ? "#AAA" : "#555" },
              ]}
            >
              {post.selectedVisibility}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton}>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={isDarkMode ? "#FFF" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.cardContent}>{renderPostContent(post)}</View>

      {/* Actions */}
      <View style={styles.cardActions}>
        <ReactionButton
          reactionCounts={post.reactionCounts}
          myReaction={myReaction}
          onReact={handleReact}
          isDarkMode={isDarkMode}
        />
        <TouchableOpacity style={styles.commentButton}>
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={isDarkMode ? "#AAA" : "#555"}
          />
          <Text
            style={[
              styles.commentCount,
              { color: isDarkMode ? "#AAA" : "#555" },
            ]}
          >
            {post.commentCount > 0
              ? `${post.commentCount} Comments`
              : "Comment"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCard;
