import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Background & inner circle
import FONT from '../../../Constants/Font';
import {COLOR} from '../../../Constants/Colors';

const Ads = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [spinning, setSpinning] = useState(false);

  // Fixed points around the circle
  const rewards = [10, 20, 30, 50, 75, 100, 150, 200];
  const segmentAngle = 360 / rewards.length;

  const spinArrow = () => {
    if (spinning) return;

    setSpinning(true);

    // Random segment
    const randomIndex = Math.floor(Math.random() * rewards.length);

    // Total rotation = 5 full spins + target segment
    const totalRotation =
      360 * 5 + randomIndex * segmentAngle + segmentAngle / 2;

    Animated.timing(spinValue, {
      toValue: totalRotation,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(totalRotation % 360); // Keep last rotation
      setSpinning(false);

      // Reward user
      const earnedPoints = rewards[randomIndex];
      Alert.alert('🎉 Congratulations!', `You earned ${earnedPoints} points!`);
    });
  };

  const rotateData = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#FFF6E0', '#FFE69A', '#ffdd54ff']} // Background gradient
      // colors={['#7F00FF', '#E100FF', '#FF6EC7']} // Purple to pink gradient
      // colors={['#FF5F6D', '#FFC371']} // Red → Orange → Yellow
      // colors={['#2193b0', '#6dd5ed']} // Deep Blue → Sky Blue
      // colors={['#76b852', '#8DC26F']} // Dark Green → Light Green
      // colors={['#0f2027', '#203a43', '#2c5364']} // Dark Blue → Medium Blue → Blue Gray
      style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Spin the Arrow & Earn!</Text>

        {/* Outer Circle */}
        <View style={styles.outerCircle}>
          {/* Numbers Around Circle */}
          {rewards.map((reward, index) => {
            const angle = index * segmentAngle;
            return (
              <View
                key={index}
                style={[
                  styles.numberWrapper,
                  {
                    transform: [
                      {rotate: `${angle}deg`},
                      {translateY: -150}, // Push outward
                    ],
                  },
                ]}>
                <Text style={styles.numberText}>{reward}</Text>
              </View>
            );
          })}

          {/* Inner Circle with gradient */}
          <LinearGradient
            colors={['#FFF7D1', '#FFD700']}
            style={styles.innerCircle}>
            {/* Rotating Arrow */}
            <Animated.View
              style={[
                styles.arrowContainer,
                {transform: [{rotate: rotateData}]},
              ]}>
              <View style={styles.arrow} />
            </Animated.View>
          </LinearGradient>
        </View>

        {/* Spin Button */}
        <TouchableOpacity
          style={[styles.spinButton, spinning && {backgroundColor: '#aaa'}]}
          onPress={spinArrow}
          disabled={spinning}>
          <Text style={styles.spinButtonText}>
            {spinning ? 'Spinning...' : 'Spin Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Ads;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontFamily: FONT.Bold,
    color: COLOR.primary,
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },

  /* Outer Circle */
  outerCircle: {
    width: 270,
    height: 270,
    borderRadius: 150,
    borderWidth: 6,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },

  /* Numbers Around Circle */
  numberWrapper: {
    position: 'absolute',
    top: 115,
    left: 115,
    transform: [{translateX: -10}, {translateY: -10}],
  },
  numberText: {
    fontSize: 18,
    fontFamily: FONT.Bold,
    color: '#333',
  },

  /* Inner Circle */
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  /* Rotating Arrow */
  arrowContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 50,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF4500',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  /* Spin Button */
  spinButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginTop: 40,
  },
  spinButtonText: {
    fontSize: 18,
    fontFamily: FONT.SemiBold,
    color: '#fff',
  },
});
