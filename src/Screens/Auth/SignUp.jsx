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

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Account created successfully!');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: COLOR.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png', // Random placeholder logo
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Sign up to start earning rewards by watching ads!
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
            returnKeyType="next"
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLOR.grey}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}>
              <Image
                source={{
                  uri: showPassword
                    ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png' // Eye open
                    : 'https://cdn-icons-png.flaticon.com/512/565/565655.png', // Eye closed
                }}
                style={styles.eyeImage}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm your password"
              placeholderTextColor={COLOR.grey}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}>
              <Image
                source={{
                  uri: showConfirmPassword
                    ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png'
                    : 'https://cdn-icons-png.flaticon.com/512/565/565655.png',
                }}
                style={styles.eyeImage}
              />
            </TouchableOpacity>
          </View>

          {/* Create Account Button */}
          <CustomButton
            title={'Create Account'}
            onPress={handleSignUp}
            style={styles.signUpButton}
          />

          {/* Already Have Account Link */}
          <View style={styles.loginRedirectContainer}>
            <Text style={styles.loginRedirectText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginRedirectLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: COLOR.textLight,
    textAlign: 'center',
    marginBottom: 25,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLOR.white,
    elevation: 2,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: FONT.Medium,
    color: COLOR.black,
  },
  eyeIcon: {
    paddingHorizontal: 5,
  },
  eyeImage: {
    width: 22,
    height: 22,
    tintColor: COLOR.grey,
  },
  signUpButton: {
    marginTop: 10,
    width: '90%',
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginRedirectText: {
    color: COLOR.textDark,
    fontSize: 14,
    fontFamily: FONT.Regular,
  },
  loginRedirectLink: {
    color: COLOR.primary,
    fontSize: 14,
    fontFamily: FONT.Medium,
  },
});
