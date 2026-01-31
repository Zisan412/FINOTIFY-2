import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import Upper from "../Modules/Upper";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Danger from "../Modules/danger";
const Newpass = () => {
  const [press, setpress] = useState(0);
  const [chnage, setchnage] = useState(false);
  const [hide, sethide] = useState(10);
  const [hide2, sethide2] = useState(11);
  const [chnage2, setchnage2] = useState(false);
  const [error, seterror] = useState("");
  const [mobile, setmobile] = useState("");
  const [pass, setpass] = useState("");
  const [pass2, setpass2] = useState("");

  const hideing = () => {
    setchnage(true);
    sethide(9);
  };
  const show = () => {
    setchnage(false);
    sethide(10);
  };

  const hideing2 = () => {
    setchnage2(true);

    sethide2(11);
  };
  const show2 = () => {
    setchnage2(false);
    sethide2(12);
  };

  const sub = () => {
    if (mobile == "" || pass == "" || pass2 == "") {
      alert("please enter a valid detail");

      setTimeout(() => {
        seterror("");
      }, 2000);
    } else if (pass != pass2) {
      seterror("no match password");

      setTimeout(() => {
        seterror("");
      }, 2000);
    } else {
      router.push("./login");
    }
  };

  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      {/* TOP IMAGE */}
      {/* <Image
        source={require("../../assets/Forgget.png")}
        style={styles.container2}
      /> */}
      <View style={{ paddingTop: 0,marginTop: 100 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            textTransform: "capitalize",
            fontFamily: "",
          }}
        >
          update password
        </Text>
      </View>
      <View style={styles.input}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 14,
            marginTop: 10,
            elevation: 3,
            backgroundColor: "white",
            height: "14%",
          }}
        >
          <Ionicons
            name={"call"}
            size={24}
            color={"#0a63bcd5"}
            style={{}}
          ></Ionicons>

          <TextInput
            style={[styles.inp, press == 1 && { opacity: 1 }]}
            onFocus={() => setpress(1)}
            onBlur={() => setpress(0)}
            placeholder="mobile number"
            keyboardType="numeric"
            value={mobile}
            onChangeText={setmobile}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 14,
            marginTop: 10,
            elevation: 3,
            backgroundColor: "white",
            height: "14%",
          }}
        >
          <MaterialIcons
            name={"security"}
            size={24}
            color={"#0a63bcd5"}
            style={{}}
          ></MaterialIcons>

          <TextInput
            style={[styles.inp, press == 1 && { opacity: 1 }]}
            onFocus={() => setpress(1)}
            onBlur={() => setpress(0)}
            placeholder="new password"
            secureTextEntry={chnage}
            value={pass2}
            onChangeText={setpass2}
          ></TextInput>
        </View>
        <Pressable onPress={() => hideing()}>
          {hide == 10 && (
            <Ionicons
              name="lock-open"
              size={24}
              color="gray"
              style={[{ position: "relative", right: -100, top: -40 }]}
            />
          )}
          {hide == 9 && (
            <Ionicons
              name="lock-closed"
              size={24}
              color="gray"
              style={[
                {
                  position: "relative",
                  display: "none",
                  right: -100,
                  top: -40,
                },
              ]}
            />
          )}
        </Pressable>
        <Pressable onPress={() => show()}>
          {hide == 10 && (
            <Ionicons
              name="lock-open"
              size={24}
              color="gray"
              style={[
                {
                  position: "relative",
                  display: "none",
                  right: -100,
                  top: -40,
                },
              ]}
            />
          )}
          {hide == 9 && (
            <Ionicons
              name="lock-closed"
              size={24}
              color="gray"
              style={[{ position: "relative", right: -100, top: -40 }]}
            />
          )}
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 14,
            marginTop: -14,
            elevation: 3,
            backgroundColor: "white",
          }}
        >
          <MaterialIcons
            name={"security"}
            size={24}
            color={"#0a63bcd5"}
            style={{}}
          ></MaterialIcons>

          <TextInput
            style={[styles.inp, { marginTop: 2 }, press == 1 && { opacity: 1 }]}
            onFocus={() => setpress(1)}
            onBlur={() => setpress(0)}
            placeholder="confirm new password"
            secureTextEntry={chnage2}
            value={pass}
            onChangeText={setpass}
          ></TextInput>
        </View>
        <Pressable onPress={() => hideing2()}>
          {hide2 == 12 && (
            <Ionicons
              name="lock-open"
              size={24}
              color="gray"
              style={[{ position: "relative", right: -100, top: -40 }]}
            />
          )}
          {hide2 == 11 && (
            <Ionicons
              name="lock-closed"
              size={24}
              color="gray"
              style={[
                {
                  position: "relative",
                  display: "none",
                  right: -100,
                  top: -40,
                },
              ]}
            />
          )}
        </Pressable>
        <Pressable onPress={() => show2()}>
          {hide2 == 12 && (
            <Ionicons
              name="lock-open"
              size={24}
              color="gray"
              style={[
                {
                  position: "relative",
                  display: "none",
                  right: -100,
                  top: -40,
                },
              ]}
            />
          )}
          {hide2 == 11 && (
            <Ionicons
              name="lock-closed"
              size={24}
              color="gray"
              style={[{ position: "relative", right: -100, top: -40 }]}
            />
          )}
        </Pressable>

        <Pressable
          onPress={() => sub()}
          style={[
            styles.btn,
            press === 6 && { backgroundColor: "#0a63bccb", opacity: 1 },
          ]}
          onPressIn={() => setpress(6)}
          onPressOut={() => setpress(0)}
        >
          <Text
            style={{
              color: "white",
              textTransform: "capitalize",
              width: 230,
              textAlign: "center",
            }}
          >
            update password
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Newpass;

const styles = StyleSheet.create({
  container2: {
    height: 250,
    width: 250,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 50,
    resizeMode: "cover",
  },
  inp: {
    width: 250,
    height: 50,
  },
  input: {
    height: 350,
    position: "relative",
    textTransform: "capitalize",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  label: {
    position: "absolute",
    left: 45,
    top: 20,
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: "#0a63bccb",
    height: 40,
    width: 230,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    opacity: 1,
  },
  footer: {
    backgroundColor: "skyblue",
    height: 60,
    marginTop: 121,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  ftext: {
    color: "white",
    textTransform: "capitalize",
    width: 190,
  },
});
