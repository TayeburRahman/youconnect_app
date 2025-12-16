import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../types";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialButton from "../components/SocialButton";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles/LoginScreen.styles";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const handleLogin = () => {
    navigation.navigate("MainTabNavigator");
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
              Welcome Back 👋
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDarkMode ? "#9CA3AF" : "#6B7280" },
              ]}
            >
              Login to your account
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
            {/* EMAIL */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={22}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                style={styles.leftIcon}
              />
              <CustomInput
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                style={{ paddingLeft: 50 }}
              />
            </View>

            {/* PASSWORD */}
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

            {/* OPTIONS */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.rememberMe}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={rememberMe ? "checkbox-outline" : "square-outline"}
                  size={20}
                  color={isDarkMode ? "#FFF" : "#111827"}
                />
                <Text
                  style={[
                    styles.rememberMeText,
                    { color: isDarkMode ? "#FFF" : "#111827" },
                  ]}
                >
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* LOGIN BUTTON */}
            <CustomButton
              title="Continue"
              onPress={handleLogin}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
            />

            {/* SOCIAL LOGIN */}
            <View style={styles.socialLoginContainer}>
              <Text
                style={[
                  styles.socialLoginText,
                  { color: isDarkMode ? "#9CA3AF" : "#6B7280" },
                ]}
              >
                or continue with
              </Text>
              <SocialButton provider="google" onPress={() => {}} />
              <SocialButton provider="apple" onPress={() => {}} />
            </View>

            {/* SIGN UP */}
            <View style={styles.signUpContainer}>
              <Text
                style={[
                  styles.signUpText,
                  { color: isDarkMode ? "#FFF" : "#111827" },
                ]}
              >
                Don’t have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signUpLink}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;
