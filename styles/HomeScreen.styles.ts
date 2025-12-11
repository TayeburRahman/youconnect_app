// screens/styles/HomeScreen.styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0F",
    },

    // Top Navigation
    topNav: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        backgroundColor: "rgba(10,10,15,0.8)",
        borderBottomColor: "#7A5CFF",
        borderBottomWidth: 0.5,
        zIndex: 10,
    },
    logo: { fontSize: 22, color: "#FF29B2", fontWeight: "700" },
    navIcon: { fontSize: 24, color: "#00D1FF" },

    // Stories
    storiesContainer: {
        height: 90,
        flexDirection: "row",
        paddingHorizontal: 12,
        marginTop: 8,
    },
    storyCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: "#FF29B2",
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    storyAvatar: { width: 60, height: 60, borderRadius: 30 },

    // Tabs
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 8,
    },
    tabText: {
        fontSize: 16,
        color: "#888",
        marginHorizontal: 16,
        fontWeight: "600",
    },
    activeTab: {
        color: "#FF29B2",
        textDecorationLine: "underline",
        textDecorationColor: "#FF29B2",
    },

    // Post Card
    postCard: {
        backgroundColor: "rgba(255,255,255,0.05)",
        marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 16,
        overflow: "hidden",
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
    username: { fontSize: 14, fontWeight: "700", color: "#fff" },
    menu: { fontSize: 20, color: "#888" },

    media: {
        width: width - 24,
        height: 300,
        backgroundColor: "#222",
    },

    textPost: { padding: 16 },
    textCaption: { color: "#fff", fontSize: 16 },

    caption: { color: "#fff", fontSize: 14, marginBottom: 8 },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    actionBtn: { color: "#FF29B2", fontSize: 16 },

    // Bottom Navigation
    bottomNav: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgba(10,10,15,0.95)",
        borderTopWidth: 0.5,
        borderTopColor: "#7A5CFF",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
    },
    bottomIcon: { fontSize: 28, color: "#888" },
    bottomIconActive: { fontSize: 28, color: "#FF29B2" },
    createBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FF29B2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#FF29B2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 10,
    },
});
