import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
    scrollContainer: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20, paddingVertical: 40 },
    header: { alignItems: "center", marginBottom: 40 },
    logo: { width: 80, height: 80, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: "700", color: "#333" },
    subtitle: { fontSize: 16, color: "#666", marginTop: 4 },
    form: {},
    registerText: { textAlign: "center", marginTop: 20, fontSize: 14, color: "#333" },
    registerLink: { color: "#4f46e5", fontWeight: "bold" },
});
