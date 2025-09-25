import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';
import Header from '../../../Components/FeedHeader';
import BookingCard from '../../../Components/BookingCard';

const ReceivedBooking = ({navigation}) => {
  const [selectedFilter, setSelectedFilter] = useState('Pending');
  const [selectedTab, setSelectedTab] = useState('received');

  const filters = ['Pending', 'Accepted', 'Ongoing', 'Completed', 'Cancelled'];

  // Sample data for received bookings
  const receivedBookings = [
    {
      id: '1',
      pickup: 'New York',
      drop: 'Boston',
      price: '₹120',
      passengers: 2,
      date: '2025-09-14',
      status: 'Pending',
      driverName: 'John Doe',
      mobile: '+1 987 654 3210',
    },
    {
      id: '2',
      pickup: 'Chicago',
      drop: 'Detroit',
      price: '₹90',
      passengers: 1,
      date: '2025-09-12',
      status: 'Accepted',
      driverName: 'Sarah Smith',
      mobile: '+1 876 543 2109',
    },
  ];

  // Sample data for bookings requested by user
  const myBookings = [
    {
      id: '1',
      pickup: 'Dallas',
      drop: 'Houston',
      price: '₹150',
      date: '2025-09-18',
      status: 'Pending',
      driverName: 'Mike Ross',
    },
    {
      id: '2',
      pickup: 'Austin',
      drop: 'San Antonio',
      price: '₹200',
      date: '2025-09-20',
      status: 'Accepted',
      driverName: 'Rachel Green',
    },
  ];

  const filteredData =
    selectedTab === 'received'
      ? receivedBookings.filter(item => item.status === selectedFilter)
      : myBookings.filter(item => item.status === selectedFilter);

  return (
    <View style={styles.container}>
      <Header title={'Bookings'} />

      {/* Filter Tabs */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}>
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
        </ScrollView>
      </View>

      {/* Toggle Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'received' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('received')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'received' && styles.activeTabText,
            ]}>
            Booking Received
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'requested' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('requested')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'requested' && styles.activeTabText,
            ]}>
            Booking Requested
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        style={{marginHorizontal: 10}}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <BookingCard
            {...item}
            isReceived={selectedTab === 'received'}
            onPress={() =>
              navigation.navigate('BookingDetail', {booking: item})
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No bookings found</Text>}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default ReceivedBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  filterRow: {
    width: '100%',
    // marginVertical: 10,
    paddingHorizontal: 10,
    height: 50,
    marginTop: -15,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.grey,
    backgroundColor: COLOR.white,
    marginRight: 8,
  },
  filterText: {
    color: COLOR.textLight,
    fontFamily: FONT.Medium,
    fontSize: 12,
  },
  activeFilter: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
  },
  activeFilterText: {
    color: COLOR.white,
  },
  tabRow: {
    flexDirection: 'row',
    // marginHorizontal: 16,
    marginBottom: 8,
    // backgroundColor: COLOR.lightGrey,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontFamily: FONT.Medium,
    color: COLOR.textLight,
  },
  activeTab: {
    borderBottomColor: COLOR.primary,
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: COLOR.primary,
    fontFamily: FONT.SemiBold,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: COLOR.grey,
    fontFamily: FONT.Regular,
    fontSize: 14,
  },
});
