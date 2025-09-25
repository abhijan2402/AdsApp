import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import CustomButton from '../../Components/CustomButton';
import FONT from '../../Constants/Font';

const OTP = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30); // Resend timer
  const inputs = useRef([]);
  // Handle OTP change
  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Auto focus to next input
      if (text && index < 3) {
        inputs.current[index + 1].focus();
      }

      // ✅ Auto verify OTP when all 4 digits are filled
      if (index === 3 && text) {
        const otpCode = newOtp.join('');
        if (otpCode.length === 4) {
          handleVerify(otpCode);
        }
      }
    }
  };

  // Updated handleVerify to accept OTP code
  const handleVerify = otpCodeParam => {
    const otpCode = otpCodeParam || otp.join('');
    if (otpCode.length === 4) {
      console.log('Entered OTP:', otpCode);
      navigation.navigate('CreateProfile'); // Navigate to next screen
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  // Countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle resend OTP
  const handleResend = () => {
    setTimer(30);
    console.log('Resend OTP triggered');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Logo */}
      <Image
        source={require('../../assets/Images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to your mobile number
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({nativeEvent}) => {
              if (
                nativeEvent.key === 'Backspace' &&
                otp[index] === '' &&
                index > 0
              ) {
                inputs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>

      {/* Resend OTP */}
      <View style={styles.resendContainer}>
        <Text style={styles.timerText}>
          {timer > 0 ? `Resend OTP in ${timer}s` : ''}
        </Text>
        {timer === 0 && (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Verify Button */}
      <CustomButton
        title="Verify OTP"
        onPress={handleVerify}
        style={styles.verifyButton}
      />
    </KeyboardAvoidingView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.25,
    marginBottom: 30,
    marginTop: windowHeight * 0.155,
  },
  title: {
    fontSize: 24,
    fontFamily: FONT.SemiBold,
    color: COLOR.textDark,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: COLOR.textLight,
    marginBottom: 30,
    textAlign: 'center',
    width: '80%',
    fontFamily: FONT.Medium,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 25,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: COLOR.black,
    backgroundColor: COLOR.white,
    elevation: 3,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 14,
    color: COLOR.grey,
    marginRight: 5,
  },
  resendText: {
    fontSize: 14,
    fontFamily: FONT.SemiBold,
    color: COLOR.royalBlue,
  },
  verifyButton: {
    marginTop: 10,
    width: '90%',
  },
});
