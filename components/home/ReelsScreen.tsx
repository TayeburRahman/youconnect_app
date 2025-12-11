// screens/ReelsScreen.tsx
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";

const { height } = Dimensions.get("window");

type Reel = {
  id: string;
  user: string;
  avatar: string;
  media: string;
  caption: string;
  likes: number;
  comments: number;
};

const demoReels: Reel[] = [
  {
    id: "1",
    user: "Rayhan",
    avatar: "https://i.pravatar.cc/150?img=12",
    media: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    caption: "Chilling in neon vibes ✨",
    likes: 1200,
    comments: 80,
  },
  {
    id: "2",
    user: "Sanjida",
    avatar: "https://i.pravatar.cc/150?img=45",
    media: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    caption: "AI generated fun 🎨",
    likes: 950,
    comments: 50,
  },
];

const ReelsScreen: React.FC = () => {
  const videoRefs = useRef<Array<Video | null>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  };

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };

  const renderItem = ({ item, index }: { item: Reel; index: number }) => (
    <View style={{ height, justifyContent: "flex-end" }}>
      <Video
        ref={(ref) => {
          videoRefs.current[index] = ref;
        }}
        source={{ uri: item.media }}
        style={{ width: "100%", height }}
        resizeMode={ResizeMode.COVER}
        shouldPlay={currentIndex === index}
        isLooping
      />
      {/* Overlay info */}
      <View
        style={{
          position: "absolute",
          bottom: 60,
          left: 16,
          right: 16,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
          {item.user}
        </Text>
        <Text style={{ color: "#fff", fontSize: 14, marginTop: 4 }}>
          {item.caption}
        </Text>
      </View>

      {/* Actions */}
      <View
        style={{
          position: "absolute",
          bottom: 60,
          right: 16,
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ marginBottom: 20 }}>
          <Text style={{ color: "#FF29B2", fontSize: 24 }}>
            ❤️ {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 20 }}>
          <Text style={{ color: "#FF29B2", fontSize: 24 }}>
            💬 {item.comments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 20 }}>
          <Text style={{ color: "#FF29B2", fontSize: 24 }}>🔁</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#FF29B2", fontSize: 24 }}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <FlatList
        data={demoReels}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
};

export default ReelsScreen;
