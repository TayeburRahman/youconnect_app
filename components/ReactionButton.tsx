import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReactionButtonProps } from '../types';

const { width } = Dimensions.get('window');

const reactions = [
  { name: 'like', icon: 'thumbs-up', color: '#007AFF' },
  { name: 'love', icon: 'heart', color: '#FF3B30' },
  { name: 'haha', icon: 'happy', color: '#FFD60A' },
  { name: 'sad', icon: 'sad', color: '#5AC8FA' },
  { name: 'angry', icon: 'sad', color: '#FF2D55' }, // Using 'sad' icon for angry as well, no direct angry icon in Ionicons
];

const ReactionButton: React.FC<ReactionButtonProps> = ({ reactionCounts, myReaction, onReact, isDarkMode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const showReactions = () => {
    setModalVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
    }).start();
  };

  const hideReactions = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleReactionPress = (reactionName: typeof myReaction) => {
    onReact(reactionName === myReaction ? null : reactionName); // Toggle reaction
    hideReactions();
  };

  const renderReactionIcons = () => (
    <Animated.View style={[
      styles.reactionsContainer,
      { transform: [{ scale: scaleAnim }] },
      isDarkMode ? styles.reactionsContainerDark : styles.reactionsContainerLight,
    ]}>
      {reactions.map((reaction) => (
        <TouchableOpacity
          key={reaction.name}
          onPress={() => handleReactionPress(reaction.name as any)}
          style={styles.reactionIconWrapper}
        >
          <Ionicons
            name={reaction.icon as any}
            size={24}
            color={reaction.color}
            style={reaction.name === myReaction ? styles.selectedReaction : {}}
          />
        </TouchableOpacity>
      ))}
    </Animated.View>
  );

  const currentReaction = reactions.find(r => r.name === myReaction);
  const defaultIcon = myReaction ? currentReaction?.icon : 'thumbs-up';
  const defaultColor = myReaction ? currentReaction?.color : (isDarkMode ? '#AAA' : '#888');
  const defaultText = myReaction ? myReaction.charAt(0).toUpperCase() + myReaction.slice(1) : 'Like';

  const totalReactions = Object.values(reactionCounts).reduce((sum, count) => sum + count, 0);

  return (
    <View>
      <TouchableOpacity
        onPress={myReaction ? () => handleReactionPress(null) : showReactions} // Tap to unlike, long press to show options
        onLongPress={showReactions}
        delayLongPress={200}
        style={styles.buttonContainer}
      >
        <Ionicons name={defaultIcon as any} size={20} color={defaultColor} />
        <Text style={[styles.buttonText, { color: isDarkMode ? '#FFF' : '#000' }]}>
          {defaultText}
        </Text>
        {totalReactions > 0 && (
          <Text style={[styles.reactionCount, { color: isDarkMode ? '#AAA' : '#666' }]}>
            {totalReactions}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    marginLeft: 5,
    fontWeight: '600',
  },
  reactionCount: {
    marginLeft: 8,
    fontSize: 12,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  reactionsModalWrapper: {
    position: 'absolute',
    bottom: 80, // Adjust based on bottom tab navigator height
  },
  reactionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactionsContainerLight: {
    backgroundColor: '#FFF',
  },
  reactionsContainerDark: {
    backgroundColor: '#333',
  },
  reactionIconWrapper: {
    paddingHorizontal: 5,
  },
  selectedReaction: {
    borderWidth: 1,
    borderColor: 'white', // Highlight selected reaction
    borderRadius: 15,
    padding: 2,
  },
});

export default ReactionButton;
