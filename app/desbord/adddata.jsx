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

// ── Constants outside component (stable references) ──────────────────
const DEFAULT_CATEGORIES = [
  { icon: '🍔', label: 'Food' },
  { icon: '💰', label: 'Salary' },
  { icon: '✈️', label: 'Travel' },
  { icon: '🏠', label: 'House' },
  { icon: '🏀', label: 'Sports' },
  { icon: '🛍️', label: 'Shopping' },
  { icon: '💊', label: 'Health' },
  { icon: '🚗', label: 'Transport' },
  { icon: '📦', label: 'Other' },
];

const MAX_CATS = 15; // 9 default + up to 6 custom

const ICON_PICKER = [
  '📌', '🌟', '🚀', '🎧', '☕', '🎵', '🐶', '🌼',
  '⚽', '🏖️', '📱', '🛠️', '🎁', '📝', '💼', '🏢',
  '🤑', '🏆', '🏮', '🍫', '📊', '🔑', '✂️', '🧲',
];


const AddData = () => {
  const { cat, amm, des } = useLocalSearchParams();

  const [showPicker, setShowPicker] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);
  const [newBankName, setNewBankName] = useState("");

  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(amm || "");
  const [category, setCategory] = useState(cat || "");
  const [desc, setDesc] = useState(des || "");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");

  const DEFAULT_BANKS = ['SBI', 'HDFC', 'Bank of Baroda'];
  const [customBanks, setCustomBanks] = useState([]);
  const allBanks = [...DEFAULT_BANKS, ...customBanks];
  const MAX_CUSTOM = 3;

  const [activeInput, setActiveInput] = useState(null);
  const [loading, setLoading] = useState(null); // 'income' | 'expense' | null
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const toastY = useRef(new Animated.Value(-100)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const [customCategories, setCustomCategories] = useState([]);
  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  // Category management state
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState([]);
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📌');

  const slideAnim = useRef(new Animated.Value(400)).current;

  const openCategory = () => {
    slideAnim.setValue(400);
    setShowCategory(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const closeCategory = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setShowCategory(false));
  };

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
        bankName: bankName || 'Cash',
        upiId,
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
                onPress={openCategory}
              >
                <Text style={{ fontSize: 20 }}>
                  {category ? allCategories.find(c => `${c.icon} ${c.label}` === category)?.icon || '📦' : '🗂️'}
                </Text>
                <Text style={[styles.inputText, !category && { color: '#94a3b8', fontWeight: '500' }]}>
                  {category
                    ? allCategories.find(c => `${c.icon} ${c.label}` === category)?.label || category
                    : 'Select Category'}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#94a3b8" style={{ marginLeft: 'auto' }} />
              </Pressable>
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
            </View>

            {/* BANK SELECTION */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bank Account</Text>
              <Pressable
                style={[styles.inputBox, activeInput === 'bank' && styles.activeBox]}
                onPress={() => setShowBank(true)}
              >
                <Ionicons name="business" size={20} color="#0a63bc" />
                <Text style={[styles.inputText, !bankName && { color: '#94a3b8' }]}>
                  {bankName || "Select Bank (Optional)"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#94a3b8" style={{ marginLeft: 'auto' }} />
              </Pressable>
            </View>

            {/* UPI ID — shown only when a real bank is selected */}
            {bankName ? (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>UPI ID <Text style={styles.optionalTag}>(Optional)</Text></Text>
                <View style={[
                  styles.inputBox,
                  activeInput === 'upi' && styles.activeBox,
                ]}>
                  <Ionicons name="at" size={20} color="#0a63bc" />
                  <TextInput
                    placeholder="e.g. rahul@okhdfc"
                    placeholderTextColor="#94a3b8"
                    style={styles.input}
                    value={upiId}
                    onChangeText={setUpiId}
                    onFocus={() => setActiveInput('upi')}
                    onBlur={() => setActiveInput(null)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>
            ) : null}

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

      {/* CATEGORY BOTTOM SHEET — animated grid with add/delete */}
      {showCategory && (
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalCloseArea} onPress={() => { closeCategory(); setDeleteMode(false); setSelectedToDelete([]); }} />
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>

            {/* ── Header toolbar ── */}
            <View style={styles.modalHandle} />
            <View style={styles.catSheetHeader}>
              <Text style={styles.modalTitle}>Category</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {/* Delete / Done toggle */}
                {deleteMode ? (
                  <>
                    {selectedToDelete.length > 0 && (
                      <Pressable
                        style={[styles.catToolBtn, { backgroundColor: '#fef2f2' }]}
                        onPress={() => {
                          setCustomCategories(prev =>
                            prev.filter((_, i) => !selectedToDelete.includes(i))
                          );
                          const deletedVals = selectedToDelete.map(i => {
                            const item = customCategories[i];
                            return `${item.icon} ${item.label}`;
                          });
                          if (deletedVals.includes(category)) setCategory('');
                          setSelectedToDelete([]);
                          setDeleteMode(false);
                        }}
                      >
                        <Ionicons name="trash" size={14} color="#ef4444" />
                        <Text style={[styles.catToolLabel, { color: '#ef4444' }]}>Delete ({selectedToDelete.length})</Text>
                      </Pressable>
                    )}
                    <Pressable
                      style={styles.catToolBtn}
                      onPress={() => { setDeleteMode(false); setSelectedToDelete([]); }}
                    >
                      <Text style={[styles.catToolLabel, { color: '#0a63bc' }]}>Done</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    {/* Edit button — only if custom cats exist */}
                    {customCategories.length > 0 && (
                      <Pressable
                        style={styles.catToolBtn}
                        onPress={() => setDeleteMode(true)}
                      >
                        <Ionicons name="pencil" size={14} color="#64748b" />
                        <Text style={styles.catToolLabel}>Edit</Text>
                      </Pressable>
                    )}
                    {/* Add button — only if under limit */}
                    {allCategories.length < MAX_CATS && (
                      <Pressable
                        style={[styles.catToolBtn, { backgroundColor: '#eff6ff' }]}
                        onPress={() => { closeCategory(); setTimeout(() => setShowAddCategory(true), 250); }}
                      >
                        <Ionicons name="add" size={14} color="#0a63bc" />
                        <Text style={[styles.catToolLabel, { color: '#0a63bc' }]}>Add</Text>
                      </Pressable>
                    )}
                  </>
                )}
              </View>
            </View>

            {/* ── Grid ── */}
            <ScrollView>
              <View style={styles.catGrid}>
                {allCategories.map((item, i) => {
                  const val = `${item.icon} ${item.label}`;
                  const isActive = category === val;
                  const isCustom = i >= DEFAULT_CATEGORIES.length;
                  const customIdx = i - DEFAULT_CATEGORIES.length;
                  const isChecked = deleteMode && selectedToDelete.includes(customIdx);

                  return (
                    <Pressable
                      key={i}
                      style={[
                        styles.catGridItem,
                        isActive && !deleteMode && styles.catGridSelected,
                        isChecked && styles.catGridDeleteSelected,
                        deleteMode && !isCustom && { opacity: 0.45 },
                      ]}
                      onPress={() => {
                        if (deleteMode) {
                          if (!isCustom) return; // lock defaults
                          setSelectedToDelete(prev =>
                            prev.includes(customIdx)
                              ? prev.filter(x => x !== customIdx)
                              : [...prev, customIdx]
                          );
                          return;
                        }
                        setCategory(val);
                        if (errors.category) setErrors(prev => ({ ...prev, category: null }));
                        closeCategory();
                        setDeleteMode(false);
                        setSelectedToDelete([]);
                      }}
                    >
                      {deleteMode && isCustom && (
                        <View style={styles.catCheckCircle}>
                          {isChecked && <Ionicons name="checkmark" size={10} color="#fff" />}
                        </View>
                      )}
                      <Text style={styles.catGridIcon}>{item.icon}</Text>
                      <Text style={[
                        styles.catGridLabel,
                        isActive && !deleteMode && { color: '#0a63bc', fontWeight: '700' },
                        isChecked && { color: '#ef4444' },
                      ]}>
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      )}

      {/* ADD CATEGORY MODAL */}
      {showAddCategory && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <Pressable style={styles.modalCloseArea} onPress={() => { setShowAddCategory(false); setNewCatLabel(''); setNewCatIcon('📌'); }} />
          <View style={[styles.modalContent, { paddingHorizontal: 18, paddingBottom: Platform.OS === 'ios' ? 40 : 20 }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.modalHeader}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>New Category</Text>
              </View>

              {/* Icon preview + name input */}
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <View style={styles.newCatIconPreview}>
                  <Text style={{ fontSize: 28 }}>{newCatIcon}</Text>
                </View>
                <View style={[styles.inputBox, { flex: 1 }]}>
                  <TextInput
                    placeholder="Category name"
                    placeholderTextColor="#94a3b8"
                    style={styles.input}
                    value={newCatLabel}
                    onChangeText={setNewCatLabel}
                    autoFocus
                    maxLength={14}
                    returnKeyType="done"
                  />
                </View>
              </View>

              {/* Icon picker grid */}
              <Text style={[styles.bankSectionLabel, { marginBottom: 8 }]}>Pick Icon</Text>
              <View style={styles.iconPickerGrid}>
                {ICON_PICKER.map((ic, i) => (
                  <Pressable
                    key={i}
                    style={[styles.iconPickerItem, newCatIcon === ic && styles.iconPickerSelected]}
                    onPress={() => setNewCatIcon(ic)}
                  >
                    <Text style={{ fontSize: 22 }}>{ic}</Text>
                  </Pressable>
                ))}
              </View>

              {/* Save */}
              <Pressable
                style={[styles.mainBtn, styles.incomeBtn, { flex: 0, paddingHorizontal: 24, marginTop: 16 }]}
                onPress={() => {
                  const trimmed = newCatLabel.trim();
                  if (!trimmed) return;
                  const alreadyExists = allCategories.some(c => c.label.toLowerCase() === trimmed.toLowerCase());
                  if (!alreadyExists && allCategories.length < MAX_CATS) {
                    setCustomCategories(prev => [...prev, { icon: newCatIcon, label: trimmed }]);
                  }
                  setNewCatLabel('');
                  setNewCatIcon('📌');
                  setShowAddCategory(false);
                  setTimeout(() => openCategory(), 300);
                }}
              >
                <Ionicons name="checkmark" size={18} color="#fff" />
                <Text style={styles.btnText}>Save Category</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* BANK BOTTOM SHEET */}
      {showBank && (
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalCloseArea} onPress={() => setShowBank(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>Select Bank</Text>
            </View>
            <ScrollView style={styles.modalList}>

              {/* Default banks */}
              {DEFAULT_BANKS.map((item, i) => (
                <Pressable
                  key={`d-${i}`}
                  style={styles.catItem}
                  onPress={() => { setBankName(item); setShowBank(false); }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Ionicons name="business-outline" size={20} color="#0a63bc" />
                    <Text style={styles.catText}>{item}</Text>
                  </View>
                  {bankName === item && <Ionicons name="checkmark-circle" size={18} color="#0a63bc" />}
                </Pressable>
              ))}

              {/* Cash option */}
              <Pressable
                style={styles.catItem}
                onPress={() => { setBankName(''); setUpiId(''); setShowBank(false); }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Ionicons name="cash-outline" size={20} color="#10b981" />
                  <Text style={styles.catText}>Cash</Text>
                </View>
                {!bankName && <Ionicons name="checkmark-circle" size={18} color="#10b981" />}
              </Pressable>

              {/* User-added banks with delete */}
              {customBanks.length > 0 && (
                <Text style={styles.bankSectionLabel}>My Banks</Text>
              )}
              {customBanks.map((item, i) => (
                <View key={`c-${i}`} style={styles.catItem}>
                  <Pressable
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}
                    onPress={() => { setBankName(item); setShowBank(false); }}
                  >
                    <Ionicons name="business-outline" size={20} color="#0a63bc" />
                    <Text style={styles.catText}>{item}</Text>
                  </Pressable>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    {bankName === item && <Ionicons name="checkmark-circle" size={18} color="#0a63bc" />}
                    <Pressable
                      onPress={() => {
                        setCustomBanks(prev => prev.filter((_, idx) => idx !== i));
                        if (bankName === item) setBankName('');
                      }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name="trash-outline" size={16} color="#ef4444" />
                    </Pressable>
                  </View>
                </View>
              ))}

              {/* Add New Bank — hidden when limit reached */}
              {customBanks.length < MAX_CUSTOM && (
                <Pressable
                  style={[styles.catItem, { borderBottomWidth: 0, marginTop: 4 }]}
                  onPress={() => { setShowBank(false); setShowAddBank(true); }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={styles.addBankIcon}>
                      <Ionicons name="add" size={18} color="#0a63bc" />
                    </View>
                    <View>
                      <Text style={[styles.catText, { color: '#0a63bc' }]}>Add New Bank</Text>
                      <Text style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>
                        {MAX_CUSTOM - customBanks.length} slot{MAX_CUSTOM - customBanks.length !== 1 ? 's' : ''} remaining
                      </Text>
                    </View>
                  </View>
                </Pressable>
              )}
            </ScrollView>
          </View>
        </View>
      )}

      {/* ADD NEW BANK MODAL — keyboard safe */}
      {showAddBank && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <Pressable style={styles.modalCloseArea} onPress={() => { setShowAddBank(false); setNewBankName(''); }} />
          <View style={[styles.modalContent, { paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 24 }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.modalHeader}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>Add New Bank</Text>
              </View>
              <View style={[styles.inputBox, { marginBottom: 16 }]}>
                <Ionicons name="business" size={20} color="#0a63bc" />
                <TextInput
                  placeholder="e.g. Punjab National Bank"
                  placeholderTextColor="#94a3b8"
                  style={styles.input}
                  value={newBankName}
                  onChangeText={setNewBankName}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    const trimmed = newBankName.trim();
                    if (trimmed && !allBanks.includes(trimmed)) {
                      setCustomBanks(prev => [...prev, trimmed]);
                      setBankName(trimmed);
                    }
                    setNewBankName('');
                    setShowAddBank(false);
                  }}
                />
              </View>
              <Pressable
                style={[styles.mainBtn, styles.incomeBtn, { flex: 0, paddingHorizontal: 24 }]}
                onPress={() => {
                  const trimmed = newBankName.trim();
                  if (trimmed && !allBanks.includes(trimmed)) {
                    setCustomBanks(prev => [...prev, trimmed]);
                    setBankName(trimmed);
                  }
                  setNewBankName('');
                  setShowAddBank(false);
                }}
              >
                <Ionicons name="checkmark" size={18} color="#fff" />
                <Text style={styles.btnText}>Save Bank</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
    marginBottom: 16,
    marginTop: 6,
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
    borderRadius: 20,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    marginBottom: 6,
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
    flex: 1,
  },
  optionalTag: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
    textTransform: 'none',
    letterSpacing: 0,
  },
  addBankIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
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
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  catGridItem: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
    gap: 6,
  },
  catGridSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#0a63bc',
  },
  catGridIcon: {
    fontSize: 28,
  },
  catGridLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
  },
  bankSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 4,
    paddingTop: 16,
    paddingBottom: 4,
  },
  addBankIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionalTag: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
    textTransform: 'none',
    letterSpacing: 0,
  },
  catItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  catText: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
  },
  catSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  catToolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  catToolLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  catGridDeleteSelected: {
    backgroundColor: '#fff1f0',
    borderColor: '#ef4444',
  },
  catCheckCircle: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  newCatIconPreview: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  iconPickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  iconPickerItem: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
  },
  iconPickerSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#0a63bc',
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
