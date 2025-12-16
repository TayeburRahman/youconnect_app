import React from "react";
import CreatePostForm from "../components/createScreen/CreatePostForm";
import { RootStackParamList } from "../types";

const CreatePostScreen: React.FC<any> = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  return <CreatePostForm onClose={handleClose} />;
};

export default CreatePostScreen;
