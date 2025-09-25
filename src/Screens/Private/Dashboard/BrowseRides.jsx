import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';
import FiltersModal from '../../../Modals/FiltersModal';

const BrowseRides = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('Today');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const rides = [
    {
      id: 1,
      from: 'SF',
      to: 'Palo Alto',
      time: '08:30 AM',
      seats: 3,
      price: 12,
    },
    {
      id: 2,
      from: 'Oakland',
      to: 'SF',
      time: '09:15 AM',
      seats: 2,
      price: 8,
    },
    {
      id: 3,
      from: 'Berkeley',
      to: 'San Jose',
      time: '10:00 AM',
      seats: 1,
      price: 15,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ---------- Header ---------- */}
      <Header
        title={'Browse Rides'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 30}}>
        {/* ---------- Search Bar with Filter Icon ---------- */}
        <View style={styles.searchSection}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/622/622669.png',
            }}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search destination"
            placeholderTextColor={COLOR.grey}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3839/3839020.png',
              }}
              style={styles.filterIconRight}
            />
          </TouchableOpacity>
        </View>

        {/* ---------- Date Selector ---------- */}
        <View style={styles.dateSelector}>
          {['Today', 'Tomorrow', 'Choose Date'].map(date => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                selectedDate === date && styles.dateButtonActive,
              ]}
              onPress={() => setSelectedDate(date)}>
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate === date && styles.dateButtonTextActive,
                ]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* ---------- Ride Cards ---------- */}
        <View style={{marginTop: 15}}>
          {rides.map(ride => (
            <View key={ride.id} style={styles.rideCard}>
              <View style={{flex: 1}}>
                <Text style={styles.rideTitle}>
                  {ride.from} → {ride.to}
                </Text>
                <Text style={styles.rideDetails}>
                  {selectedDate} • {ride.time} • {ride.seats} seats
                </Text>
                <Text style={styles.ridePrice}>${ride.price}/seat</Text>
              </View>
              <TouchableOpacity
                style={styles.requestButton}
                onPress={() => {
                  navigation.navigate('RequestRide');
                }}>
                <Text style={styles.requestButtonText}>Request Ride</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ---------- Filters Modal ---------- */}
      <FiltersModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />
    </SafeAreaView>
  );
};

export default BrowseRides;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 16,
  },

  /* ---------- Search Section ---------- */
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginTop: 15,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.grey,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLOR.textDark,
  },
  filterIconRight: {
    width: 22,
    height: 22,
    tintColor: COLOR.textLight,
    marginLeft: 8,
  },

  /* ---------- Date Selector ---------- */
  dateSelector: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dateButton: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: COLOR.white,
  },
  dateButtonActive: {
    backgroundColor: COLOR.primary,
  },
  dateButtonText: {
    fontSize: 14,
    color: COLOR.textDark,
  },
  dateButtonTextActive: {
    color: COLOR.white,
    fontWeight: '600',
  },

  /* ---------- Filters ---------- */
  filterScroll: {
    marginTop: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  filterIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: COLOR.textLight,
  },
  filterText: {
    fontSize: 13,
    color: COLOR.textDark,
  },

  /* ---------- Ride Card ---------- */
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    shadowColor: COLOR.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  rideTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLOR.textDark,
    marginBottom: 4,
  },
  rideDetails: {
    fontSize: 13,
    color: COLOR.textLight,
  },
  ridePrice: {
    fontSize: 13,
    color: COLOR.textLight,
    marginTop: 4,
  },
  requestButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  requestButtonText: {
    color: COLOR.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
