import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';
import CustomButton from '../../../Components/CustomButton';
import FONT from '../../../Constants/Font';

const BankAccountDetails = ({navigation}) => {
  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const handleSave = () => {
    // later: save to backend or local state
    console.log({accountHolder, bankName, accountNumber, ifscCode});
  };

  return (
    <View style={styles.safeArea}>
      <Header
        title={'Bank Account Details'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Account Holder */}
        <Text style={styles.label}>Account Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account holder name"
          placeholderTextColor={COLOR.grey}
          value={accountHolder}
          onChangeText={setAccountHolder}
        />

        {/* Bank Name */}
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bank name"
          placeholderTextColor={COLOR.grey}
          value={bankName}
          onChangeText={setBankName}
        />

        {/* Account Number */}
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          placeholderTextColor={COLOR.grey}
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />

        {/* IFSC Code */}
        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter IFSC code"
          placeholderTextColor={COLOR.grey}
          value={ifscCode}
          onChangeText={setIfscCode}
          autoCapitalize="characters"
        />

        <CustomButton title={'Save Bank Details'} style={{marginTop: 30}} />
      </ScrollView>
    </View>
  );
};

export default BankAccountDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: COLOR.textDark,
    fontFamily: FONT.SemiBold,
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: COLOR.textDark,
    backgroundColor: COLOR.white,
    fontFamily: FONT.Medium,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLOR.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
