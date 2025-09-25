import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import { View } from 'react-native';
import OfferRide from '../Screens/Private/Dashboard/OfferRide';
import BrowseRides from '../Screens/Private/Dashboard/BrowseRides';
import RequestRide from '../Screens/Private/Dashboard/RequestRide';
import BankAccountDetails from '../Screens/Private/Account/BankAccountDetails';
import Cms from '../Screens/Private/Account/Cms';
import CreateProfile from '../Screens/Auth/CreateProfile';
import BookingDetail from '../Screens/Private/History/BookingDetail';
import Vehicle from '../Screens/Private/Account/Vehicle';
import RequestList from '../Screens/Private/Dashboard/RequestList';
import TransactionHistory from '../Screens/Private/Account/TransactionHistory';
import DailyEarning from '../Screens/Private/Account/DailyEarning';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="BottomNavigation"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
                <Stack.Screen name="OfferRide" component={OfferRide} />
                <Stack.Screen name="BrowseRides" component={BrowseRides} />
                <Stack.Screen name="RequestRide" component={RequestRide} />
                <Stack.Screen name="BankAccountDetails" component={BankAccountDetails} />
                <Stack.Screen name="Cms" component={Cms} />
                {/* <Stack.Screen name="CreateProfile" component={CreateProfile} /> */}
                <Stack.Screen name="BookingDetail" component={BookingDetail} />
                <Stack.Screen name="Vehicle" component={Vehicle} />
                <Stack.Screen name="RequestList" component={RequestList} />
                <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
                <Stack.Screen name="DailyEarning" component={DailyEarning} />



            </Stack.Navigator>
            <View style={{ marginBottom: 50 }}>
            </View>
        </>
    );
};

export default RootNavigation;
