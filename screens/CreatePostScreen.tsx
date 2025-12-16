import React from "react";
import CreatePostForm from "../components/createScreen/CreatePostForm";
import { RootStackParamList } from "../types";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles/CreateScreen.styles";

const CreatePostScreen: React.FC<any> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
      <CreatePostForm onClose={handleClose} />
    </View>
  );
};

export default CreatePostScreen;
