import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import CustomButton from '../../Components/CustomButton';
import FONT from '../../Constants/Font';
import { useApi } from '../../Backend/Api';
import { api_routes } from '../../Constants/ApiRoute';
import { AuthContext } from '../../Backend/AuthContent';
import { useToast } from '../../Constants/ToastContext';

const Login = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { postRequest } = useApi();
  const { showToast } = useToast();
  const auth = useContext(AuthContext);
  const {setUser, setToken} = auth;

  const login=async()=>{
    try {
      if(!email){
        showToast('Email is required');
        return;
      }
      if(!password){
        showToast('Password is requied','error');
        return;
      }
      const body = {
        email: email,
        password: password
      }
      const response = await postRequest(api_routes.login,body);
      if(!response.success)
        throw response;
      setUser(response?.data?.response?.user) 
      setToken(response?.data?.response?.token)
      // navigation.navigate('SignUp')
    } catch (error) {
      showToast(error.error,'error');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: COLOR.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Dismiss Keyboard on outside tap */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png', // Random logo
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>Welcome to AdRewards</Text>
          <Text style={styles.subtitle}>
            Earn rewards by simply watching ads!
          </Text>

          {/* Instruction Line */}
          <Text style={styles.infoText}>
            Login with your email and password to continue
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
            blurOnSubmit={false}
          />

          {/* Password Input with Eye Toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLOR.grey}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}>
              <Image
                source={{
                  uri: passwordVisible
                    ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png' // Eye Open
                    : 'https://cdn-icons-png.flaticon.com/512/565/565655.png', // Eye Closed
                }}
                style={styles.eyeImage}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <CustomButton
            title={'Login'}
            onPress={login}
            style={styles.loginButton}
          />

          {/* Create Account Link */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
              <Text style={styles.createAccountLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
    height: windowHeight * 0.2,
    marginBottom: 25,
    marginTop: windowHeight * 0.08,
  },
  title: {
    fontSize: 24,
    fontFamily: FONT.Bold,
    color: COLOR.textDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLOR.textLight,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: FONT.Medium,
  },
  infoText: {
    fontSize: 14,
    color: COLOR.textDark,
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: FONT.Medium,
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLOR.primary,
    fontFamily: FONT.Medium,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 10,
    width: '90%',
  },
  createAccountContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  createAccountText: {
    color: COLOR.textDark,
    fontSize: 14,
    fontFamily: FONT.Regular,
  },
  createAccountLink: {
    color: COLOR.primary,
    fontSize: 14,
    fontFamily: FONT.Medium,
  },
});
