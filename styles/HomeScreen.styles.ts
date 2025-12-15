import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    themeToggle: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 20,
    },
    toggleText: {
        fontSize: 16,
        marginRight: 8,
    },
    connectedContainer: {
        marginBottom: 20,
    },
    connectedText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    profileRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#756b72ff", // Border for profile images
    },
    postCard: {
        borderRadius: 16,
        overflow: "hidden",
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#443e3eff", // Border for post cards
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    postImage: {
        width: "100%",
        height: 300,
        marginVertical: 16,
        borderRadius: 10,
    },
    postCaption: {
        fontSize: 14,
        lineHeight: 20,
    },
    postEngagement: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    commentSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    engagementText: {
        fontSize: 14,
        marginLeft: 5,
    },
    likeButton: {
        alignItems: "center",
        padding: 10,
        backgroundColor: "#FF29B2",
        borderRadius: 30,
        marginTop: 10,
    },
    likeButtonText: {
        fontSize: 20,
        color: "#FFF",
    },
});

export default styles;
