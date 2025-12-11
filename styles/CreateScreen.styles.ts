// screens/styles/CreateScreen.styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0F",
        padding: 16,
    },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 22,
        color: "#FF29B2",
        fontWeight: "700",
    },
    headerBtn: {
        fontSize: 18,
        color: "#00D1FF",
    },

    // Media Preview
    mediaPreview: {
        width: width - 32,
        height: height * 0.35,
        backgroundColor: "#222",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    mediaText: { color: "#888", fontSize: 16 },

    // Caption Input
    captionInput: {
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
        color: "#fff",
        fontSize: 16,
        padding: 12,
        marginBottom: 16,
        minHeight: 80,
        textAlignVertical: "top",
    },

    // AI Suggestions
    aiSuggestionsContainer: {
        marginBottom: 16,
    },
    aiSuggestionTag: {
        backgroundColor: "rgba(255,41,178,0.3)",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    aiSuggestionText: {
        color: "#FF29B2",
        fontWeight: "600",
    },

    // Post Button
    postButton: {
        width: "100%",
        height: 56,
        backgroundColor: "#FF29B2",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#FF29B2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 10,
    },
    postButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
