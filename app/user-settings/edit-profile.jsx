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
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BASE_URL } from "../../constants/Config";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userName').then(name => { if (name) setUserName(name); });
    AsyncStorage.getItem('userEmail').then(email => { if (email) setUserEmail(email); });
    AsyncStorage.getItem('userId').then(id => { if (id) setUserId(id); });
  }, []);

  const handleUpdate = async () => {
    if (!userName.trim() || !userEmail.trim()) {
      Alert.alert("Error", "Name and email cannot be empty.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User details missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(`${BASE_URL}/usertable/update-profile`, {
        userId: userId,
        newName: userName,
        newEmail: userEmail,
      });

      if (response.data.success) {
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userEmail', userEmail);
        Alert.alert("Success", "Profile updated successfully! 🚀");
        router.replace("/user-settings/setting"); // Go back to settings page
      } else {
        Alert.alert("Error", response.data.message || "Could not update profile.");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Failed to connect to the server.";
      Alert.alert("Error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
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
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>Update your Finotify account</Text>
          </View>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={32} color="#0a63bc" />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                placeholder="Enter your name"
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={userEmail}
                onChangeText={setUserEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                pressed && styles.btnPressed,
                (!userName.trim() || !userEmail.trim()) && styles.disabledBtn
              ]}
              onPress={handleUpdate}
              disabled={isSubmitting || !userName.trim() || !userEmail.trim()}
            >
              <Text style={styles.submitText}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Text>
              {!isSubmitting && <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

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
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
    fontSize: 16,
    color: '#1e293b',
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
    marginTop: 10,
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
