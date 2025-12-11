// screens/ProfileScreen.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/ProfileScreen.styles";

const dummyUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+1 234 567 890",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: dummyUser.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{dummyUser.name}</Text>
        <Text style={styles.email}>{dummyUser.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Phone</Text>
        <Text style={styles.infoValue}>{dummyUser.phone}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.infoValue}>{dummyUser.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
