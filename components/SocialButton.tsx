import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface SocialButtonProps {
  provider: 'google' | 'apple' | 'facebook';
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onPress, style, textStyle }) => {
  const { isDarkMode } = useTheme();

  let iconName: any;
  let buttonText: string;
  let iconColor: string;
  let backgroundColor: string;
  let textColor: string;

  switch (provider) {
    case 'google':
      iconName = 'logo-google';
      buttonText = 'Continue with Google';
      iconColor = '#DB4437'; // Google Red
      backgroundColor = isDarkMode ? '#282828' : '#FFFFFF';
      textColor = isDarkMode ? '#FFFFFF' : '#000000';
      break;
    case 'apple':
      iconName = 'logo-apple';
      buttonText = 'Continue with Apple';
      iconColor = isDarkMode ? '#FFFFFF' : '#000000'; // Apple icon is black on light, white on dark
      backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';
      textColor = isDarkMode ? '#FFFFFF' : '#000000';
      break;
    case 'facebook':
      iconName = 'logo-facebook';
      buttonText = 'Continue with Facebook';
      iconColor = '#4267B2'; // Facebook Blue
      backgroundColor = isDarkMode ? '#282828' : '#FFFFFF';
      textColor = isDarkMode ? '#FFFFFF' : '#000000';
      break;
    default:
      iconName = 'help-circle';
      buttonText = 'Continue';
      iconColor = isDarkMode ? '#FFFFFF' : '#000000';
      backgroundColor = isDarkMode ? '#282828' : '#FFFFFF';
      textColor = isDarkMode ? '#FFFFFF' : '#000000';
  }

  return (
    <TouchableOpacity
      style={[
        styles.socialButton,
        { backgroundColor: backgroundColor, borderColor: isDarkMode ? '#333' : '#DDD' },
        style,
      ]}
      onPress={onPress}
    >
      <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
      <Text style={[styles.socialButtonText, { color: textColor }, textStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    // Removed width: '100%' to allow flex sizing from parent
    marginBottom: 10,
    marginHorizontal: 5, // Added default horizontal margin for spacing
  },
  icon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SocialButton;