import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FONT from '../Constants/Font';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../Constants/Colors';
import {windowWidth} from '../Constants/Dimensions';

const BookingCard = ({
  pickup,
  drop,
  driverName,
  date,
  price,
  status,
  passengers,
  mobile,
  showRequest,
  isReceived, // determines if it's received booking
  onPress,
}) => {
  const navigation = useNavigation();

  // Status badge color
  const getStatusColor = status => {
    switch (status) {
      case 'Pending':
        return COLOR.pending;
      case 'Accepted':
        return COLOR.primary;
      case 'Ongoing':
        return COLOR.blue;
      case 'Completed':
        return COLOR.green;
      case 'Cancelled':
        return COLOR.danger;
      default:
        return COLOR.textLight;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Top Row */}
      <View style={styles.cardRowBetween}>
        <View>
          <Text style={styles.pickupText} numberOfLines={2}>
            Pickup: {pickup}
          </Text>
          <Text style={styles.dropText} numberOfLines={2}>
            Drop: {drop}
          </Text>
          {driverName && (
            <Text style={styles.driverText}>Car Owner: {driverName}</Text>
          )}
          {isReceived && passengers && (
            <Text style={styles.driverText}>Passengers: {passengers}</Text>
          )}
          {isReceived && mobile && (
            <Text style={styles.driverText}>📞 {mobile}</Text>
          )}
        </View>

        <View style={{alignItems: 'flex-end'}}>
          {price && <Text style={styles.cardPrice}>{price}</Text>}
          {date && <Text style={styles.cardSubText}>{date}</Text>}

          {/* Status Badge */}
          {status && (
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: getStatusColor(status)},
              ]}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          )}

          {/* See Requests Button */}
          {showRequest && (
            <TouchableOpacity
              onPress={() => navigation.navigate('RequestList')}
              style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See Requests</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickupText: {
    fontSize: 14,
    fontFamily: FONT.SemiBold,
    color: '#333',
    marginBottom: 4,
    width: windowWidth / 1.8,
  },
  dropText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    fontFamily: FONT.Medium,
    width: windowWidth / 1.8,
  },
  driverText: {
    fontSize: 13,
    color: '#777',
    fontFamily: FONT.Regular,
  },
  cardSubText: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
    fontFamily: FONT.Regular,
  },
  cardPrice: {
    fontSize: 15,
    color: '#4CAF50',
    fontFamily: FONT.SemiBold,
  },
  seeAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLOR.primary,
    borderRadius: 8,
    marginTop: 6,
  },
  seeAllText: {
    color: COLOR.white,
    fontSize: 12,
    fontFamily: FONT.Medium,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  statusText: {
    fontSize: 10,
    color: COLOR.white,
    fontFamily: FONT.Bold,
  },
});
