import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Pressable,
    Platform,
    StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ManageEntries = () => {
    // Dummy data for demonstration
    const [entries, setEntries] = useState([
        { id: 1, cat: "Salary 💰", amm: 50000, des: "Monthly Salary", it: "income", date: new Date() },
        { id: 2, cat: "Food 🍔", amm: 1200, des: "Dinner with friends", it: "expense", date: new Date() },
        { id: 3, cat: "Travel ✈️", amm: 3000, des: "Office commute", it: "expense", date: new Date() },
        { id: 4, cat: "Shopping 🛍️", amm: 4500, des: "New shoes", it: "expense", date: new Date() },
    ]);

    const handleDelete = (id) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1e293b" />
                </Pressable>
                <View style={styles.headerText}>
                    <Text style={styles.title}>Manage Entries</Text>
                    <Text style={styles.subtitle}>Edit or delete your transactions</Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {entries.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={64} color="#cbd5e1" />
                        <Text style={styles.emptyText}>No entries found</Text>
                    </View>
                ) : (
                    entries.map((item) => {
                        const isIncome = item.it === "income";
                        return (
                            <View key={item.id} style={styles.entryCard}>
                                <View style={[styles.indicator, { backgroundColor: isIncome ? "#22c55e" : "#ef4444" }]} />
                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.catText}>{item.cat}</Text>
                                        <Text style={[styles.ammText, { color: isIncome ? "#22c55e" : "#ef4444" }]}>
                                            {isIncome ? "+" : "-"}₹{item.amm}
                                        </Text>
                                    </View>
                                    <Text style={styles.desText}>{item.des}</Text>
                                    <View style={styles.cardFooter}>
                                        <Text style={styles.dateText}>
                                            {item.date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </Text>
                                        <View style={styles.actionRow}>
                                            <Pressable
                                                style={styles.actionBtn}
                                                onPress={() => router.push({
                                                    pathname: '../desbord/adddata',
                                                    params: { cat: item.cat, amm: item.amm, des: item.des, it: item.it }
                                                })}
                                            >
                                                <Ionicons name="create-outline" size={20} color="#0a63bc" />
                                            </Pressable>
                                            <Pressable
                                                style={[styles.actionBtn, styles.deleteBtn]}
                                                onPress={() => handleDelete(item.id)}
                                            >
                                                <Ionicons name="trash-outline" size={20} color="#ef4444" />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ManageEntries;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f8fafc",
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1e293b",
    },
    subtitle: {
        fontSize: 12,
        color: "#94a3b8",
        marginTop: 2,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    entryCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 15,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    indicator: {
        width: 6,
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    catText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
    },
    ammText: {
        fontSize: 17,
        fontWeight: '800',
    },
    desText: {
        fontSize: 13,
        color: '#64748b',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 12,
    },
    dateText: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '600',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBtn: {
        backgroundColor: '#fef2f2',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#94a3b8',
        marginTop: 15,
    },
});
