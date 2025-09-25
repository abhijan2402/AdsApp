import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';
import Header from '../../../Components/FeedHeader';

const TransactionHistory = () => {
  // Dummy Data
  const [transactions] = useState([
    {
      id: '1',
      points: 500,
      amount: 50,
      date: '19 Sep 2025',
      transactionId: 'TXN987654321',
      status: 'Completed',
    },
    {
      id: '2',
      points: 750,
      amount: 75,
      date: '15 Sep 2025',
      transactionId: 'TXN987654322',
      status: 'Completed',
    },
    {
      id: '3',
      points: 1200,
      amount: 120,
      date: '12 Sep 2025',
      transactionId: 'TXN987654323',
      status: 'Pending',
    },
    {
      id: '4',
      points: 300,
      amount: 30,
      date: '08 Sep 2025',
      transactionId: 'TXN987654324',
      status: 'Failed',
    },
  ]);

  const getStatusStyle = status => {
    switch (status) {
      case 'Completed':
        return {color: COLOR.success, backgroundColor: '#E9F9EE'};
      case 'Pending':
        return {color: COLOR.warning, backgroundColor: '#FFF7E5'};
      case 'Failed':
        return {color: COLOR.error, backgroundColor: '#FDECEA'};
      default:
        return {color: COLOR.grey, backgroundColor: '#EEE'};
    }
  };

  const renderTransaction = ({item}) => (
    <View style={styles.transactionCard}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <Text style={styles.pointsText}>{item.points} Points</Text>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.transactionId}>ID: {item.transactionId}</Text>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        <Text style={styles.amountText}>₹{item.amount}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusStyle(item.status).backgroundColor,
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: getStatusStyle(item.status).color},
            ]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.conversionText}>1 Point = ₹0.10</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <Header title="Transaction History" />

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  listContainer: {
    padding: 16,
  },

  /* ---------- Transaction Card ---------- */
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E4E8F0',
  },
  leftSection: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 10,
  },
  pointsText: {
    fontSize: 18,
    fontFamily: FONT.Bold,
    color: COLOR.primary,
  },
  dateText: {
    fontSize: 13,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
    marginTop: 4,
  },
  transactionId: {
    fontSize: 12,
    fontFamily: FONT.Medium,
    color: COLOR.textDark,
    marginTop: 6,
  },

  rightSection: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontFamily: FONT.Bold,
    color: COLOR.success,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONT.SemiBold,
  },
  conversionText: {
    fontSize: 12,
    fontFamily: FONT.Regular,
    color: COLOR.grey,
    marginTop: 6,
  },

  /* ---------- Empty State ---------- */
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
  },
});
