import { StyleSheet, Text, TouchableOpacity, View, Animated, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Confirmation = ({ isPressed, setIsPressed }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        if (isPressed) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isPressed]);

    const close = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 20,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => setIsPressed(false));
    };

    const logout = () => {
        router.replace("../Authontication/login");
    };

    if (!isPressed) return null;

    return (
        <View style={styles.overlay}>
            <Pressable style={styles.backdrop} onPress={close} />
            <Animated.View
                style={[
                    styles.card,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <View style={styles.iconBox}>
                    <Ionicons name="log-out" size={30} color="#ef4444" />
                </View>
                <Text style={styles.title}>Logout</Text>
                <Text style={styles.message}>Are you sure you want to exit from your account?</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={close}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmBtn} onPress={logout}>
                        <Text style={styles.confirmText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

export default Confirmation

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
    },
    card: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 28,
        padding: 24,
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 15,
    },
    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#fff1f1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: 8,
    },
    message: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    cancelBtn: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
    },
    cancelText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748b',
    },
    confirmBtn: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ef4444',
    },
    confirmText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
})