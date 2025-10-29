import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import FONT from '../../../Constants/Font';
import {COLOR} from '../../../Constants/Colors';
import {useRewardedAd, TestIds} from 'react-native-google-mobile-ads';
import {useApi} from '../../../Backend/Api';
import {useToast} from '../../../Constants/ToastContext';
import {api_routes} from '../../../Constants/ApiRoute';

const Ads = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [spinning, setSpinning] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const {postRequest} = useApi();
  const {showToast} = useToast();

  // Reward values
  const rewards = [50, 100, 150, 200, 250];
  const segmentAngle = 360 / rewards.length;

  // Safe __DEV__ check (prevents "Dev does not exist" error)
  const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : false;

  // Ad unit id
  const adUnitId = isDev
    ? TestIds.REWARDED
    : 'ca-app-pub-3056425951476582/5056383221'; // replace with your real id for prod

  // useRewardedAd hook
  // Note: different versions of the library may expose slightly different props.
  // This destructuring matches the common API: isLoaded, isClosed, isEarnedReward, load, show, reward, error
  const {isLoaded, isClosed, isEarnedReward, load, show, reward, error} =
    useRewardedAd(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

  // Local "loading" state to show messages if needed
  const [adLoading, setAdLoading] = useState(false);

  // Load ad on mount
  useEffect(() => {
    (async () => {
      try {
        setAdLoading(true);
        await load();
      } catch (e) {
        // load() might not throw depending on library version; handle defensively
        console.log('Initial ad load failed:', e);
      } finally {
        setAdLoading(false);
      }
    })();
  }, [load]);

  // Reload when ad is closed (prepare next)
  useEffect(() => {
    if (isClosed) {
      console.log('Ad closed → reloading...');
      // small delay to avoid quick reload races
      setTimeout(() => {
        try {
          load();
        } catch (e) {
          console.log('Reload after close failed:', e);
        }
      }, 500);
    }
  }, [isClosed, load]);

  // When user earns reward — call backend
  useEffect(() => {
    if (isEarnedReward && reward) {
      console.log('Reward Earned event:', reward);
      // reward object may contain amount or type depending on setup
      CallReward(earnedPoints);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEarnedReward, reward]);

  // Retry on ad error
  useEffect(() => {
    if (error) {
      console.log('Ad error:', error);
      // show a soft message to user and attempt reload
      showToast('Ad failed to load, retrying...', 'info');
      // try reload after short delay
      setTimeout(() => {
        try {
          load();
        } catch (e) {
          console.log('Retry load failed:', e);
        }
      }, 1500);
    }
  }, [error, load, showToast]);

  // Fallback periodic reload if ad stays unloaded
  useEffect(() => {
    const id = setInterval(() => {
      if (!isLoaded) {
        console.log('Periodic reload attempt for rewarded ad...');
        try {
          load();
        } catch (e) {
          console.log('Periodic load error:', e);
        }
      }
    }, 15000); // every 15s
    return () => clearInterval(id);
  }, [isLoaded, load]);

  // Reward API call
  const CallReward = async points => {
    try {
      const body = {
        adId: '123132',
        pointsEarned: points,
        adDuration: 5,
      };
      const response = await postRequest(api_routes.add_new_earning, body);
      console.log(response, 'Reward Response');
      showToast(`You earned ${points} points!`, 'success');
    } catch (err) {
      console.log('CallReward error:', err);
      showToast(err?.error || 'Error while rewarding', 'error');
    }
  };

  // Spin logic
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

      const points = rewards[randomIndex];
      setEarnedPoints(points);
      setShowRewardModal(true);

      // Show rewarded ad after short delay
      setTimeout(async () => {
        try {
          if (isLoaded) {
            // Some library versions require show() to be awaited or handled as promise
            try {
              await show();
            } catch (e) {
              console.log('show() threw:', e);
              showToast('Could not show ad. Reloading...', 'info');
              load();
            }
          } else {
            // If ad not loaded, trigger a reload + try once more
            showToast('Ad loading — please wait a moment...', 'info');
            try {
              await load();
            } catch (e) {
              console.log('load during fallback failed:', e);
            }

            // try show after small wait
            setTimeout(async () => {
              if (isLoaded) {
                try {
                  await show();
                } catch (e) {
                  console.log('second show() attempt failed:', e);
                  showToast(
                    'Ad not available right now, try again later.',
                    'error',
                  );
                }
              } else {
                showToast(
                  'Ad still not ready, please try again later.',
                  'error',
                );
              }
            }, 1500);
          }
        } catch (e) {
          console.log('Ad show / fallback error:', e);
          showToast(
            'Something went wrong with the ad. Try again later.',
            'error',
          );
        }
      }, 3000);
    });
  };

  const rotateData = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#FFF6E0', '#FFE69A', '#ffdd54ff']}
      style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={[styles.title, {marginBottom: 10}]}>
          Spin the Arrow & Earn!
        </Text>
        <Text style={styles.title}>50 Points = 1 Ad</Text>

        {/* Wheel */}
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

        {/* Small ad status hint */}
        <View style={{marginTop: 12}}>
          <Text style={{fontFamily: FONT.SemiBold, color: '#444'}}>
            {isLoaded
              ? 'Ad ready'
              : adLoading
              ? 'Loading ad...'
              : 'Ad not loaded'}
          </Text>
        </View>
      </View>

      {/* Reward Modal */}
      <Modal
        visible={showRewardModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRewardModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <LottieView
              source={require('../../../assets/Lottie/Coins.json')}
              autoPlay
              loop={false}
              style={{width: 200, height: 250}}
              onAnimationFinish={() => setShowRewardModal(false)}
            />
            <Text style={styles.rewardText}>
              🎉 You earned {earnedPoints} points!
            </Text>
          </View>
        </View>
      </Modal>
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
  },
  spinButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginTop: 40,
  },
  spinButtonText: {
    fontSize: 18,
    fontFamily: FONT.SemiBold,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: 280,
  },
  rewardText: {
    fontSize: 18,
    fontFamily: FONT.Bold,
    color: COLOR.primary,
    marginTop: 10,
    textAlign: 'center',
  },
});
