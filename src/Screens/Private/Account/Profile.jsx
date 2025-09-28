import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import Header from '../../../Components/FeedHeader';
import CustomButton from '../../../Components/CustomButton';
import FONT from '../../../Constants/Font';
import { AuthContext } from '../../../Backend/AuthContent';
import { IMAGEURL, useApi } from '../../../Backend/Api';
import { api_routes } from '../../../Constants/ApiRoute';
import { useToast } from '../../../Constants/ToastContext';
import { useIsFocused } from '@react-navigation/native';

const Profile = ({navigation}) => {
  const [walletData,setWalletData] = useState({totalPoints:0, totalAmountRedeemed:0})
  const auth = useContext(AuthContext);
  const {user, removeAllData} = auth;
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false)
  const { deleteRequest, getRequest } = useApi();
  const isFocused = useIsFocused();
  useEffect(()=>{
    getWalletData()
  },[isFocused])

  const logout=()=>{
    Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, Logout",
        onPress: async () => {
          await removeAllData();
        },
        style: "destructive",
      },
    ],
    { cancelable: true }
  );
  }

   const deleteAccount=()=>{
    Alert.alert(
    "Delete Account",
    "Are you sure you want to delete account?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, Delete",
        onPress: async () => {
          setLoading(true)
          const response = await deleteRequest(api_routes.delete_user);
          if(!response.success)
            throw response;
          showToast(response?.data?.response?.message,'success')
          await removeAllData();
          setLoading(false)
        },
        style: "destructive",
      },
    ],
    { cancelable: true }
  );
  }

  const getWalletData=async()=>{
    try {
          const response = await getRequest(api_routes.get_user_details);
          if(!response.success)
            throw response;
          setWalletData({
            totalPoints: response.data?.response?.wallet?.totalPoints,
            totalAmountRedeemed: response.data?.response?.wallet?.totalAmountRedeemed 
          })
        } catch (error) {
          showToast(error.error,'error');
        }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ---------- Header ---------- */}
      <Header title="Profile" showBack={false} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------- Profile Header ---------- */}
        <View style={styles.profileHeaderCard}>
          <Image
            source={{
              uri: user?.profileImage?
                  `${IMAGEURL}${user.profileImage}`:
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.earningCard}>
          <View style={styles.earningBox}>
            <Text style={styles.earningLabel}>Total Earnings</Text>
            <Text style={styles.earningValue}>₹ {walletData?.totalPoints}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.earningBox}>
            <Text style={styles.earningLabel}>Convertable Cash</Text>
            <Text style={styles.earningValue}>₹ {walletData?.totalAmountRedeemed}</Text>
          </View>
        </View>
        {/* ---------- Profile Options ---------- */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('TransactionHistory')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/8231/8231679.png',
              }}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Transaction History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('DailyEarning')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/7493/7493245.png',
              }}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Daily Earning</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('BankAccountDetails')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1669/1669668.png',
              }}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Account Details</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('Cms')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/942/942751.png',
              }}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('Cms')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/4413/4413865.png',
              }}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={logout}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828490.png',
              }}
              style={styles.optionIcon}
            />
            <Text style={[styles.optionText, {color: COLOR.warning}]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* ---------- Delete Account Button ---------- */}
        <View style={styles.deleteButtonWrapper}>
          <CustomButton
            loading={loading}
            title="Delete Account"
            onPress={deleteAccount}
            backgroundColor={COLOR.danger}
            textColor={COLOR.white}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: COLOR.white,
  },

  /* ---------- Total Earnings Card ---------- */
  earningCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    paddingVertical: 18,
    paddingHorizontal: 15,
    // marginTop: 20,
    elevation: 2,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    marginBottom: 10,
  },
  earningBox: {
    flex: 1,
    alignItems: 'center',
  },
  earningLabel: {
    fontSize: 14,
    color: COLOR.grey,
    fontFamily: FONT.Medium,
    marginBottom: 5,
  },
  earningValue: {
    fontSize: 18,
    color: COLOR.primary,
    fontFamily: FONT.SemiBold,
  },
  divider: {
    width: 1,
    backgroundColor: COLOR.lightGrey,
    height: '100%',
    marginHorizontal: 10,
  },

  /* ---------- Profile Header ---------- */
  profileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLOR.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    marginTop: 20,
    marginBottom: 10,
    elevation: 2,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLOR.primary,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontFamily: FONT.SemiBold,
    color: COLOR.black,
  },
  userEmail: {
    fontSize: 14,
    color: COLOR.grey,
    marginTop: 4,
    fontFamily: FONT.Medium,
  },
  editIcon: {
    width: 28,
    height: 28,
  },

  /* ---------- Profile Options ---------- */
  optionsContainer: {
    backgroundColor: COLOR.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: COLOR.black,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: COLOR.lightGrey,
  },
  optionIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: COLOR.black,
    fontFamily: FONT.SemiBold,
  },

  /* ---------- Delete Account ---------- */
  deleteButtonWrapper: {
    marginTop: 30,
  },
});
