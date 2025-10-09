import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Home from '../Screens/Private/Dashboard/Home';
import {COLOR} from '../Constants/Colors';
import Profile from '../Screens/Private/Account/Profile';
import BookingHistory from '../Screens/Private/History/BookingHistory';
import ReceivedBooking from '../Screens/Private/History/ReceivedBooking';
import FONT from '../Constants/Font';
import Ads from '../Screens/Private/Ads/Ads';
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  // const {strings} = useContext(LanguageContext);
  const insets = useSafeAreaInsets();

  const icons = {
    Home: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png',
    Earn: 'https://cdn-icons-png.flaticon.com/128/7253/7253092.png',
    BookingHistory: 'https://cdn-icons-png.flaticon.com/128/839/839860.png',
    Profile: 'https://cdn-icons-png.flaticon.com/128/456/456283.png',
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: COLOR.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
          fontFamily: FONT.Medium,
        },
        tabBarStyle: {
          paddingVertical: 8,
          height: 60 + insets.bottom, // Add safe area bottom inset for Android/iOS
          paddingBottom: 0 + insets.bottom, // Padding to prevent overlap with nav buttons

          height:
            Platform.OS === 'android' && Platform.Version < 35 // Android 14 and below
              ? 60 // don’t add inset because it already has nav bar spacing
              : 60 + insets.bottom, // Android 15+ or iOS
          paddingBottom:
            Platform.OS === 'android' && Platform.Version < 35
              ? 0
              : insets.bottom,
        },
        tabBarIcon: ({focused}) => {
          const iconUri = icons[route.name];

          return (
            <Image
              source={{uri: iconUri}}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? COLOR.primary : 'gray',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarLabel: ({color}) => {
          let label = route.name;
          if (route.name === 'MyBids') label = 'My Bids'; // Fix label spacing

          return (
            <Text
              style={{
                color,
                fontSize: 10,
                marginTop: 4,
                textAlign: 'center',
                fontFamily: FONT.Medium,
              }}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'Earn'} component={Ads} />
      {/* <Tab.Screen name={'BookingHistory'} component={ReceivedBooking} /> */}
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
