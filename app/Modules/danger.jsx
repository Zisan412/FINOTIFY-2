import { StyleSheet, Text, View, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'

const Danger = ({ errror, visible = true }) => {
 

  

  return (
    <View
      style={[
        styles.container,
        // { transform: [{ translateY: slideAnim }], opacity: opacityAnim },
      ]}
    >
      <View style={styles.dot} />
      <Text style={styles.text}>{errror}</Text>
    </View>
  )
}

export default Danger

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#ff0000',
    borderColor: '#de4a4a',
    borderWidth: 1,
    borderRadius: 999,
    position: 'absolute',
    alignSelf: 'center',
    top: 80,
    elevation: 12,
    shadowColor: '#de4a4a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ff0000',
  },
  text: {
    color: '#fcdcdc',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
})