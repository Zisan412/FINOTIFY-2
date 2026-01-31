import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Danger from "../Modules/danger";
import { router } from "expo-router";

const AddData = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "Food 🍔",
    "Salary 💰",
    "Travel ✈️",
    "House 🏠",
    "Sports 🏀",
    "Other 📦",
  ];

  const submit = (type) => {
    if (!amount || !category || !desc) {
      setError("Please fill all fields ❌");
      setTimeout(() => setError(""), 2000);
      return;
    }

    console.log({
      type,
      date,
      amount,
      category,
      desc,
    });

    setError("Data saved successfully ✅");
    setTimeout(() => setError(""), 2000);

    setAmount("");
    setCategory("");
    setDesc("");
  };

  return (
    <ImageBackground
      // source={require("../../assets/ChatGPT Image Jan 21, 2026, 07_34_58 PM.png")}
      style={styles.bg}
    >

      {/* HEADER */}
      <Text style={styles.title}>Add Income / Expense</Text>

      {/* CARD */}
      <View style={styles.card}>
        {/* DATE */}
        <Pressable style={styles.inputRow} onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar-outline" size={20} color="#0a63bc" />
          <Text style={styles.inputText}>{date.toDateString()}</Text>
        </Pressable>

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

        {/* AMOUNT */}
        <View style={styles.inputRow}>
          <Ionicons name="cash-outline" size={20} color="#0a63bc" />
          <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* CATEGORY */}
        <Pressable
          style={styles.inputRow}
          onPress={() => setShowCategory(true)}
        >
          <Ionicons name="apps-outline" size={20} color="#0a63bc" />
          <Text style={styles.inputText}>
            {category || "Select Category"}
          </Text>
        </Pressable>
        

        {/* DESCRIPTION */}
        <View style={styles.inputRow}>
          <Ionicons name="document-text-outline" size={20} color="#0a63bc" />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={desc}
            onChangeText={setDesc}
            multiline
          />
        </View>

        {/* BUTTONS */}
        <View style={styles.row}>
          <Pressable
            style={[styles.btn, styles.income]}
            onPress={() => submit("income")}
          >
            <Text style={styles.btnText}>Income</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.expense]}
            onPress={() => submit("expense")}
          >
            <Text style={styles.btnText}>Expense</Text>
          </Pressable>
        </View>

      
      </View>
          <Pressable
          style={[ styles.due]}
          onPress={() => {submit("due") ,router.push('../DuePyment/addduepy')}}
        >
          <Text style={styles.btnText}>Add Due Payment</Text>
          <Ionicons name="add-outline" size={18} color="#fff" />
        </Pressable>
      {/* CATEGORY MODAL */}
      {showCategory && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select Category</Text>
          <Ionicons name="close-circle-outline" size={24} color="#555" style={{position:'absolute',right:20,top:20}} onPress={()=>setShowCategory(false)}/>
          <ScrollView>
            {categories.map((item, i) => (
              <Pressable
                key={i}
                style={styles.cat}
                onPress={() => {
                  setCategory(item);
                  setShowCategory(false);
                }}
              >
                <Text style={styles.catText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      
    </ImageBackground>
  );
};

export default AddData;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 6,
    height: "55%",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 14,
  },

  input: {
    flex: 1,
    fontSize: 15,
  },

  inputText: {
    fontSize: 15,
    color: "#555",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  btn: {
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },

  income: {
    backgroundColor: "#0a63bc",
  },

  expense: {
    backgroundColor: "#ff3b3b",
  },

  due: {
    backgroundColor: "#1343ac",
    marginTop: 15,
    height:45,
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap:6,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  modal: {
    position:'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
    padding: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  
  },

  cat: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  catText: {
    fontSize: 16,
  },
});
