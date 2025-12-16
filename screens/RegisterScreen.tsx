import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { styles } from "../styles/RegisterScreen.styles";
import { useTheme } from "../contexts/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFFFFF" },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={[styles.title, { color: isDarkMode ? "#FFF" : "#000" }]}>
            Create Account
          </Text>
          <Text
            style={[styles.subtitle, { color: isDarkMode ? "#888" : "#888" }]}
          >
            Start your journey with us
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

          <CustomButton
            title="Register"
            onPress={() => navigation.navigate("Home")}
          />

          <Text
            style={[styles.loginText, { color: isDarkMode ? "#FFF" : "#000" }]}
          >
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;