import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle; // Optional custom button style
  textStyle?: TextStyle;    // Optional custom text style
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // Default styles, can be overridden by buttonStyle
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    // Default text styles, can be overridden by textStyle
  },
});