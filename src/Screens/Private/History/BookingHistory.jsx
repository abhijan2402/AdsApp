import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../../../Constants/Colors';
import Header from '../../../Components/FeedHeader';
import FONT from '../../../Constants/Font';
import {windowWidth} from '../../../Constants/Dimensions';

const BookingHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('Pending');

  const filters = ['Pending', 'Ongoing', 'Completed', 'Cancelled'];

  // Sample data
  const bookings = [
    {
      id: '1',
      pickup: 'New York',
      drop: 'Boston',
      earned: '₹120',
      passengers: 2,
      date: '2025-09-14',
      time: '10:30 AM',
      status: 'Pending',
    },
    {
      id: '2',
      pickup: 'Chicago',
      drop: 'Detroit',
      earned: '₹90',
      passengers: 1,
      date: '2025-09-12',
      time: '03:00 PM',
      status: 'Ongoing',
    },
    {
      id: '3',
      pickup: 'LA',
      drop: 'San Diego',
      earned: '₹150',
      passengers: 3,
      date: '2025-09-10',
      time: '08:15 AM',
      status: 'Completed',
    },
  ];

  const filteredBookings = bookings.filter(
    item => item.status === selectedFilter,
  );

  // Card Component
  const BookingCard = ({pickup, drop, earned, passengers, date, time}) => (
    <View style={styles.card}>
      <Text style={styles.label}>
        Pickup: <Text style={styles.value}>{pickup}</Text>
      </Text>
      <Text style={styles.label}>
        Drop: <Text style={styles.value}>{drop}</Text>
      </Text>
      <Text style={styles.label}>
        Earned: <Text style={styles.value}>{earned}</Text>
      </Text>
      <Text style={styles.label}>
        Passengers: <Text style={styles.value}>{passengers}</Text>
      </Text>
      <Text style={styles.label}>
        Date: <Text style={styles.value}>{date}</Text>
      </Text>
      <Text style={styles.label}>
        Time: <Text style={styles.value}>{time}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={'Booking History'} />
      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Booking Cards */}
      <FlatList
        data={filteredBookings}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <BookingCard
            pickup={item.pickup}
            drop={item.drop}
            earned={item.earned}
            passengers={item.passengers}
            date={item.date}
            time={item.time}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No bookings found</Text>}
      />
    </View>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: COLOR.white,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginHorizontal: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.grey,
    backgroundColor: COLOR.white,
  },
  filterText: {
    color: COLOR.textLight,
    // fontWeight: '500',
    fontFamily: FONT.Regular,
    fontSize: 10,
  },
  activeFilter: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
  },
  activeFilterText: {
    color: COLOR.white,
  },
  card: {
    padding: 16,
    backgroundColor: COLOR.white,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 5,
    shadowColor: COLOR.primary,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: COLOR.textLight,
    marginBottom: 4,
    fontFamily: FONT.Regular,
  },
  value: {
    fontFamily: FONT.Medium,
    color: COLOR.textDark,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: COLOR.grey,
    FontFamily: FONT.SemiBold,
  },
});
