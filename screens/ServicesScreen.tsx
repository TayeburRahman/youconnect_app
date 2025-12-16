// screens/ServicesScreen.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles/ServicesScreen.styles";
import { useTheme } from "../contexts/ThemeContext";

// Demo service data
type ServiceItem = {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
};

const demoServices: ServiceItem[] = [
  {
    id: "1",
    title: "Plumbing Check",
    description: "Routine plumbing maintenance for apartment 101",
    status: "Pending",
  },
  {
    id: "2",
    title: "Electrical Repair",
    description: "Fix lighting issues in hall",
    status: "In Progress",
  },
  {
    id: "3",
    title: "AC Service",
    description: "Quarterly AC maintenance for office room 3",
    status: "Completed",
  },
];

const ServicesScreen: React.FC = () => {
  const { isDarkMode } = useTheme();

  const renderItem = ({ item }: { item: ServiceItem }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? "#333" : "#FFF" },
      ]}
    >
      <Text style={[styles.cardTitle, { color: isDarkMode ? "#FFF" : "#000" }]}>
        {item.title}
      </Text>
      <Text
        style={[styles.cardSubtitle, { color: isDarkMode ? "#AAA" : "#888" }]}
      >
        {item.description}
      </Text>
      <Text
        style={[
          styles.status,
          {
            color:
              item.status === "Pending"
                ? "#f59e0b"
                : item.status === "In Progress"
                ? "#3b82f6"
                : "#10b981",
          },
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0A0A0F" : "#FFFFFF" },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, { color: isDarkMode ? "#FFF" : "#000" }]}
        >
          Services
        </Text>
      </View>

      <FlatList
        data={demoServices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ServicesScreen;
