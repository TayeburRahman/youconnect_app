import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { RootStackParamList } from "../types";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles/RegisterScreen.styles";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [coverImage, setCoverImage] = useState<any>(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media is required!");
    }
  };

  const pickImage = async (type: "profile" | "cover") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "profile" ? [4, 4] : [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "profile") {
        setProfileImage(result.assets[0].uri);
      } else if (type === "cover") {
        setCoverImage(result.assets[0].uri);
      }
    }
  };

  const handleDateConfirm = (date: Date) => {
    setBirthday(date);
    setDatePickerVisible(false);
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration Data:", {
      fullName,
      username,
      email,
      phoneNumber,
      birthday,
      profileImage,
      coverImage,
      password,
    });
    navigation.navigate("MainTabNavigator"); // Navigate to the main screen after successful registration
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ["#0A0A0F", "#1A1A1A"] : ["#F4F5F7", "#FFFFFF"]}
      style={styles.fullScreenGradient}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text
              style={[styles.title, { color: isDarkMode ? "#FFF" : "#111827" }]}
            >
              Create Account
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDarkMode ? "#9CA3AF" : "#6B7280" },
              ]}
            >
              Join our community and get started!
            </Text>
          </View>

          {/* FORM CARD */}
          <View
            style={[
              styles.form,
              {
                backgroundColor: isDarkMode
                  ? "rgba(28,28,30,0.97)"
                  : "rgba(255,255,255,0.97)",
              },
            ]}
          >
            {/* Cover Image */}
            <TouchableOpacity
              onPress={() => pickImage("cover")}
              style={styles.coverImageContainer}
            >
              {coverImage ? (
                <Image source={{ uri: coverImage }} style={styles.coverImage} />
              ) : (
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color={isDarkMode ? "#FFF" : "#000"}
                />
              )}
            </TouchableOpacity>

            {/* Profile Image on Cover */}
            <TouchableOpacity
              onPress={() => pickImage("profile")}
              style={styles.profileImageContainer}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color={isDarkMode ? "#FFF" : "#000"}
                />
              )}
            </TouchableOpacity>

            {/* Full Name */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.leftIcon}
              />
              <CustomInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                isDarkMode={isDarkMode}
                style={{ paddingLeft: 50 }}
              />
            </View>

            {/* Username */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-circle-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.leftIcon}
              />
              <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                isDarkMode={isDarkMode}
                style={{ paddingLeft: 50 }}
              />
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.leftIcon}
              />
              <CustomInput
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                style={{ paddingLeft: 50 }}
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.leftIcon}
              />
              <CustomInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                isDarkMode={isDarkMode}
                style={{ paddingLeft: 50 }}
              />
            </View>

            {/* Birthday */}
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? "transparent" : "transparent",
                  justifyContent: "center",
                },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.dateIcon}
              />
              <Text style={{ color: isDarkMode ? "#929292ff" : "#646464ff" }}>
                {birthday ? birthday.toLocaleDateString() : "Select Birthday"}
              </Text>
            </TouchableOpacity>

            {/* Date Picker Modal */}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisible(false)}
            />

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.leftIcon}
              />
              <CustomInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={securePassword}
                isDarkMode={isDarkMode}
                style={{ paddingLeft: 50, paddingRight: 50 }}
              />
              <TouchableOpacity
                onPress={() => setSecurePassword(!securePassword)}
                style={styles.rightIcon}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={securePassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.leftIcon}
              />
              <CustomInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={secureConfirmPassword}
                isDarkMode={isDarkMode}
                style={{ paddingLeft: 50, paddingRight: 50 }}
              />
              <TouchableOpacity
                onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
                style={styles.rightIcon}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    secureConfirmPassword ? "eye-off-outline" : "eye-outline"
                  }
                  size={22}
                  color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                />
              </TouchableOpacity>
            </View>

            <CustomButton
              title="Register"
              onPress={handleRegister}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
            />

            {/* Sign In Link */}
            <View style={styles.signUpContainer}>
              <Text
                style={[
                  styles.signUpText,
                  { color: isDarkMode ? "#FFF" : "#111827" },
                ]}
              >
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signUpLink}> Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default RegisterScreen;
