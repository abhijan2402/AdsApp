import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLOR} from '../../Constants/Colors';
import {AuthContext} from '../../Backend/AuthContent';
import Header from '../../Components/FeedHeader';
import CustomButton from '../../Components/CustomButton';
import FONT from '../../Constants/Font';

const CreateProfile = ({navigation}) => {
  const {setUser} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    mobileNumber: '',
    gender: '',
    profilePic: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  /** Handle input change */
  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  /** Format Date to dd-mm-yyyy */
  const formatDate = date => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  /** Handle DOB selection */
  const onDobChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      handleChange('dob', formattedDate);
    }
  };

  /** Save profile */
  const handleSaveProfile = () => {
    navigation.navigate('BottomNavigation');
    return;
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.mobileNumber ||
      !formData.gender
    ) {
      alert('Please fill all fields');
      return;
    }
    console.log('Profile Data:', formData);
    setUser(true); // Mark user as logged in
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.white}}>
      <Header title="Create Profile" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            {/* Profile Picture (Optional) */}
            <TouchableOpacity style={styles.profilePicWrapper}>
              {formData.profilePic ? (
                <Image
                  source={{uri: formData.profilePic}}
                  style={styles.profilePic}
                />
              ) : (
                <Text style={styles.uploadText}>+ Upload Profile Picture</Text>
              )}
            </TouchableOpacity>

            {/* Full Name */}
            <Text style={styles.sectionHeader}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={COLOR.grey}
              value={formData.fullName}
              onChangeText={text => handleChange('fullName', text)}
            />

            {/* DOB */}
            <Text style={styles.sectionHeader}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}>
              <Text
                style={{
                  color: formData.dob ? COLOR.black : COLOR.grey,
                  fontSize: 14,
                }}>
                {formData.dob || 'Select Date of Birth'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={
                  formData.dob
                    ? new Date(formData.dob.split('-').reverse().join('-'))
                    : new Date()
                }
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()} // No future DOB
                onChange={onDobChange}
              />
            )}

            {/* Mobile Number */}
            <Text style={styles.sectionHeader}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor={COLOR.grey}
              keyboardType="phone-pad"
              maxLength={10}
              value={formData.mobileNumber}
              onChangeText={text => handleChange('mobileNumber', text)}
            />

            {/* Gender */}
            <Text style={styles.sectionHeader}>Gender</Text>
            <View style={styles.row}>
              {['Male', 'Female', 'Other'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.genderOption,
                    formData.gender === option && styles.genderOptionSelected,
                  ]}
                  onPress={() => handleChange('gender', option)}>
                  <Text
                    style={{
                      color:
                        formData.gender === option ? COLOR.white : COLOR.black,
                      fontFamily: FONT.Medium,
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Save Profile Button */}
            <View style={styles.profileButtons}>
              <CustomButton
                title={'Save Profile'}
                onPress={handleSaveProfile}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: COLOR.white,
  },
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: FONT.SemiBold,
    color: COLOR.black,
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: COLOR.white,
    marginBottom: 12,
    elevation: 1,
    fontFamily: FONT.Medium,
  },
  profilePicWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadText: {
    fontSize: 12,
    color: COLOR.primary,
    textAlign: 'center',
    fontFamily: FONT.Regular,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  genderOption: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
  },
  genderOptionSelected: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
  },
  profileButtons: {
    marginTop: 20,
  },
});
