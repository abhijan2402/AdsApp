import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';
import Header from '../../../Components/FeedHeader';
import {AuthContext} from '../../../Backend/AuthContent'; // If you need user ID
import {useApi} from '../../../Backend/Api';
import {useToast} from '../../../Constants/ToastContext';

import {api_routes} from '../../../Constants/ApiRoute';

const TransactionHistory = () => {
  const auth = useContext(AuthContext);
  const {user} = auth;

  const {getRequest} = useApi();
  const {showToast} = useToast();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getRequest(api_routes.list_earninGS);
      console.log(response.data?.response?.earnings, 'RESPPPPP');
      // Assume API returns array of transactions
      setTransactions(response.data?.response?.earnings || []);
    } catch (error) {
      console.log('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
      <View style={styles.leftSection}>
        <Text style={styles.pointsText}>{item.pointsEarned} Points</Text>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.transactionId}>ID: {item.adId}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amountText}>₹{item.pointsEarned}</Text>
        {/* <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusStyle(item.status).backgroundColor},
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: getStatusStyle(item.status).color},
            ]}>
            {item.status}
          </Text>
        </View> */}
        <Text style={styles.conversionText}>1 Point = ₹0.10</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Transaction History" />
        <ActivityIndicator
          size="large"
          color={COLOR.primary}
          style={{marginTop: 50}}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <Header title="Transaction History" />

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item, index) => item.transactionId || index.toString()}
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
  safeArea: {flex: 1, backgroundColor: COLOR.white},
  listContainer: {padding: 16},
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
  leftSection: {flexDirection: 'column', flex: 1, marginRight: 10},
  pointsText: {fontSize: 18, fontFamily: FONT.Bold, color: COLOR.primary},
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
  rightSection: {alignItems: 'flex-end'},
  amountText: {fontSize: 18, fontFamily: FONT.Bold, color: COLOR.success},
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {fontSize: 12, fontFamily: FONT.SemiBold},
  conversionText: {
    fontSize: 12,
    fontFamily: FONT.Regular,
    color: COLOR.grey,
    marginTop: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
  },
});
