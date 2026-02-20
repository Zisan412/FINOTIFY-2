import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your feedback! ❤️");
      router.back();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>Feedback</Text>
            <Text style={styles.subtitle}>Help us improve Finotify</Text>
          </View>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="chatbubble-ellipses" size={32} color="#0a63bc" />
            </View>
            <Text style={styles.cardTitle}>Share your thoughts</Text>
            <Text style={styles.cardInfo}>
              Your feedback is important to us. Tell us what you like or what we can improve.
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Type your message here..."
                style={styles.input}
                multiline
                numberOfLines={6}
                value={feedback}
                onChangeText={setFeedback}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                pressed && styles.btnPressed,
                !feedback.trim() && styles.disabledBtn
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting || !feedback.trim()}
            >
              <Text style={styles.submitText}>
                {isSubmitting ? "Sending..." : "Send Feedback"}
              </Text>
              {!isSubmitting && <Ionicons name="send" size={18} color="#fff" />}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Feedback;

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
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
    marginBottom: 25,
  },
  input: {
    fontSize: 16,
    color: '#1e293b',
    minHeight: 120,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  submitBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#0a63bc',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    elevation: 8,
    shadowColor: '#0a63bc',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabledBtn: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
    elevation: 0,
  }
});