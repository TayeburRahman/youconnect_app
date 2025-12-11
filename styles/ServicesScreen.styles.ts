// screens/styles/ServicesScreen.styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    header: {
        padding: 20,
        backgroundColor: "#4f46e5",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },

    listContainer: { padding: 15 },
    card: {
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
    cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 5 },
    cardSubtitle: { fontSize: 14, color: "#6b7280" },
    status: { marginTop: 8, fontWeight: "600" },
});
