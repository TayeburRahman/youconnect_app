import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#f0f0f0",
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
        color: "#333",
    },
    suggestionsContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginTop: 8,
        position: "absolute", // Ensuring suggestions stay above the tabs
        top: 80, // Adjust the top value to make space for the search bar
        left: 16,
        right: 16,
        maxHeight: 200,
        zIndex: 999, // Higher z-index to make sure suggestions stay on top
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    suggestionText: {
        fontSize: 14,
        color: "#333",
    },
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        zIndex: 1, // Lower z-index for the tabs to be below the suggestions
    },
    tabText: {
        fontSize: 16,
        color: "#888",
        fontWeight: "bold",
    },
    activeTabText: {
        color: "#FF29B2", // Active tab color
        borderBottomWidth: 2,
        borderBottomColor: "#FF29B2",
    },
    content: {
        flex: 1,
        marginBottom: 50, // Ensure the content does not overlap with the tabs
    },
    card: {
        marginBottom: 16,
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        fontSize: 14,
        color: "#333",
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
});

export default styles;
