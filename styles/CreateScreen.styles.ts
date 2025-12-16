import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Header
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 20, // Adjusted from 22
        fontWeight: "bold",
    },
    postTypeContainer: {
        paddingHorizontal: 0,
        paddingBottom: 10,
    },
    // ScrollView
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Space for the post button
    },
    // Caption Input
    captionInput: {
        fontSize: 16, // Adjusted from 18
        textAlignVertical: "top",
        paddingVertical: 10,
        minHeight: 120,
    },
    inputField: {
        padding: 15,
        borderRadius: 10,
        fontSize: 14, // Adjusted from 16
        marginVertical: 10,
    },
    datePickerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    datePickerText: {
        fontSize: 14, // Adjusted from 16
        marginLeft: 10,
    },
    quickDateTimeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    quickDateTimeButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal: 2,
        alignItems: 'center',
        // Added for dark mode consistency, will be overridden by inline styles
        // kept here for reference if default styling is needed
        // backgroundColor: '#E5E5EA', 
    },
    quickDateTimeText: {
        fontSize: 12, // Adjusted from 14
        fontWeight: '600',
        // Added for dark mode consistency, will be overridden by inline styles
        // color: '#888',
    },
    // Image Upload
    imageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 20,
    },
    imageContainer: {
        width: (width - 60) / 3,
        height: (width - 60) / 3,
        borderRadius: 12,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "dashed",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    removeImageButton: {
        position: "absolute",
        top: -5,
        right: -5,
        borderRadius: 12,
        padding: 2,
        backgroundColor: 'white',
    },
    storyImagePicker: {
        height: height / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 15,
        marginVertical: 20,
    },
    storyImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    smallImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    smallImageButton: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallImagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    removeSmallImageButton: {
        position: 'absolute',
        top: -5,
        left: 40,
        borderRadius: 10,
        padding: 1,
        backgroundColor: 'white',
        zIndex: 1,
    },
    // Action Buttons
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
        marginVertical: 15,
        borderRadius: 15,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        borderRadius: 20,
    },
    actionText: {
        marginLeft: 8,
        fontSize: 12, // Adjusted from 14
        fontWeight: "600",
    },
    // Segmented Control
    segmentedControl: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        borderRadius: 15,
        padding: 4,
    },
    segmentButton: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'center',
    },
    segmentText: {
        fontSize: 12, // Adjusted from 14
        fontWeight: "600",
    },
    // Post Button
    postButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },
    postButtonText: {
        color: "#fff",
        fontSize: 16, // Adjusted from 18
        fontWeight: "bold",
    },
    // Modal
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "flex-end",
    },
    modalContent: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        paddingBottom: 40,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    modalTitle: {
        fontSize: 18, // Adjusted from 20
        fontWeight: "bold",
        textAlign: "center",
    },
    modalCloseButton: {
        position: 'absolute',
        right: 0,
        top: -5
    },
    closeBar: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#888',
        alignSelf: 'center',
        position: 'absolute',
        top: -15,
    },
    searchInput: {
        padding: 12,
        borderRadius: 10,
        fontSize: 14, // Adjusted from 16
        marginBottom: 20,
    },
    feelingItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    feelingText: {
        fontSize: 16, // Adjusted from 18
        marginLeft: 15,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    doneButton: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16, // Adjusted from 18
        fontWeight: 'bold',
    },
    // Image Viewer
    imageViewerBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullscreenImage: {
        width: width * 0.9,
        height: height * 0.8,
    },
    imageViewerCloseButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },

    light: {
        backgroundColor: "#FFFFFF",
    },
    dark: {
        backgroundColor: "#121212",
    },
});

export default styles;