import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions // Import Dimensions for responsive design
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialButton from "../components/SocialButton";
import { useTheme } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window"); // Get screen width for responsive sizing

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleGoogleLogin = () => { console.log("Google Login Pressed"); };
  const handleAppleLogin = () => { console.log("Apple Login Pressed"); };
  const handleFacebookLogin = () => { console.log("Facebook Login Pressed"); };

  return (
    <LinearGradient
      colors={isDarkMode ? ["#0A0A0F", "#1A1A1A"] : ["#E0E0E0", "#FFFFFF"]}
      style={styles.fullScreenGradient}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={[styles.title, { color: isDarkMode ? "#FFF" : "#000" }]}>
              Welcome Back
            </Text>
            <Text
              style={[styles.subtitle, { color: isDarkMode ? "#AAA" : "#666" }]}
            >
              Login to your account
            </Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              isDarkMode={isDarkMode}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              isDarkMode={isDarkMode}
            />

            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMe}>
                <Ionicons
                  name={rememberMe ? "checkbox-outline" : "square-outline"}
                  size={20}
                  color={isDarkMode ? "#FFF" : "#000"}
                />
                <Text style={[styles.rememberMeText, { color: isDarkMode ? "#FFF" : "#000" }]}>
                  Remember me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              title="Login"
              onPress={() => navigation.navigate("MainTabNavigator")}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
            />

            <View style={styles.socialLoginContainer}>
              <Text style={[styles.socialLoginText, { color: isDarkMode ? "#AAA" : "#666" }]}>
                or login with
              </Text>
              <View style={styles.socialButtons}>
                <SocialButton provider="google" onPress={handleGoogleLogin} style={styles.individualSocialButton} />
                <SocialButton provider="apple" onPress={handleAppleLogin} style={styles.individualSocialButton} />
                {/* <SocialButton provider="facebook" onPress={handleFacebookLogin} /> */}
              </View>
            </View>

            <View style={styles.signUpContainer}>
              <Text
                style={[styles.signUpText, { color: isDarkMode ? "#FFF" : "#000" }]}
              >
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreenGradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    minHeight: '100%', // Ensure scroll view takes full height to center content
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: width * 0.3, // Responsive width
    height: width * 0.3, // Keep aspect ratio
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    width: "100%",
    maxWidth: 400, // Max width for larger screens
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#FF29B2",
    fontWeight: "600",
  },
  loginButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF29B2",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialLoginContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 30,
  },
  socialLoginText: {
    fontSize: 14,
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: "row", // Changed to row for horizontal stacking
    justifyContent: "space-evenly", // Distribute space evenly
    width: "100%",
  },
  individualSocialButton: {
    flex: 1, // Allows buttons to share space
    marginHorizontal: 5, // Add some spacing between buttons
    maxWidth: 150, // Limit individual button width on very wide screens
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    color: "#FF29B2",
    fontWeight: "600",
  },
});

export default LoginScreen;