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
    const [entries, setEntries] = useState([
        {
            id: 1,
            cat: "Salary 💰",
            amm: 50000,
            des: "Monthly Salary",
            it: "income",
            date: new Date(),
            bankName: "HDFC Bank",
            upiId: "company@hdfcbank",
        },
        {
            id: 2,
            cat: "Food 🍔",
            amm: 1200,
            des: "Dinner with friends",
            it: "expense",
            date: new Date(),
            bankName: "Kotak Bank",
            upiId: "friend@oksbi",
        },
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
                        const emojiMatch = item.cat.match(/[\p{Emoji}\u200d]+/u);
                        const iconSign = emojiMatch ? emojiMatch[0] : item.cat.charAt(0);
                        const cleanCat = item.cat.replace(/[\p{Emoji}\u200d]+/u, '').trim();
                        const dateStr = `${item.date.getDate().toString().padStart(2, '0')}-${(item.date.getMonth() + 1).toString().padStart(2, '0')}-${item.date.getFullYear().toString().slice(-2)}`;

                        return (
                            <View key={item.id} style={styles.entryCard}>
                                <View style={[styles.indicator, { backgroundColor: isIncome ? "#22c55e" : "#ef4444" }]} />
                                <View style={styles.cardContent}>
                                    <View style={styles.row}>

                                        {/* ── LEFT: icon column ── */}
                                        <View style={styles.iconColumn}>
                                            <Text style={styles.categoryIcon}>{iconSign}</Text>
                                            <Text style={styles.categoryName} numberOfLines={1}>
                                                {cleanCat || item.cat}
                                            </Text>
                                        </View>

                                        {/* ── CENTER: main info ── */}
                                        <View style={styles.centerSection}>
                                            <Text style={styles.description} numberOfLines={1}>
                                                {item.des}
                                            </Text>
                                            <Text style={styles.subDetail} numberOfLines={1}>
                                                {item.bankName || 'Cash'}
                                            </Text>
                                            {item.bankName && item.upiId ? (
                                                <Text style={styles.subDetail} numberOfLines={1}>
                                                    {item.upiId}
                                                </Text>
                                            ) : null}
                                            <Text style={styles.dateText}>{dateStr}</Text>
                                        </View>

                                        {/* ── RIGHT: amount + actions (untouched) ── */}
                                        <View style={styles.rightSection}>
                                            <Text style={[styles.ammText, { color: isIncome ? "#22c55e" : "#ef4444" }]}>
                                                {isIncome ? "+" : "-"}₹{item.amm}
                                            </Text>
                                            <View style={styles.actionRow}>
                                                <Pressable
                                                    style={styles.actionBtn}
                                                    onPress={() => router.push({
                                                        pathname: '../desbord/adddata',
                                                        params: { cat: item.cat, amm: item.amm, des: item.des, it: item.it }
                                                    })}
                                                >
                                                    <Ionicons name="create-outline" size={18} color="#0a63bc" />
                                                </Pressable>
                                                <Pressable
                                                    style={[styles.actionBtn, styles.deleteBtn]}
                                                    onPress={() => handleDelete(item.id)}
                                                >
                                                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                                                </Pressable>
                                            </View>
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
        padding: 16,
        paddingBottom: 40,
    },
    entryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        borderLeftWidth: 3,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
    },
    indicator: {
        width: 0,
    },
    cardContent: {
        flex: 1,
        paddingVertical: 11,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    /* ── LEFT icon column ── */
    iconColumn: {
        alignItems: 'center',
        width: 44,
    },
    categoryIcon: {
        fontSize: 22,
        lineHeight: 28,
    },
    categoryName: {
        fontSize: 9,
        color: '#a4b0be',
        fontWeight: '600',
        textTransform: 'capitalize',
        textAlign: 'center',
        marginTop: 1,
    },

    /* ── CENTER details ── */
    centerSection: {
        flex: 1,
        paddingRight: 6,
    },
    description: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2C3A47',
        marginBottom: 2,
    },
    subDetail: {
        fontSize: 11,
        color: '#8395a7',
        marginBottom: 1,
    },
    dateText: {
        fontSize: 10,
        color: '#c8d6e5',
        fontWeight: '500',
        marginTop: 2,
    },

    /* ── RIGHT section ── */
    rightSection: {
        alignItems: 'flex-end',
    },
    ammText: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.2,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 6,
        opacity: 0.85,
    },
    actionBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
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
