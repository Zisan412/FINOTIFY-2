import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const SettingItem = ({ icon, title, onPress }) => (
  <Pressable style={styles.item} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#0a63bc" />
    <Text style={styles.itemText}>{title}</Text>
  </Pressable>
);


const Settings = () => {
  return (
    <ScrollView style={styles.container}>
      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View
           // dummy image
          style={styles.avatar}
        >
          <Text style={styles.avtarText}>M</Text>
            </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.name}>Musab Momin</Text>
          <Text style={styles.email}>musab@email.com</Text>

          <Pressable
            style={styles.editBtn}
            onPress={() => router.push("/edit-profile")}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>

      {/* SETTINGS LIST */}
      <View style={styles.section}>
        <SettingItem
          icon="chatbubble-ellipses-outline"
          title="Feedback"
          onPress={() => router.push("/feedback")}
        />

        <SettingItem
          icon="information-circle-outline"
          title="About App"
          onPress={() => alert("Finotify v1.0")}
        />

        <SettingItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() => alert("Support coming soon")}
        />
      </View>

      {/* LOGOUT */}
      <Pressable style={styles.logoutBtn} onPress={() => router.replace("/login")}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Settings;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  profileCard: {
    backgroundColor: "#0a63bc",
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 45,
    marginBottom: 10,
    backgroundColor:'#52a0ff',
    justifyContent:'center',
    alignItems:'center',
    elevation:10
  },
  avtarText:{  
    textAlign:'center',
    fontSize:30

  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  email: {
    color: "#dbe8ff",
    fontSize: 13,
    marginBottom: 10,
  },

  editBtn: {
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },

  editText: {
    color: "white",
    fontSize: 13,
  },

  section: {
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
    elevation: 2,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  itemText: {
    marginLeft: 14,
    fontSize: 15,
    color: "#333",
  },

  logoutBtn: {
    backgroundColor: "#e53935",
    margin: 20,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: "white",
    fontWeight: "700",
  },
});
