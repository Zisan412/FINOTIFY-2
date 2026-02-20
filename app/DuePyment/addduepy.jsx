import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddDuePayment = () => {
  const [type, setType] = useState("receive"); // receive | pay
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    // Save logic would go here
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </Pressable>
        <Text style={styles.title}>Add Due Payment</Text>
      </View>
      <Text style={styles.subtitle}>
        Track money you need to receive or pay
      </Text>

      {/* Toggle */}
      <View style={styles.toggleBox}>
        <Pressable
          style={[
            styles.toggleBtn,
            type === "receive" && styles.receiveActive,
          ]}
          onPress={() => setType("receive")}
        >
          <Ionicons name="arrow-down-circle" size={18} color="#0f9d58" />
          <Text style={styles.toggleText}>I Will Receive</Text>
        </Pressable>

        <Pressable
          style={[
            styles.toggleBtn,
            type === "pay" && styles.payActive,
          ]}
          onPress={() => setType("pay")}
        >
          <Ionicons name="arrow-up-circle" size={18} color="#e53935" />
          <Text style={styles.toggleText}>I Will Pay</Text>
        </Pressable>
      </View>

      {/* Name */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Person / Party Name</Text>
        <TextInput
          placeholder="Rahul / Shop / Company"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      {/* Amount */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="₹ 0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
      </View>

      {/* Note */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Note (Optional)</Text>
        <TextInput
          placeholder="eg. Grocery due, Rent pending"
          value={note}
          onChangeText={setNote}
          style={[styles.input, { height: 80 }]}
          multiline
        />
      </View>

      {/* Save */}
      <Pressable
        onPress={handleSave}
        style={[
          styles.saveBtn,
          type === "receive" ? styles.receiveBtn : styles.payBtn,
        ]}
      >
        <Text style={styles.saveText}>Save Due Payment</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AddDuePayment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  subtitle: {
    color: "#666",
    marginBottom: 20,
  },

  toggleBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 6,
    marginBottom: 20,
    elevation: 3,
  },

  toggleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  toggleText: {
    fontWeight: "600",
    color: "#333",
  },

  receiveActive: {
    backgroundColor: "#e8f5e9",
  },

  payActive: {
    backgroundColor: "#fdecea",
  },

  inputBox: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 6,
    color: "#333",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    elevation: 2,
  },

  saveBtn: {
    marginTop: 30,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  receiveBtn: {
    backgroundColor: "#0f9d58",
  },

  payBtn: {
    backgroundColor: "#e53935",
  },

  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
