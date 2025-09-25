import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLOR} from '../../../Constants/Colors';
import Header from '../../../Components/FeedHeader';

const RequestRide = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Ride Info */}
      <Header
        title={'Request Ride'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.section}>
        <Text style={styles.subTitle}>SF ➔ Palo Alto</Text>
        <Text style={styles.detail}>Sep 14 • 08:30 AM • $12/seat</Text>
      </View>

      {/* Pickup Stop */}
      <View style={styles.section}>
        <Text style={styles.label}>Pickup stop</Text>
        <TextInput
          style={styles.input}
          placeholder="500 Howard St, SF"
          placeholderTextColor={COLOR.grey}
        />
      </View>

      {/* Seats + Estimated Total */}
      <View style={[styles.section, styles.rowBetween]}>
        <View>
          <Text style={styles.label}>Seats</Text>
          <TextInput
            style={styles.inputSmall}
            value="1"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Estimated total</Text>
          <Text style={styles.total}>$12.00</Text>
        </View>
      </View>

      {/* Message to Driver */}
      <View style={styles.section}>
        <Text style={styles.label}>Message to Car Owner (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Hi Alex! Can you pick me up near the lobby?"
          placeholderTextColor={COLOR.grey}
          multiline
        />
      </View>

      {/* Payment Method */}
      {/* <View style={styles.section}>
        <Text style={styles.label}>Payment method</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.paymentBtn}>
            <Text style={styles.paymentText}>💳 Card **** 4242</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentBtn}>
            <Text style={styles.paymentText}>💰 Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentBtn}>
            <Text style={styles.paymentText}>➕ Add New</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Action Buttons */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          {/* <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>⬅ Back</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>🚗 Send Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ride Overview */}
      <View style={styles.overview}>
        <Text style={styles.overviewTitle}>Ride Overview</Text>
        <Text style={styles.overviewText}>From: 500 Howard St, SF</Text>
        <Text style={styles.overviewText}>To: Palo Alto Transit Center</Text>
        <Text style={styles.overviewText}>Date: 2025-09-14</Text>
        <Text style={styles.overviewText}>Time: 08:30 AM</Text>
        <Text style={styles.overviewText}>Price/seat: $12.00</Text>
      </View>
    </ScrollView>
  );
};

export default RequestRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // padding: 16,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.textDark,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.primary,
  },
  detail: {
    fontSize: 14,
    color: COLOR.textLight,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.textDark,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: 8,
    padding: 10,
    color: COLOR.textDark,
    backgroundColor: COLOR.white,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 60,
    textAlign: 'center',
    color: COLOR.textDark,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.green,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentBtn: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: COLOR.white,
  },
  paymentText: {
    fontSize: 14,
    color: COLOR.textDark,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLOR.white,
  },
  secondaryText: {
    color: COLOR.textDark,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: COLOR.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  primaryText: {
    color: COLOR.white,
    fontWeight: '700',
  },
  overview: {
    backgroundColor: COLOR.lightBlue,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginHorizontal: 16,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.textDark,
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 14,
    color: COLOR.textLight,
    marginBottom: 4,
  },
});
