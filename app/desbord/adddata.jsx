import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";

const AddData = () => {
  const { cat, amm, des } = useLocalSearchParams();

  const [showPicker, setShowPicker] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(amm || "");
  const [category, setCategory] = useState(cat || "");
  const [desc, setDesc] = useState(des || "");

  const [activeInput, setActiveInput] = useState(null);
  const [loading, setLoading] = useState(null); // 'income' | 'expense' | null
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const toastY = useRef(new Animated.Value(-100)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const categories = [
    "Food 🍔",
    "Salary 💰",
    "Travel ✈️",
    "House 🏠",
    "Sports 🏀",
    "Other 📦",
  ];

  const triggerToast = () => {
    setShowToast(true);
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
      ]).start(() => setShowToast(false));
    }, 2500);
  };

  const submit = (type) => {
    const newErrors = {};
    if (!amount) newErrors.amount = "Please enter amount";
    if (!category) newErrors.category = "Please select a category";
    if (!desc) newErrors.desc = "Please add a description";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(type);

    // Simulate API call
    setTimeout(() => {
      setLoading(null);
      triggerToast();

      console.log({
        type,
        date,
        amount,
        category,
        desc,
      });

      setTimeout(() => {
        router.back();
      }, 1500);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* PREMIUM TOAST */}
        {showToast && (
          <Animated.View
            style={[
              styles.toastContainer,
              { transform: [{ translateY: toastY }], opacity: toastOpacity }
            ]}
          >
            <View style={styles.toastContent}>
              <View style={styles.toastIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.toastTitle}>Transaction Added</Text>
                <Text style={styles.toastSub}>Your record has been saved successfully!</Text>
              </View>
            </View>
          </Animated.View>
        )}

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#1e293b" />
            </Pressable>
            <View style={styles.headerText}>
              <Text style={styles.title}>New Transaction</Text>
              <Text style={styles.subtitle}>Track your income and expenses easily</Text>
            </View>
          </View>

          {/* FORM CARD */}
          <View style={styles.card}>
            {/* DATE INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Transaction Date</Text>
              <Pressable
                style={[
                  styles.inputBox,
                  activeInput === 'date' && styles.activeBox
                ]}
                onPress={() => setShowPicker(true)}
              >
                <Ionicons name="calendar" size={20} color="#0a63bc" />
                <Text style={styles.inputText}>{date.toDateString()}</Text>
              </Pressable>
            </View>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={(e, d) => {
                  setShowPicker(false);
                  d && setDate(d);
                }}
              />
            )}

            {/* AMOUNT INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount</Text>
              <View style={[
                styles.inputBox,
                activeInput === 'amount' && styles.activeBox,
                errors.amount && styles.errorBox
              ]}>
                <Ionicons name="card" size={20} color={errors.amount ? "#ef4444" : "#0a63bc"} />
                <TextInput
                  placeholder="₹ 0.00"
                  keyboardType="numeric"
                  style={styles.input}
                  value={amount}
                  onChangeText={(val) => {
                    setAmount(val);
                    if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
                  }}
                  onFocus={() => setActiveInput('amount')}
                  onBlur={() => setActiveInput(null)}
                />
              </View>
              {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
            </View>

            {/* CATEGORY INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <Pressable
                style={[
                  styles.inputBox,
                  activeInput === 'category' && styles.activeBox,
                  errors.category && styles.errorBox
                ]}
                onPress={() => setShowCategory(true)}
              >
                <Ionicons name="grid" size={20} color={errors.category ? "#ef4444" : "#0a63bc"} />
                <Text style={styles.inputText}>
                  {category || "Select Category"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#94a3b8" style={{ marginLeft: 'auto' }} />
              </Pressable>
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
            </View>

            {/* DESCRIPTION INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes</Text>
              <View style={[
                styles.inputBox,
                styles.textArea,
                activeInput === 'desc' && styles.activeBox,
                errors.desc && styles.errorBox
              ]}>
                <Ionicons name="document-text" size={20} color={errors.desc ? "#ef4444" : "#0a63bc"} style={{ marginTop: 2 }} />
                <TextInput
                  placeholder="What was this for?"
                  style={[styles.input, { textAlignVertical: 'top' }]}
                  value={desc}
                  onChangeText={(val) => {
                    setDesc(val);
                    if (errors.desc) setErrors(prev => ({ ...prev, desc: null }));
                  }}
                  multiline
                  onFocus={() => setActiveInput('desc')}
                  onBlur={() => setActiveInput(null)}
                />
              </View>
              {errors.desc && <Text style={styles.errorText}>{errors.desc}</Text>}
            </View>

            {/* PRIMARY BUTTONS */}
            <View style={styles.buttonRow}>
              <Pressable
                disabled={loading !== null}
                style={({ pressed }) => [
                  styles.mainBtn,
                  styles.incomeBtn,
                  (pressed || loading === 'income') && styles.btnPressed
                ]}
                onPress={() => submit("income")}
              >
                {loading === 'income' ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Ionicons name="trending-up" size={18} color="#fff" />
                    <Text style={styles.btnText}>Income</Text>
                  </>
                )}
              </Pressable>

              <Pressable
                disabled={loading !== null}
                style={({ pressed }) => [
                  styles.mainBtn,
                  styles.expenseBtn,
                  (pressed || loading === 'expense') && styles.btnPressed
                ]}
                onPress={() => submit("expense")}
              >
                {loading === 'expense' ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Ionicons name="trending-down" size={18} color="#fff" />
                    <Text style={styles.btnText}>Expense</Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>

          {/* SECONDARY ACTION */}
          <Pressable
            style={({ pressed }) => [
              styles.dueAction,
              pressed && styles.btnPressed
            ]}
            onPress={() => router.push('/DuePyment/addduepy')}
          >
            <View style={styles.dueIconBox}>
              <Ionicons name="time" size={20} color="#0a63bc" />
            </View>
            <View>
              <Text style={styles.dueTitle}>Add Due Payment</Text>
              <Text style={styles.dueSub}>Track money pending with others</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" style={{ marginLeft: 'auto' }} />
          </Pressable>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* CATEGORY BOTTOM SHEET SIMULATION */}
      {showCategory && (
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalCloseArea} onPress={() => setShowCategory(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>Select Category</Text>
            </View>
            <ScrollView style={styles.modalList}>
              {categories.map((item, i) => (
                <Pressable
                  key={i}
                  style={styles.catItem}
                  onPress={() => {
                    setCategory(item);
                    if (errors.category) setErrors(prev => ({ ...prev, category: null }));
                    setShowCategory(false);
                  }}
                >
                  <Text style={styles.catText}>{item}</Text>
                  {category === item && <Ionicons name="checkmark-circle" size={20} color="#0a63bc" />}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddData;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 58,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  activeBox: {
    borderColor: "#0a63bc",
    backgroundColor: "#fff",
  },
  errorBox: {
    borderColor: "#fecaca",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    marginLeft: 6,
  },
  textArea: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: '600',
    marginLeft: 12,
  },
  inputText: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: '600',
    marginLeft: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 12,
  },
  mainBtn: {
    flex: 1,
    height: 58,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  incomeBtn: {
    backgroundColor: "#0a63bc",
  },
  expenseBtn: {
    backgroundColor: "#ef4444",
  },
  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  dueAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 18,
    borderRadius: 22,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  dueIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dueTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
  },
  dueSub: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalCloseArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 40,
    maxHeight: '75%',
    elevation: 20,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalHandle: {
    width: 36,
    height: 5,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
  },
  modalList: {
    paddingHorizontal: 20,
  },
  catItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  catText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '600',
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
  toastIcon: {
    width: 40,
    height: 40,
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
