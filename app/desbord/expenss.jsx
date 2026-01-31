import { ScrollView, StyleSheet, Text, View,Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./all";

const Income = ({ go }) => {
  const date = new Date();
  console.log(go)

  return (
<ScrollView style={styles.container}>
      {go.map((i, index) => {
        const isExpenss = i.it === "expenss";

        return (
          isExpenss  && 
          <View
            key={index}
            style={[
              styles.card,
              { borderLeftColor: isExpenss && "#e74c3c"  },
            ]}
          >
            {/* Top Row */}
            <View style={styles.row}>
              <Text style={styles.category}>{i.cat}</Text>

              <View style={styles.amountBox}>
                <Ionicons
                  name={isExpenss && "arrow-down-circle"}
                  size={18}
                  color={isExpenss && "#e74c3c"}
                />
                <Text
                  style={[
                    styles.amount,
                    { color: isExpenss && "#e74c3c" },
                  ]}
                >
                  ₹ {i.amm}
                </Text>
                    <Pressable style={{marginLeft:10}}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="#ff3232af"
                  />
                </Pressable>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.desc}>{i.des}</Text>

            {/* Date */}
            <Text style={styles.date}>
              {date.getDate()}{" "}
              {date.toLocaleString("default", { month: "short" })},{" "}
              {date.getFullYear()}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Income;
