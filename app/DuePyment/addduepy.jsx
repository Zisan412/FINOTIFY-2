import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddDuePayment = () => {
  const [type, setType] = useState("receive"); // receive | pay
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' });

  const toastY = useRef(new Animated.Value(-100)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const triggerToast = (type, message) => {
    setToast({ visible: true, type, message });
    Animated.parallel([
      Animated.timing(toastY, {
        toValue: 20,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastY, {
          toValue: -100,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => setToast({ ...toast, visible: false }));
    }, 2500);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (!amount.trim()) newErrors.amount = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerToast('error', 'Please fill all required fields');
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate saving
    setTimeout(() => {
      setLoading(false);
      triggerToast('success', 'Due added successfully');

      setTimeout(() => {
        router.push('/DuePyment/due');
      }, 1500);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {toast.visible && (
        <Animated.View
          style={[
            styles.toastContainer,
            { transform: [{ translateY: toastY }], opacity: toastOpacity }
          ]}
        >
          <View style={[styles.toastContent, toast.type === 'error' && styles.toastError]}>
            <View style={styles.toastIcon}>
              <Ionicons
                name={toast.type === 'success' ? "checkmark-circle" : "alert-circle"}
                size={22}
                color="#fff"
              />
            </View>
            <View>
              <Text style={styles.toastTitle}>
                {toast.type === 'success' ? "Success" : "Wait a minute"}
              </Text>
              <Text style={styles.toastSub}>{toast.message}</Text>
            </View>
          </View>
        </Animated.View>
      )}

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>New Due Record</Text>
            <Text style={styles.subtitle}>Track money you need to receive or pay</Text>
          </View>
        </View>

        {/* Toggle Switch */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleBox}>
            <Pressable
              style={[
                styles.toggleBtn,
                type === "receive" && styles.receiveActive,
              ]}
              onPress={() => setType("receive")}
            >
              <Ionicons
                name="arrow-down-circle"
                size={20}
                color={type === "receive" ? "#0f9d58" : "#94a3b8"}
              />
              <Text style={[styles.toggleText, type === "receive" && styles.activeText]}>Receive</Text>
            </Pressable>

            <Pressable
              style={[
                styles.toggleBtn,
                type === "pay" && styles.payActive,
              ]}
              onPress={() => setType("pay")}
            >
              <Ionicons
                name="arrow-up-circle"
                size={20}
                color={type === "pay" ? "#e53935" : "#94a3b8"}
              />
              <Text style={[styles.toggleText, type === "pay" && styles.activeText]}>Pay</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.formCard}>
          {/* Name */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>PERSON / PARTY NAME</Text>
            <View style={[styles.inputWrapper, errors.name && styles.errorInput]}>
              <Ionicons name="person-outline" size={20} color="#64748b" />
              <TextInput
                placeholder="Who is this for?"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: false });
                }}
                style={styles.input}
              />
            </View>
          </View>

          {/* Amount */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>AMOUNT</Text>
            <View style={[styles.inputWrapper, errors.amount && styles.errorInput]}>
              <Ionicons name="wallet-outline" size={20} color="#64748b" />
              <TextInput
                placeholder="₹ 0.00"
                keyboardType="numeric"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  if (errors.amount) setErrors({ ...errors, amount: false });
                }}
                style={styles.input}
              />
            </View>
          </View>

          {/* Note */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>NOTE (OPTIONAL)</Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <Ionicons name="document-text-outline" size={20} color="#64748b" style={{ marginTop: 12 }} />
              <TextInput
                placeholder="Add a remark..."
                value={note}
                onChangeText={setNote}
                style={[styles.input, styles.textArea]}
                multiline
              />
            </View>
          </View>

          {/* Save Button */}
          <Pressable
            disabled={loading}
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveBtn,
              type === "receive" ? styles.receiveBtn : styles.payBtn,
              pressed && styles.btnPressed
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text style={styles.saveText}>Save Due Payment</Text>
                <Ionicons name="chevron-forward" size={18} color="#fff" />
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDuePayment;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  headerText: {
    marginLeft: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 2,
  },
  toggleContainer: {
    marginBottom: 25,
  },
  toggleBox: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    borderRadius: 18,
    padding: 5,
  },
  toggleBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  toggleText: {
    fontWeight: "700",
    color: "#64748b",
    fontSize: 14,
  },
  activeText: {
    color: "#1e293b",
  },
  receiveActive: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  payActive: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  inputBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748b",
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  errorInput: {
    borderColor: "#fecaca",
    backgroundColor: "#fff5f5",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "600",
    marginLeft: 12,
  },
  textAreaWrapper: {
    height: 100,
    alignItems: "flex-start",
  },
  textArea: {
    height: "100%",
    paddingTop: 14,
    textAlignVertical: "top",
  },
  saveBtn: {
    marginTop: 10,
    height: 56,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  receiveBtn: {
    backgroundColor: "#0a63bc",
  },
  payBtn: {
    backgroundColor: "#ef4444",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toastContent: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
  },
  toastError: {
    backgroundColor: '#ef4444',
  },
  toastIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  toastTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  toastSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
});
