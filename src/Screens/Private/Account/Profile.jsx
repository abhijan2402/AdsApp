import React from 'react';
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

const Profile = ({navigation}) => {
  const handlePress = action => {
    Alert.alert(action, `${action} clicked!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ---------- Header ---------- */}
      <Header title="Profile" showBack={false} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------- Profile Header ---------- */}
        <View style={styles.profileHeaderCard}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>johndoe@gmail.com</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateProfile')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1160/1160515.png', // Edit Icon
              }}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        {/* ---------- Total Earnings Card ---------- */}
        <View style={styles.earningCard}>
          <View style={styles.earningBox}>
            <Text style={styles.earningLabel}>Total Earnings</Text>
            <Text style={styles.earningValue}>₹ 15,250</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.earningBox}>
            <Text style={styles.earningLabel}>Convertable Cash</Text>
            <Text style={styles.earningValue}>₹ 7,800</Text>
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
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('BankAccountDetails')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1669/1669668.png',
              }}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Account Details</Text>
          </TouchableOpacity>

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
            onPress={() => handlePress('Logout')}>
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
            title="Delete Account"
            onPress={() => handlePress('Delete Account')}
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
