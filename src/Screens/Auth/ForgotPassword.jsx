import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import CustomButton from '../../Components/CustomButton';
import FONT from '../../Constants/Font';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email.trim()) {
      alert('Please enter your registered email address.');
      return;
    }
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: COLOR.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust for header height
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png', // same logo as login
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your registered email address and we’ll send you a link to
            reset your password.
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={COLOR.grey}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            returnKeyType="done"
          />

          {/* Submit Button */}
          <CustomButton
            title={'Send Reset Link'}
            onPress={handleReset}
            style={styles.submitButton}
          />

          {/* Back to Login */}
          <TouchableOpacity
            style={styles.backToLoginContainer}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: COLOR.white,
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.18,
    marginBottom: 25,
    marginTop: windowHeight * 0.08,
  },
  title: {
    fontSize: 24,
    fontFamily: FONT.Bold,
    color: COLOR.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLOR.textLight,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: FONT.Medium,
    paddingHorizontal: 15,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: COLOR.black,
    marginBottom: 20,
    backgroundColor: COLOR.white,
    elevation: 2,
    fontFamily: FONT.Medium,
  },
  submitButton: {
    marginTop: 10,
    width: '90%',
  },
  backToLoginContainer: {
    marginTop: 25,
  },
  backToLoginText: {
    color: COLOR.primary,
    fontFamily: FONT.Medium,
    fontSize: 14,
  },
});
