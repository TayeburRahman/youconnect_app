import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fullScreenGradient: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
    },
    form: {
        width: "100%",
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.97)",
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ddd",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
        alignSelf: "center",
        position: "absolute",
        top: 110,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    coverImageContainer: {
        width: "100%",
        height: 200,
        backgroundColor: "#ddd",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
    },
    coverImage: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
    },
    inputWrapper: {
        position: "relative",
        marginBottom: 10,
    },
    leftIcon: {
        position: "absolute",
        left: 15,
        top: "15%",
    },
    rightIcon: {
        position: "absolute",
        right: 15,
        top: "35%",
    },
    input: {
        height: 50,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 8,
        backgroundColor: "#f7f7f7",
        fontSize: 16,
        marginBottom: 15,
    },
    dateIcon: {
        position: "absolute",
        left: 15,
        top: "25%",
    },
    loginButton: {
        backgroundColor: "#FF29B2",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    socialLoginContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    socialLoginText: {
        fontSize: 14,
        marginBottom: 15,
    },
    socialButton: {
        marginVertical: 10,
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    signUpText: {
        fontSize: 14,
    },
    signUpLink: {
        fontSize: 14,
        color: "#FF29B2",
        fontWeight: "600",
    },
});
export default styles;