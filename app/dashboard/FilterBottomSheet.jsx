import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FilterBottomSheet = ({
    visible,
    onClose,
    filters,
    onApply,
    onReset,
}) => {
    const [tempFilters, setTempFilters] = useState(filters);

    const updateFilter = (key, value) => {
        setTempFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onApply(tempFilters);
        onClose();
    };

    const handleReset = () => {
        const defaultFilters = {
            type: "All",
            category: "All",
            dateRange: "All",
            sortBy: "Latest",
        };
        setTempFilters(defaultFilters);
        onReset(defaultFilters);
    };

    const Chip = ({ label, selected, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.chip, selected && styles.chipSelected]}
        >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            statusBarTranslucent={true} // Ensures overlay covers the status bar area
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable style={styles.dismissArea} onPress={onClose} />
                <View style={styles.sheetContainer}>
                    <View style={styles.header}>
                        <View style={styles.handle} />
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>Filter Transactions</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="close-circle" size={28} color="#bdc3c7" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        {/* Transaction Type */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Transaction Type</Text>
                            <View style={styles.chipRow}>
                                {["All", "Income", "Expense"].map((type) => (
                                    <Chip
                                        key={type}
                                        label={type}
                                        selected={tempFilters.type === type}
                                        onPress={() => updateFilter("type", type)}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Categories */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Category</Text>
                            <View style={styles.chipRow}>
                                {["All", "Food", "Salary", "Shopping", "Others"].map((cat) => (
                                    <Chip
                                        key={cat}
                                        label={cat}
                                        selected={tempFilters.category === cat}
                                        onPress={() => updateFilter("category", cat)}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Date Filter */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Time Period</Text>
                            <View style={styles.chipRow}>
                                {["All", "Last 7 Days", "This Month"].map((date) => (
                                    <Chip
                                        key={date}
                                        label={date}
                                        selected={tempFilters.dateRange === date}
                                        onPress={() => updateFilter("dateRange", date)}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Sort By */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sort By</Text>
                            <View style={styles.chipRow}>
                                {["Latest", "Amount: High to Low", "Amount: Low to High"].map((sort) => (
                                    <Chip
                                        key={sort}
                                        label={sort}
                                        selected={tempFilters.sortBy === sort}
                                        onPress={() => updateFilter("sortBy", sort)}
                                    />
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer Buttons */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                            <Text style={styles.resetText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                            <Text style={styles.applyText}>Apply Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    dismissArea: {
        flex: 1,
    },
    sheetContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: "80%",
        paddingBottom: 20,
    },
    header: {
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 20,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: "#e0e0e0",
        borderRadius: 3,
        marginBottom: 15,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2f3640",
    },
    scrollView: {
        paddingHorizontal: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2f3640",
        marginBottom: 12,
    },
    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f1f2f6",
        borderWidth: 1,
        borderColor: "#f1f2f6",
    },
    chipSelected: {
        backgroundColor: "rgba(10, 99, 188, 0.1)",
        borderColor: "#0a63bc",
    },
    chipText: {
        fontSize: 14,
        color: "#7f8c8d",
        fontWeight: "500",
    },
    chipTextSelected: {
        color: "#0a63bc",
        fontWeight: "700",
    },
    footer: {
        flexDirection: "row",
        paddingHorizontal: 24,
        paddingTop: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: "#f1f2f6",
    },
    resetBtn: {
        flex: 1,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#bdc3c7",
    },
    applyBtn: {
        flex: 2,
        height: 50,
        backgroundColor: "#0a63bc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        elevation: 3,
        shadowColor: "#0a63bc",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    resetText: {
        fontSize: 16,
        color: "#7f8c8d",
        fontWeight: "600",
    },
    applyText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});
