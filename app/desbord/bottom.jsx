import { Pressable, StyleSheet, Text, View, Platform, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Bottom = () => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  // Create individual scale animations for each tab button
  const scaleHome = useRef(new Animated.Value(1)).current;
  const scaleStats = useRef(new Animated.Value(1)).current;
  const scaleDue = useRef(new Animated.Value(1)).current;
  const scaleSettings = useRef(new Animated.Value(1)).current;

  const animatePress = (scaleValue) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();
  };

  const isActive = (path) => pathname.includes(path);

  return (
    <View style={[
      styles.footerContainer,
      {
        paddingBottom: Platform.OS === 'ios' ? insets.bottom : Math.max(insets.bottom, 12)
      }
    ]}>
      <View style={styles.footer}>
        {/* HOME */}
        <Pressable
          style={styles.foot}
          onPress={() => {
            animatePress(scaleHome);
            router.replace('/desbord/desbord');
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleHome }] }}>
            <MaterialIcons 
              name="home-filled" 
              size={isActive('desbord') ? 28 : 24} 
              color={isActive('desbord') ? "white" : "rgba(255,255,255,0.6)"} 
            />
          </Animated.View>
          <Text style={[styles.fonts, { color: isActive('desbord') ? "white" : "rgba(255,255,255,0.6)", fontWeight: isActive('desbord') ? 'bold' : 'normal' }]}>Home</Text>
        </Pressable>

        {/* STATS */}
        <Pressable 
          style={styles.foot} 
          onPress={() => {
            animatePress(scaleStats);
            router.replace('/charts/headr');
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleStats }] }}>
            <Ionicons 
              name="stats-chart" 
              size={isActive('charts') ? 28 : 24} 
              color={isActive('charts') ? "white" : "rgba(255,255,255,0.6)"} 
            />
          </Animated.View>
          <Text style={[styles.fonts, { color: isActive('charts') ? "white" : "rgba(255,255,255,0.6)", fontWeight: isActive('charts') ? 'bold' : 'normal' }]}>Stats</Text>
        </Pressable>

        {/* ADD DATA BUTTON (CENTER) */}
        <View style={styles.addBtnContainer}>
          <Pressable 
            style={({ pressed }) => [styles.addbtn, pressed && { transform: [{ scale: 0.9 }] }]} 
            onPress={() => router.push('/desbord/adddata')}
          >
            <Ionicons name="add" size={48} color="white" />
          </Pressable>
        </View>

        {/* DUE */}
        <Pressable 
          style={styles.foot} 
          onPress={() => {
            animatePress(scaleDue);
            router.replace('/DuePyment/due');
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleDue }] }}>
            <Ionicons 
              name="time" 
              size={isActive('DuePyment') ? 28 : 24} 
              color={isActive('DuePyment') ? "white" : "rgba(255,255,255,0.6)"} 
            />
          </Animated.View>
          <Text style={[styles.fonts, { color: isActive('DuePyment') ? "white" : "rgba(255,255,255,0.6)", fontWeight: isActive('DuePyment') ? 'bold' : 'normal' }]}>Due</Text>
        </Pressable>

        {/* SETTINGS */}
        <Pressable 
          style={styles.foot} 
          onPress={() => {
            animatePress(scaleSettings);
            router.replace('/Usersetting/setting');
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleSettings }] }}>
            <Ionicons 
              name="settings-sharp" 
              size={isActive('Usersetting') ? 28 : 24} 
              color={isActive('Usersetting') ? "white" : "rgba(255,255,255,0.6)"} 
            />
          </Animated.View>
          <Text style={[styles.fonts, { color: isActive('Usersetting') ? "white" : "rgba(255,255,255,0.6)", fontWeight: isActive('Usersetting') ? 'bold' : 'normal' }]}>Setting</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Bottom

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0a63bc", // Solid premium blue for consistency
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 20,
  },
  footer: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  fonts: {
    fontSize: 10,
    textTransform: 'capitalize',
    marginTop: 4,
  },
  foot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  addBtnContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  addbtn: {
    marginTop: -55,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#0a63bc",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 6,
    borderColor: "white",
  },
});