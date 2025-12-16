export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    MainTabNavigator: undefined; // New: This will be our BottomTabNavigator
};

export type RootTabParamList = {
    Home: undefined;
    CreatePost: undefined;
    Search: undefined; // New: Search tab
    Profile: undefined; // New: Profile tab
    // Add other screens you want in the bottom tab here
};

// Existing form props
export interface PostFormProps {
  isDarkMode: boolean;
  postContent: string;
  setPostContent: (text: string) => void;
  postImages: Image[];
  handleImageSelect: (isSingle: boolean) => Promise<void>;
  removeImage: (index: number) => void;
  openImageViewer: (uri: string) => void;
  openTagModal: () => void;
  selectedFeeling: Feeling | null;
  setFeelingModalVisible: (visible: boolean) => void;
  taggedFriends: User[];
  selectedLocation: string | null;
  setLocationModalVisible: (visible: boolean) => void;
}

export interface StoryFormProps {
  isDarkMode: boolean;
  postContent: string;
  setPostContent: (text: string) => void;
  postImages: Image[];
  handleImageSelect: (isSingle: boolean) => Promise<void>;
}

export interface ActivityFormProps {
    isDarkMode: boolean;
    postContent: string;
    setPostContent: (text: string) => void;
    postImages: Image[];
    handleImageSelect: (isSingle: boolean) => Promise<void>;
    removeImage: (index: number) => void;
    openImageViewer: (uri: string) => void;
    selectedActivity: ActivityType | null;
    setActivityModalVisible: (visible: boolean) => void;
    artistCredit: string;
    setArtistCredit: (text: string) => void;
    openTagModal: () => void;
    taggedFriends: User[];
    selectedLocation: string | null;
    setLocationModalVisible: (visible: boolean) => void;
    setFeelingModalVisible: (visible: boolean) => void;
    selectedFeeling: Feeling | null;
}

export interface EventFormProps {
  isDarkMode: boolean;
  eventName: string;
  setEventName: (text: string) => void;
  postContent: string;
  setPostContent: (text: string) => void;
  eventStartDate: string;
  showDatePicker: (isStart: boolean) => void;
  eventEndDate: string;
  postImages: Image[];
  handleImageSelect: (isSingle: boolean) => Promise<void>;
  selectedLocation: string | null;
  setLocationModalVisible: (visible: boolean) => void;
  setPostImages: (images: Image[]) => void;
}

export interface CreatePostFormProps {
    onClose: () => void;
}

export interface UsePostHandlerProps {
  postType: string;
  postContent: string;
  postImages: Image[];
  taggedFriends: User[];
  selectedLocation: string | null;
  selectedVisibility: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  selectedActivity: ActivityType | null;
  artistCredit: string;
  selectedFeeling: Feeling | null;
  resetForm: () => void;
}

// New interfaces for PostCard and ReactionButton
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Image {
  uri: string;
  width?: number;
  height?: number;
  // Add other properties if needed
}

export interface Feeling {
  icon: string;
  name: string;
}

export interface ActivityType {
  name: string;
  icon: string;
}

export interface PostBase {
  id: string;
  author: User;
  timestamp: string;
  selectedVisibility: "Public" | "Friends" | "Only Me";
  commentCount: number;
  reactionCounts: {
    like: number;
    love: number;
    haha: number;
    sad: number;
    angry: number;
  };
  myReaction?: "like" | "love" | "haha" | "sad" | "angry" | null;
}

export interface PostData extends PostBase {
  postType: "Post";
  postContent: string;
  postImages: Image[];
  selectedFeeling?: Feeling;
  taggedFriends?: User[];
  selectedLocation?: string;
}

export interface EventData extends PostBase {
  postType: "Event";
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventDescription: string;
  coverImage?: Image;
  selectedLocation?: string;
}

export interface StoryData extends PostBase {
  postType: "Story";
  storyText: string;
  storyImage?: Image;
}

export interface ActivityData extends PostBase {
  postType: "Activity";
  selectedActivity: ActivityType;
  artistCredit?: string;
  postContent: string;
  postImages?: Image[];
  taggedFriends?: User[];
  selectedLocation?: string;
  selectedFeeling?: Feeling;
}

export type PostItem = PostData | EventData | StoryData | ActivityData;

export interface PostCardProps {
  post: PostItem;
  isDarkMode: boolean;
}

export interface ReactionButtonProps {
  reactionCounts: {
    like: number;
    love: number;
    haha: number;
    sad: number;
    angry: number;
  };
  myReaction: "like" | "love" | "haha" | "sad" | "angry" | null;
  onReact: (reaction: "like" | "love" | "haha" | "sad" | "angry" | null) => void;
  isDarkMode: boolean;
}

// New types for SearchScreen
export interface SearchUserItem {
  id: string | number;
  username: string;
  avatarUri: string;
}

export interface SearchHashtagItem {
  id: string | number;
  hashtag: string;
}

export interface SearchPostItem {
  id: string | number;
  username: string;
  caption: string;
  imageUri: string;
}

export interface SearchEventItem {
  id: string | number;
  eventName: string;
  date: string;
  location: string;
}

export type SearchItem = SearchUserItem | SearchHashtagItem | SearchPostItem | SearchEventItem;