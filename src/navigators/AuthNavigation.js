import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../Screens/Auth/OnBoarding';
import Login from '../Screens/Auth/Login';
import OTP from '../Screens/Auth/OTP';
import CreateProfile from '../Screens/Auth/CreateProfile';
import SignUp from '../Screens/Auth/SignUp';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import BottomNavigation from './BottomNavigation';
import BankAccountDetails from '../Screens/Private/Account/BankAccountDetails';
import TransactionHistory from '../Screens/Private/Account/TransactionHistory';
import DailyEarning from '../Screens/Private/Account/DailyEarning';
import Cms from '../Screens/Private/Account/Cms';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="OnBoarding" component={OnBoarding} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="BankAccountDetails" component={BankAccountDetails} />
      <Stack.Screen name="Cms" component={Cms} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      <Stack.Screen name="DailyEarning" component={DailyEarning} />


    </Stack.Navigator>
  );
};

export default AuthStack;
