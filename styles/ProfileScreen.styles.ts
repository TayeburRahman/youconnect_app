// screens/styles/ProfileScreen.styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
    header: { alignItems: "center", marginBottom: 30 },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
    name: { fontSize: 22, fontWeight: "700", color: "#111827" },
    email: { fontSize: 16, color: "#6b7280", marginTop: 5 },

    infoCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    infoTitle: { fontSize: 14, color: "#6b7280" },
    infoValue: { fontSize: 16, fontWeight: "600", marginTop: 4 },

    logoutButton: {
        marginTop: 20,
        backgroundColor: "#ef4444",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
    },
    logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
