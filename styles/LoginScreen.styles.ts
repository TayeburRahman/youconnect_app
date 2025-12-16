import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Scaling functions
const baseWidth = 375;
const baseHeight = 667;

const scale = (size: number) => (width / baseWidth) * size;
const verticalScale = (size: number) => (height / baseHeight) * size;

const styles = StyleSheet.create({
    fullScreenGradient: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: "flex-start",
        paddingTop: verticalScale(50),
        paddingBottom: verticalScale(50),
        paddingHorizontal: scale(20),
    },

    header: {
        alignItems: "center",
        marginBottom: verticalScale(30),
    },

    title: {
        fontSize: scale(28),
        fontWeight: "bold",
        marginBottom: verticalScale(8),
        textAlign: "center",
    },

    subtitle: {
        fontSize: scale(16),
        textAlign: "center",
        lineHeight: verticalScale(22),
    },

    form: {
        width: "95%",
        maxWidth: 500,
        borderRadius: scale(25),
        padding: scale(20),
        backgroundColor: "rgba(255,255,255,0.97)",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        alignSelf: "center",
        marginBottom: verticalScale(20),
    },

    inputWrapper: {
        width: "100%",
        marginBottom: verticalScale(15),
        position: "relative",
        minHeight: verticalScale(50),
        justifyContent: "center",
    },

    leftIcon: {
        position: "absolute",
        left: scale(12),
        top: "50%",
        transform: [{ translateY: -10 }],
    },

    rightIcon: {
        position: "absolute",
        right: scale(12),
        top: "50%",
        transform: [{ translateY: -10 }],
    },

    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginVertical: verticalScale(10),
    },

    rememberMe: {
        flexDirection: "row",
        alignItems: "center",
    },

    rememberMeText: {
        marginLeft: scale(6),
        fontSize: scale(14),
    },

    forgotPasswordText: {
        fontSize: scale(14),
        color: "#FF29B2",
        fontWeight: "600",
    },

    loginButton: {
        width: "100%",
        paddingVertical: verticalScale(16),
        borderRadius: scale(12),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF29B2",
        marginTop: verticalScale(12),
    },

    loginButtonText: {
        color: "#FFFFFF",
        fontSize: scale(18),
        fontWeight: "700",
    },
    socialLoginContainer: {
        width: "100%",
        alignItems: "center",
        marginVertical: verticalScale(20),
        gap: verticalScale(1),
    },

    socialLoginText: {
        fontSize: scale(14),
        marginBottom: verticalScale(12),
    },

    signUpContainer: {
        flexDirection: "row",
        marginTop: verticalScale(15),
        justifyContent: "center",
        alignItems: "center",
    },

    signUpText: {
        fontSize: scale(14),
    },

    signUpLink: {
        fontSize: scale(14),
        color: "#FF29B2",
        fontWeight: "600",
    },
});

export default styles;
