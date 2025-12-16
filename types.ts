export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    CreatePost: undefined; // Add CreatePost route
};

export interface PostFormProps {
  isDarkMode: boolean;
  postContent: string;
  setPostContent: (text: string) => void;
  postImages: any[]; // Adjust type if you have a more specific image asset type
  handleImageSelect: (isSingle: boolean) => Promise<void>;
  removeImage: (index: number) => void;
  openImageViewer: (uri: string) => void;
  openTagModal: () => void;
  selectedFeeling: any; // Adjust type if you have a specific feeling object type
  setFeelingModalVisible: (visible: boolean) => void;
  taggedFriends: any[]; // Adjust type if you have a specific friend object type
  selectedLocation: string | null;
  setLocationModalVisible: (visible: boolean) => void;
}

export interface StoryFormProps {
  isDarkMode: boolean;
  postContent: string;
  setPostContent: (text: string) => void;
  postImages: any[]; // Adjust type if you have a more specific image asset type
  handleImageSelect: (isSingle: boolean) => Promise<void>;
}

export interface ActivityFormProps {
    isDarkMode: boolean;
    postContent: string;
    setPostContent: (text: string) => void;
    postImages: any[]; // Adjust type if you have a more specific image asset type
    handleImageSelect: (isSingle: boolean) => Promise<void>;
    removeImage: (index: number) => void;
    openImageViewer: (uri: string) => void;
    selectedActivity: any; // Adjust type if you have a specific activity object type
    setActivityModalVisible: (visible: boolean) => void;
    artistCredit: string;
    setArtistCredit: (text: string) => void;
    openTagModal: () => void;
    taggedFriends: any[]; // Adjust type if you have a specific friend object type
    selectedLocation: string | null;
    setLocationModalVisible: (visible: boolean) => void;
    setFeelingModalVisible: (visible: boolean) => void;
    selectedFeeling: any; // Adjust type if you have a specific feeling object type
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
  postImages: any[]; // Adjust type if you have a more specific image asset type
  handleImageSelect: (isSingle: boolean) => Promise<void>;
  selectedLocation: string | null;
  setLocationModalVisible: (visible: boolean) => void;
  setPostImages: (images: any[]) => void;
}

export interface CreatePostFormProps {
    onClose: () => void;
}

export interface UsePostHandlerProps {
  postType: string;
  postContent: string;
  postImages: any[];
  taggedFriends: any[];
  selectedLocation: string | null;
  selectedVisibility: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  selectedActivity: any;
  artistCredit: string;
  selectedFeeling: any;
  resetForm: () => void;
}