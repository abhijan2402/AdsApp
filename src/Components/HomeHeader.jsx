import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import FONT from '../Constants/Font';

const HomeHeader = ({location = 'Current Location', onNotificationPress}) => {
  return (
    <SafeAreaView style={styles.header}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/* Location */}
      <View style={styles.locationContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/535/535137.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.locationText}>{location}</Text>
      </View>

      {/* Notification */}
      <TouchableOpacity onPress={onNotificationPress}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png',
          }}
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    // fontWeight: '600',
    fontFamily: FONT.SemiBold,
    color: '#333',
  },
  notificationIcon: {
    width: 26,
    height: 26,
    tintColor: '#333',
  },
});
