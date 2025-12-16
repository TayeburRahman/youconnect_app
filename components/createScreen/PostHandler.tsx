import { useCallback } from "react";

interface UsePostHandlerProps {
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

const usePostHandler = ({
  postType,
  postContent,
  postImages,
  taggedFriends,
  selectedLocation,
  selectedVisibility,
  eventName,
  eventStartDate,
  eventEndDate,
  selectedActivity,
  artistCredit,
  selectedFeeling,
  resetForm,
}: UsePostHandlerProps) => {
  const handlePostSubmit = useCallback(() => {
    let postData: any = {
      postType,
      selectedVisibility,
    };

    if (postType === "Post") {
      postData.postContent = postContent;
      postData.postImages = postImages;
      postData.selectedFeeling = selectedFeeling;
      postData.taggedFriends = taggedFriends;
      postData.selectedLocation = selectedLocation;
    } else if (postType === "Event") {
      postData.eventName = eventName;
      postData.eventStartDate = eventStartDate;
      postData.eventEndDate = eventEndDate;
      postData.eventDescription = postContent;
      postData.coverImage = postImages.length > 0 ? postImages[0].uri : null;
      postData.selectedLocation = selectedLocation;
    } else if (postType === "Story") {
      postData.storyText = postContent; // Using postContent for story text
      postData.storyImage = postImages.length > 0 ? postImages[0].uri : null;
    } else if (postType === "Activity") {
      postData.selectedActivity = selectedActivity;
      if (selectedActivity?.name === "Creating art") {
        postData.artistCredit = artistCredit;
      }
      postData.postContent = postContent; // Using postContent for activity description
      postData.postImages = postImages;
      postData.taggedFriends = taggedFriends;
      postData.selectedLocation = selectedLocation;
      postData.selectedFeeling = selectedFeeling;
    }

    console.log("New Post Created:", postData);
    resetForm();
  }, [
    postType,
    postContent,
    postImages,
    taggedFriends,
    selectedLocation,
    selectedVisibility,
    eventName,
    eventStartDate,
    eventEndDate,
    selectedActivity,
    artistCredit,
    selectedFeeling,
    resetForm,
  ]);

  return { handlePostSubmit };
};

export default usePostHandler;
