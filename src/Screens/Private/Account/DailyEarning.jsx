import React, {useState, useEffect, useContext} from 'react';
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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';
import Header from '../../../Components/FeedHeader';
import {useApi} from '../../../Backend/Api';
import {useToast} from '../../../Constants/ToastContext';
import {AuthContext} from '../../../Backend/AuthContent';
import moment from 'moment';
import {api_routes} from '../../../Constants/ApiRoute';
import CustomButton from '../../../Components/CustomButton';
import {windowWidth} from '../../../Constants/Dimensions';

const DailyEarning = () => {
  const {user} = useContext(AuthContext);
  const vendor_id = user?.user?.id;

  const [walletData, setWalletData] = useState({
    totalPoints: 0,
    totalAmountRedeemed: 0,
  });

  const {getRequest, postRequest} = useApi();
  const {showToast} = useToast();

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Withdrawal modal states
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    pointsRedeemed: '',
    amountRedeemed: '',
    phone: '',
    upiId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const filterOptions = [
    'Today',
    'Yesterday',
    'Week',
    'Last Week',
    'Last Month',
  ];

  /** Fetch Earnings List */
  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const response = await getRequest(`api/earnings/user-earning-list`);

      if (response?.data) {
        const data = response?.data?.response?.earnings || [];
        setEarningsData(data);
        setLoading(false);
      } else {
        setEarningsData([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch Wallet Data */
  const getWalletData = async () => {
    try {
      const response = await getRequest(api_routes.get_user_details);
      if (!response.success) throw response;
      setLoading(false);

      setWalletData({
        totalPoints: response.data?.response?.wallet?.totalPoints,
        totalAmountRedeemed:
          response.data?.response?.wallet?.totalAmountRedeemed,
      });
    } catch (error) {
      showToast(error.error, 'error');
    }
  };

  useEffect(() => {
    getWalletData();
    fetchEarnings();
  }, []);

  /** Handle Filter Select */
  const handleFilterSelect = option => {
    setSelectedFilter(option);
    setFilterModalVisible(false);
    fetchEarnings();
  };

  /** Handle Withdrawal Submit */
  const handleWithdrawalSubmit = async () => {
    if (
      !withdrawData.pointsRedeemed ||
      !withdrawData.amountRedeemed ||
      !withdrawData.phone ||
      !withdrawData.upiId
    ) {
      showToast('Please fill all fields', 'error');
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...withdrawData,
      };
      console.log(payload, 'PAYLOADDDD');

      const response = await postRequest(
        'api/transactions/add-transaction-request',
        payload,
      );
      console.log(response, 'RESPOOOOO');

      if (response?.success) {
        showToast('Withdrawal request submitted successfully!', 'success');
        setWithdrawModalVisible(false);
        setWithdrawData({
          pointsRedeemed: '',
          amountRedeemed: '',
          phone: '',
          upiId: '',
        });
        getWalletData(); // Refresh wallet data
      } else {
        showToast(response?.error || 'Something went wrong', 'error');
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      showToast('Failed to submit withdrawal request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  /** Render Each Earning Item */
  const renderEarningItem = ({item}) => (
    <View style={styles.earningCard}>
      <View>
        <Text style={styles.dateText}>
          {moment(item.createdAt).format('DD MMM YYYY hh:mm A')}
        </Text>
      </View>
      <Text style={styles.amountText}>{item.pointsEarned} Points</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <Header title="Daily Earnings" />

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Total Earnings ({selectedFilter})
        </Text>
        <Text style={styles.summaryAmount}>
          ₹{walletData?.totalAmountRedeemed}
        </Text>
        <Text style={styles.summaryPoints}>
          {walletData?.totalPoints} Points
        </Text>
        <CustomButton
          style={{width: windowWidth / 2, paddingHorizontal: 5, marginTop: 10}}
          textStyle={{fontSize: 12}}
          title={'Request for withdrawal'}
          onPress={() => setWithdrawModalVisible(true)}
        />
      </View>

      {/* Loader */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLOR.primary}
          style={{marginTop: 40}}
        />
      ) : (
        <FlatList
          data={earningsData}
          renderItem={renderEarningItem}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          contentContainerStyle={{padding: 16}}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No earnings available</Text>
          }
        />
      )}

      {/* Withdrawal Modal */}
      <Modal
        visible={withdrawModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setWithdrawModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.withdrawModalContainer}>
            <Text style={styles.modalTitle}>Withdrawal Request</Text>

            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Points Redeemed"
              placeholderTextColor={COLOR.grey}
              keyboardType="numeric"
              value={withdrawData.pointsRedeemed}
              onChangeText={text =>
                setWithdrawData({...withdrawData, pointsRedeemed: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Amount Redeemed"
              placeholderTextColor={COLOR.grey}
              keyboardType="numeric"
              value={withdrawData.amountRedeemed}
              onChangeText={text =>
                setWithdrawData({...withdrawData, amountRedeemed: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={COLOR.grey}
              keyboardType="phone-pad"
              value={withdrawData.phone}
              onChangeText={text =>
                setWithdrawData({...withdrawData, phone: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="UPI ID"
              placeholderTextColor={COLOR.grey}
              value={withdrawData.upiId}
              onChangeText={text =>
                setWithdrawData({...withdrawData, upiId: text})
              }
            />

            {/* Buttons */}
            <View style={styles.modalButtonRow}>
              <CustomButton
                title="Cancel"
                style={[styles.modalButton, {backgroundColor: COLOR.grey}]}
                textStyle={{color: COLOR.white}}
                onPress={() => setWithdrawModalVisible(false)}
              />
              <CustomButton
                title={submitting ? 'Submitting...' : 'Submit'}
                style={styles.modalButton}
                textStyle={{color: COLOR.white}}
                onPress={handleWithdrawalSubmit}
                disabled={submitting}
              />
            </View>
          </View>
        </View>
      </Modal>

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
  amountText: {
    fontSize: 16,
    fontFamily: FONT.Bold,
    color: COLOR.success,
  },

  /* ---------- Filter Modal ---------- */
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

  /* ---------- Withdrawal Modal ---------- */
  withdrawModalContainer: {
    backgroundColor: COLOR.white,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: FONT.Regular,
    color: COLOR.textDark,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: COLOR.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontFamily: FONT.Medium,
    color: COLOR.grey,
  },
});
