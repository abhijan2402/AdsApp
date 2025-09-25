import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';
import Header from '../../../Components/FeedHeader';

const DailyEarning = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Today');

  // Dummy earnings data
  const earningsData = [
    {id: '1', date: '19 Sep 2025', points: 500, amount: 50},
    {id: '2', date: '18 Sep 2025', points: 450, amount: 45},
    {id: '3', date: '17 Sep 2025', points: 600, amount: 60},
    {id: '4', date: '16 Sep 2025', points: 300, amount: 30},
    {id: '5', date: '15 Sep 2025', points: 700, amount: 70},
  ];

  const filterOptions = [
    'Today',
    'Yesterday',
    'Week',
    'Last Week',
    'Last Month',
  ];

  const handleFilterSelect = option => {
    setSelectedFilter(option);
    setFilterModalVisible(false);
  };

  const renderEarningItem = ({item}) => (
    <View style={styles.earningCard}>
      <View>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.pointsText}>{item.points} Points</Text>
      </View>
      <Text style={styles.amountText}>₹{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <Header title="Daily Earnings" />

      {/* Filter Button */}
      <View style={styles.filterBar}>
        <Text style={styles.filterLabel}>Filter: </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}>
          <Text style={styles.filterText}>{selectedFilter}</Text>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/271/271210.png',
            }}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Total Earnings ({selectedFilter})
        </Text>
        <Text style={styles.summaryAmount}>₹255</Text>
        <Text style={styles.summaryPoints}>2550 Points</Text>
      </View>

      {/* Earnings List */}
      <FlatList
        data={earningsData}
        renderItem={renderEarningItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 16}}
      />

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Filter</Text>
            {filterOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => handleFilterSelect(option)}>
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedFilter === option && {
                      color: COLOR.primary,
                      fontFamily: FONT.Bold,
                    },
                  ]}>
                  {option}
                </Text>

                {/* Checkmark Image */}
                {selectedFilter === option && (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
                    }}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DailyEarning;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  /* ---------- Filter Bar ---------- */
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filterLabel: {
    fontFamily: FONT.SemiBold,
    fontSize: 14,
    color: COLOR.textDark,
    marginRight: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterText: {
    fontFamily: FONT.SemiBold,
    fontSize: 14,
    color: COLOR.grey,
    marginRight: 6,
  },
  dropdownIcon: {
    width: 14,
    height: 14,
    tintColor: COLOR.grey,
  },

  /* ---------- Summary Card ---------- */
  summaryCard: {
    backgroundColor: '#F8FAFF',
    margin: 16,
    padding: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E4E8F0',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: FONT.SemiBold,
    color: COLOR.textDark,
    marginBottom: 6,
  },
  summaryAmount: {
    fontSize: 24,
    fontFamily: FONT.Bold,
    color: COLOR.primary,
  },
  summaryPoints: {
    fontSize: 14,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
    marginTop: 4,
  },

  /* ---------- List Item ---------- */
  earningCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  dateText: {
    fontSize: 14,
    fontFamily: FONT.Medium,
    color: COLOR.textDark,
  },
  pointsText: {
    fontSize: 12,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
    marginTop: 4,
  },
  amountText: {
    fontSize: 16,
    fontFamily: FONT.Bold,
    color: COLOR.success,
  },

  /* ---------- Modal Styles ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLOR.white,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: FONT.Bold,
    color: COLOR.textDark,
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  modalOptionText: {
    fontSize: 14,
    fontFamily: FONT.Regular,
    color: COLOR.textDark,
  },
  checkIcon: {
    width: 16,
    height: 16,
    tintColor: COLOR.primary,
  },
});
