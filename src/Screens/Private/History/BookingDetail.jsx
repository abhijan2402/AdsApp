import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import Header from '../../../Components/FeedHeader';

const BookingDetail = ({navigation}) => {
  return (
    <View style={styles.safeArea}>
      <Header
        title={'On Trip'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        {/* -------- Status Banner -------- */}
        <View style={styles.statusBanner}>
          <Text style={styles.statusText}>
            ✅ You’ve been picked up. Enjoy your ride!
          </Text>
        </View>

        {/* -------- Ride Info -------- */}
        <View style={styles.card}>
          <Text style={styles.routeTitle}>SF → Palo Alto</Text>
          <Text style={styles.subText}>ETA 32 min • 18.4 mi</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.subText}>Car Owner: Alex J.</Text>
            <Text style={styles.subText}>Card •••• 4242</Text>
          </View>

          <View style={[styles.rowBetween, {marginTop: 8}]}>
            <Text style={styles.subText}>Current ETA</Text>
            <Text style={styles.subText}>09:02 AM</Text>
          </View>
        </View>

        {/* -------- Map Placeholder -------- */}
        <View style={styles.mapBox}>
          <Image
            source={{
              uri: 'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2022/07/route-marked-on-a-map.jpg',
            }}
            style={styles.mapImage}
          />
        </View>

        {/* -------- Action Buttons -------- */}
        <View style={styles.rowBetween}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* -------- Trip Details -------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip Details</Text>
          <Text style={styles.subText}>Car: Toyota Prius • Blue • 7FGH221</Text>
          <Text style={styles.subText}>Route: US-101 S • Toll-free</Text>
          <Text style={styles.subText}>Seats: 1 of 3 occupied</Text>
        </View>

        {/* -------- Bottom Buttons -------- */}
        <View style={styles.rowBetween}>
          <TouchableOpacity style={styles.emergencyBtn}>
            <Text style={{color: COLOR.white}}>🚨 Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropBtn}>
            <Text style={{color: COLOR.white}}>Mark as Dropped</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  /* Status */
  statusBanner: {
    backgroundColor: '#E6F0FF',
    padding: 12,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.green,
  },

  /* Card */
  card: {
    backgroundColor: COLOR.white,
    margin: 12,
    padding: 14,
    borderRadius: 12,
    shadowColor: COLOR.black,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 2,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.textDark,
  },
  subText: {
    fontSize: 13,
    color: COLOR.textLight,
    marginTop: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: COLOR.textDark,
  },

  /* Map */
  mapBox: {
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    height: 150,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },

  /* Rows */
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 10,
  },

  /* Buttons */
  actionBtn: {
    flex: 1,
    padding: 10,
    margin: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
  },
  actionText: {
    fontSize: 13,
    color: COLOR.textDark,
  },
  chatBtn: {
    marginTop: 10,
    backgroundColor: COLOR.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  emergencyBtn: {
    flex: 1,
    margin: 8,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dropBtn: {
    flex: 1,
    margin: 8,
    backgroundColor: COLOR.green,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
