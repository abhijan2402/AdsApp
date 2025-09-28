import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FONT from '../../../Constants/Font';
import {COLOR} from '../../../Constants/Colors';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import {useApi} from '../../../Backend/Api';
import {useToast} from '../../../Constants/ToastContext';
import {api_routes} from '../../../Constants/ApiRoute';

const Ads = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [spinning, setSpinning] = useState(false);
  const [adsToShow, setAdsToShow] = useState(0);
  const {postRequest} = useApi();
  const {showToast} = useToast();
  const rewards = [50, 100, 150, 200, 250]; // Reward points
  const segmentAngle = 360 / rewards.length;

  // Hook for interstitial ads
  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    TestIds.INTERSTITIAL_VIDEO,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  // Load interstitial ad immediately
  useEffect(() => {
    console.log('loading');

    load();
  }, [load]);

  // Handle closing of an interstitial
  useEffect(() => {
    if (isClosed && adsToShow > 0) {
      console.log('HI');

      setAdsToShow(prev => prev - 1); // Reduce count
      CallReward();
      load(); // Load next ad
    }
  }, [isClosed]);
  const CallReward = async () => {
    try {
      const body = {
        adId: '123132',
        pointsEarned: 50,
        adDuration: 5,
      };
      const response = await postRequest(api_routes.add_new_earning, body);
      console.log(response, 'RESPPPPP');
    } catch (error) {
      showToast(error.error, 'error');
    }
  };
  const spinArrow = () => {
    if (spinning) return;

    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const totalRotation =
      360 * 5 + randomIndex * segmentAngle + segmentAngle / 2;

    Animated.timing(spinValue, {
      toValue: totalRotation,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(totalRotation % 360);
      setSpinning(false);

      const earnedPoints = rewards[randomIndex];
      Alert.alert('🎉 Congratulations!', `You earned ${earnedPoints} points!`);

      // Show multiple interstitial ads based on points
      const numAds = Math.floor(earnedPoints / 50);
      console.log(numAds, 'ADSSSSSSSSSS');
      if (numAds > 0) {
        setAdsToShow(numAds);
      }
    });
  };

  // Show interstitial whenever adsToShow > 0 and ad is loaded
  useEffect(() => {
    if (adsToShow > 0 && isLoaded) {
      show();
    }
  }, [adsToShow, isLoaded]);

  const rotateData = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#FFF6E0', '#FFE69A', '#ffdd54ff']}
      style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Spin the Arrow & Earn!</Text>

        {/* Outer Circle */}
        <View style={styles.outerCircle}>
          {rewards.map((reward, index) => {
            const angle = index * segmentAngle;
            return (
              <View
                key={index}
                style={[
                  styles.numberWrapper,
                  {transform: [{rotate: `${angle}deg`}, {translateY: -150}]},
                ]}>
                <Text style={styles.numberText}>{reward}</Text>
              </View>
            );
          })}

          {/* Inner Circle */}
          <LinearGradient
            colors={['#FFF7D1', '#FFD700']}
            style={styles.innerCircle}>
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
  gradientBackground: {flex: 1},
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
  numberWrapper: {
    position: 'absolute',
    top: 115,
    left: 115,
    transform: [{translateX: -10}, {translateY: -10}],
  },
  numberText: {fontSize: 18, fontFamily: FONT.Bold, color: '#333'},
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
  spinButtonText: {fontSize: 18, fontFamily: FONT.SemiBold, color: '#fff'},
});
