import React from 'react';
import CreatePostForm from '../components/home/CreatePostForm';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CreatePostScreenProps = StackScreenProps<RootStackParamList, 'CreatePost'>;

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  return <CreatePostForm onClose={handleClose} />;
};

export default CreatePostScreen;