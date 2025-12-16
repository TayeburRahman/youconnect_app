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
  SafeAreaView // Import SafeAreaView
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types"; // Corrected import path
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // For potential icons if needed

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState(""); // New field: Username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New field: Confirm Password

  const handleRegister = () => {
    // Implement registration logic here
    console.log("Register Data:", { fullName, username, email, password, confirmPassword });
    // For now, just navigate to Home
    navigation.navigate("MainTabNavigator");
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ["#0A0A0F", "#1A1A1A"] : ["#E0E0E0", "#FFFFFF"]}
      style={styles.fullScreenGradient}
    >
      <SafeAreaView style={styles.safeArea}>
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
                Create Account
              </Text>
              <Text
                style={[styles.subtitle, { color: isDarkMode ? "#AAA" : "#666" }]}
              >
                Join our community!
              </Text>
            </View>

            <View style={styles.form}>
              <CustomInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                isDarkMode={isDarkMode}
              />
              <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                isDarkMode={isDarkMode}
              />
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
              <CustomInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                isDarkMode={isDarkMode}
              />

              <CustomButton
                title="Register"
                onPress={handleRegister}
                buttonStyle={styles.registerButton}
                textStyle={styles.registerButtonText}
              />

              <View style={styles.signInContainer}>
                <Text
                  style={[styles.signInText, { color: isDarkMode ? "#FFF" : "#000" }]}
                >
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreenGradient: {
    flex: 1,
  },
  safeArea: {
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
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
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
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF29B2", // Primary button color
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 14,
  },
  signInLink: {
    fontSize: 14,
    color: "#FF29B2", // Highlight color
    fontWeight: "600",
  },
});

export default RegisterScreen;