import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DeleteConfirmModal = ({ visible, onClose, onConfirm, itemName }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity 
                    activeOpacity={1} 
                    style={styles.dismissArea} 
                    onPress={onClose} 
                />
                <View style={styles.modalContainer}>
                    {/* Warning Icon Container */}
                    <View style={styles.iconCircle}>
                        <Ionicons name="trash-outline" size={32} color="#ff4757" />
                    </View>

                    <Text style={styles.title}>Delete Transaction?</Text>
                    <Text style={styles.message}>
                        Are you sure you want to delete {itemName ? `"${itemName}"` : "this record"}? This action cannot be undone.
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                            style={styles.cancelBtn} 
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.deleteBtn} 
                            onPress={onConfirm}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteConfirmModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    dismissArea: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 24,
        padding: 24,
        width: "100%",
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 15,
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "rgba(255, 71, 87, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1e2a35",
        marginBottom: 10,
        textAlign: "center",
    },
    message: {
        fontSize: 15,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 28,
        paddingHorizontal: 10,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    cancelBtn: {
        flex: 1,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#f1f5f9",
    },
    deleteBtn: {
        flex: 1,
        height: 52,
        backgroundColor: "#ff4757",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        elevation: 4,
        shadowColor: "#ff4757",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    cancelText: {
        fontSize: 16,
        color: "#64748b",
        fontWeight: "700",
    },
    deleteText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});
