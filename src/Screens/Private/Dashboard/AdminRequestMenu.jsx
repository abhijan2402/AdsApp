import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';
import {useApi} from '../../../Backend/Api';
import {useToast} from '../../../Constants/ToastContext';
import moment from 'moment';

const AdminRequestMenu = () => {
  const {getRequest, putRequest} = useApi();
  const {showToast} = useToast();

  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  /** Fetch Pending Transactions */
  const fetchPendingTransactions = async () => {
    try {
      setLoading(true);
      const response = await getRequest(
        'api/transactions/pending-transactions',
      );

      if (response?.data?.response?.transactions) {
        setRequests(response.data.response.transactions);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching pending transactions:', error);
      showToast('Failed to load transactions', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** Handle Approve/Cancel Action */
  const handleAction = async (transactionId, actionType) => {
    try {
      setLoading(true);

      const payload = {
        transactionId: transactionId,
        action: actionType, // APPROVE or CANCEL
      };
      console.log(payload, 'OPAYTYTYYY');

      const response = await putRequest(
        'api/transactions/handle-transaction-request',
        payload,
      );
      console.log(response, 'SNBJBHJBHJ');

      if (response?.success) {
        showToast(
          `Transaction ${
            actionType === 'APPROVE' ? 'approved' : 'canceled'
          } successfully`,
          'success',
        );
        fetchPendingTransactions(); // Refresh list
      } else {
        showToast(response?.error || 'Something went wrong', 'error');
      }
    } catch (error) {
      console.error('Error handling transaction:', error);
      showToast('Failed to process transaction', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** Confirm Before Approving or Canceling */
  const confirmAction = (transactionId, actionType) => {
    Alert.alert(
      `${actionType === 'APPROVE' ? 'Approve' : 'Cancel'} Request`,
      `Are you sure you want to ${
        actionType === 'APPROVE' ? 'approve' : 'cancel'
      } this withdrawal request?`,
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => handleAction(transactionId, actionType),
        },
      ],
    );
  };

  /** Render Each Transaction Item */
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={{flex: 1}}>
        <Text style={styles.userText}>User: {item.userName}</Text>
        <Text style={styles.detailText}>Phone: {item.phone}</Text>
        <Text style={styles.detailText}>UPI ID: {item.upiId}</Text>
        <Text style={styles.detailText}>
          Points Redeemed: {item.pointsRedeemed}
        </Text>
        <Text style={styles.detailText}>
          Amount Redeemed: ₹{item.amountRedeemed}
        </Text>
        {console.log(item, 'IIII')}
        <Text style={styles.dateText}>
          Requested on: {moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={() => confirmAction(item.transactionId, 'APPROVE')}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => confirmAction(item.transactionId, 'CANCEL')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  /** Initial Fetch */
  useEffect(() => {
    fetchPendingTransactions();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <Header title={'Withdraw Request'} />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLOR.primary}
          style={{marginTop: 40}}
        />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={{padding: 16}}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No pending transactions</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default AdminRequestMenu;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  card: {
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
  userText: {
    fontSize: 16,
    fontFamily: FONT.Bold,
    color: COLOR.textDark,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    fontFamily: FONT.Regular,
    color: COLOR.grey,
    marginTop: 6,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: COLOR.green,
  },
  cancelButton: {
    backgroundColor: COLOR.danger,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FONT.Bold,
    color: COLOR.white,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
  },
});
