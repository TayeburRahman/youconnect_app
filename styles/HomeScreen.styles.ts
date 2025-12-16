import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16, // Padding will be handled by individual cards or FlatList contentContainerStyle
    },
    // Styles for PostCard
    card: {
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    authorName: {
        fontSize: 15,
        fontWeight: "bold",
    },
    postInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    timestamp: {
        fontSize: 12,
        marginRight: 5,
    },
    visibilityIcon: {
        marginRight: 2,
    },
    visibility: {
        fontSize: 12,
    },
    moreButton: {
        marginLeft: "auto",
        padding: 5,
    },
    cardContent: {
        paddingHorizontal: 12,
        paddingBottom: 10,
    },
    postText: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
    },
    postFeeling: {
        fontSize: 12,
        fontStyle: "italic",
        marginBottom: 5,
    },
    postImageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginVertical: 10,
    },
    postImage: {
        width: (width - 32 - 24) / 3 - 5, // (width - horizontal_margin - padding) / 3 - space_between_images
        height: (width - 32 - 24) / 3 - 5,
        borderRadius: 8,
        margin: 2.5,
        backgroundColor: '#E0E0E0', // Placeholder background
    },
    postTags: {
        fontSize: 12,
        marginTop: 5,
    },
    postLocation: {
        fontSize: 12,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    eventDescription: {
        fontSize: 14,
        marginBottom: 10,
    },
    eventCoverImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#E0E0E0', // Placeholder background
    },
    eventDateTime: {
        fontSize: 12,
        marginBottom: 5,
    },
    eventLocation: {
        fontSize: 12,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    storyImage: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#E0E0E0', // Placeholder background
    },
    storyText: {
        fontSize: 14,
        lineHeight: 20,
    },
    activityHeader: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    artistCredit: {
        fontSize: 12,
        fontStyle: "italic",
        marginBottom: 5,
    },
    cardActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.1)", // Light border
    },
    commentButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    commentCount: {
        marginLeft: 5,
        fontSize: 12,
    },
    // Existing styles (cleaned up or integrated)
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
        paddingHorizontal: 16, // Added padding
    },
    connectedText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    profileRow: {
        flexDirection: "row",
        // Removed justifyContent: "space-between" as FlatList handles spacing
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#756b72ff", // Border for profile images
    },
    postListContainer: {
        paddingBottom: 20, // To ensure content at the bottom is visible
    }
});

export default styles;