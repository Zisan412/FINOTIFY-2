import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Bottom from "../desbord/bottom";
import Confermation from "../Modules/confermation";

const SettingItem = ({ icon, title, value, onPress, color = "#0a63bc", trailing = true }) => (
  <Pressable style={styles.item} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: color + "1a" }]}>
      <Ionicons name={icon} size={22} color={color} />
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{title}</Text>
      {value && <Text style={styles.itemValue}>{value}</Text>}
    </View>
    {trailing && <Ionicons name="chevron-forward" size={18} color="#94a3b8" />}
  </Pressable>
);

const Settings = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currency, setCurrency] = useState("INR (₹)");

  const handleCurrencyChange = () => {
    // Logic for currency change can be added here
    alert("Currency selection coming soon!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.contentScroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER SECTION */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account Settings</Text>
          </View>

          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>Z</Text>
                <View style={styles.onlineStatus} />
              </View>
              <View>
                <Text style={styles.userName}>Zisan 412</Text>
                <Text style={styles.userEmail}>zisan@finotify.app</Text>
              </View>
            </View>
            <Pressable style={styles.editProfileBtn}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </Pressable>
          </View>

          {/* SETTINGS GROUPS */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>PREFERENCES</Text>
            <View style={styles.sectionCard}>
              <SettingItem
                icon="cash-outline"
                title="Default Currency"
                value={currency}
                onPress={handleCurrencyChange}
              />
              <SettingItem
                icon="list-outline"
                title="Manage Entries"
                onPress={() => router.push("../Usersetting/ManageEntries")}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>SUPPORT & FEEDBACK</Text>
            <View style={styles.sectionCard}>
              <SettingItem
                icon="chatbubble-ellipses-outline"
                title="Send Feedback"
                color="#00897b"
                onPress={() => router.push("../Usersetting/feedback")}
              />
              <SettingItem
                icon="help-circle-outline"
                title="Help Center"
                color="#ea8600"
                onPress={() => alert("Support coming soon")}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>APP INFO</Text>
            <View style={styles.sectionCard}>
              <SettingItem
                icon="information-circle-outline"
                title="App Version"
                value="1.0.0"
                trailing={false}
                color="#64748b"
              />
            </View>
          </View>

          {/* LOGOUT BUTTON */}
          <Pressable
            style={styles.logoutBtn}
            onPress={() => setShowLogoutConfirm(true)}
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Logout from Finotify</Text>
          </Pressable>

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* FIXED BOTTOM NAVIGATION */}
        <Bottom />
      </View>

      {/* MODALS */}
      {showLogoutConfirm && (
        <Confermation
          isPressed={showLogoutConfirm}
          setIsPressed={setShowLogoutConfirm}
        />
      )}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
  },
  mainContainer: {
    flex: 1,
  },
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1e293b",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    marginBottom: 25,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#0a63bc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  onlineStatus: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  userEmail: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  editProfileBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a63bc',
  },
  section: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    marginBottom: 10,
    marginLeft: 4,
    letterSpacing: 1,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  itemValue: {
    fontSize: 12,
    color: '#0a63bc',
    fontWeight: '700',
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff5f5',
    padding: 18,
    borderRadius: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#fee2e2',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ef4444',
  },
  bottomSpace: {
    height: 100,
  }
});
