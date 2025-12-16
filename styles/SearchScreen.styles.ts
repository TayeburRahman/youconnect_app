import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0", // Light background
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333", // Dark text
  },
  suggestionsContainer: {
    backgroundColor: "#fff", // Light background
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 8,
    position: "absolute",
    top: 80,
    left: 16,
    right: 16,
    maxHeight: 200,
    zIndex: 999,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Light border
  },
  suggestionText: {
    fontSize: 14,
    color: "#333", // Dark text
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    color: "#888", // Default tab text
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#FF29B2", // Active tab color (pink)
    borderBottomWidth: 2,
    borderBottomColor: "#FF29B2",
  },
  content: {
    flex: 1,
    // marginBottom: 50, // Removed, as FlatList in HomeScreen and custom BottomTab might handle this
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#f9f9f9", // Light background
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 14,
    color: "#333", // Dark text
    marginBottom: 8,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;