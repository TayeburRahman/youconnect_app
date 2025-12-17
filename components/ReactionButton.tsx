import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReactionButtonProps } from "../types";

const { width } = Dimensions.get("window");

const reactions = [
  { name: "like", icon: "thumbs-up", color: "#1877F2" },
  { name: "love", icon: "heart", color: "#E0245E" },
  { name: "haha", icon: "happy", color: "#F7B125" },
  { name: "sad", icon: "sad-outline", color: "#FFB347" },
  { name: "angry", icon: "flame", color: "#E94135" },
] as const;

type ReactionName = (typeof reactions)[number]["name"];

const ReactionButton: React.FC<ReactionButtonProps> = ({
  reactionCounts,
  myReaction,
  onReact,
  isDarkMode,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Show modal with spring scale animation
  const showReactions = useCallback(() => {
    setModalVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  // Hide modal with fade-out scale down
  const hideReactions = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  }, [scaleAnim]);

  // Toggle reaction or remove if same tapped again
  const handleReactionPress = useCallback(
    (reactionName: ReactionName | null) => {
      if (reactionName === undefined) return;

      onReact(reactionName === myReaction ? null : reactionName);
      hideReactions();
    },
    [myReaction, onReact, hideReactions]
  );

  // Render all reaction icons inside the modal with scaling animation
  const renderReactionIcons = () => (
    <Animated.View
      style={[
        styles.reactionsContainer,
        { transform: [{ scale: scaleAnim }] },
        isDarkMode
          ? styles.reactionsContainerDark
          : styles.reactionsContainerLight,
      ]}
    >
      {reactions.map((reaction) => {
        const isSelected = reaction.name === myReaction;

        return (
          <TouchableOpacity
            key={reaction.name}
            activeOpacity={0.7}
            onPress={() => handleReactionPress(reaction.name)}
            style={[
              styles.reactionIconWrapper,
              isSelected && styles.selectedReactionWrapper,
            ]}
          >
            <Ionicons
              name={reaction.icon as any}
              size={28}
              color={reaction.color}
              style={
                isSelected ? styles.selectedReactionIcon : styles.reactionIcon
              }
            />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );

  // Default reaction info when none selected
  const currentReaction = reactions.find((r) => r.name === myReaction);
  const defaultIcon = myReaction ? currentReaction?.icon : "thumbs-up";
  const defaultColor = myReaction
    ? currentReaction?.color
    : isDarkMode
      ? "#AAA"
      : "#888";
  const defaultText = myReaction
    ? myReaction.charAt(0).toUpperCase() + myReaction.slice(1)
    : "Like";

  // Total reactions count (sum all counts)
  const totalReactions = Object.values(reactionCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <View>
      {/* Reaction button: tap to toggle like/unlike, long press to open modal */}
      <TouchableOpacity
        onPress={myReaction ? () => handleReactionPress(null) : showReactions}
        onLongPress={showReactions}
        delayLongPress={200}
        activeOpacity={0.7}
        style={styles.buttonContainer}
      >
        <Ionicons name={defaultIcon as any} size={20} color={defaultColor} />
        <Text
          style={[styles.buttonText, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          {defaultText}
        </Text>
        {totalReactions > 0 && (
          <View style={styles.countBadge}>
            <Text
              style={[
                styles.reactionCount,
                { color: isDarkMode ? "#FFF" : "#000" },
              ]}
            >
              {totalReactions}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal for reactions selection */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={hideReactions}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={hideReactions}
        >
          <View style={styles.reactionsModalWrapper}>
            {renderReactionIcons()}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
    backgroundColor: "transparent",
  },
  buttonText: {
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 16,
  },
  countBadge: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  reactionCount: {
    fontSize: 12,
    fontWeight: "700",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  reactionsModalWrapper: {
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FFF",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 7,
  },
  reactionsContainerLight: {
    backgroundColor: "#FFF",
  },
  reactionsContainerDark: {
    backgroundColor: "#222",
  },
  reactionIconWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },
  selectedReactionWrapper: {
    backgroundColor: "#D1D1D6", // iOS system gray 4, softer highlight
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  reactionIcon: {
    backgroundColor: "transparent",
  },
  selectedReactionIcon: {
    transform: [{ scale: 1.3 }],
  },
});

export default ReactionButton;
