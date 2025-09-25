import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const OfferRide = ({navigation}) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [seats, setSeats] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={'Offer Ride'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 30}}>
        {/* ---------- Source ---------- */}
        <Text style={styles.label}>Source</Text>
        <View style={styles.inputWrapper}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
            }}
            style={styles.icon}
          />
          <TextInput
            placeholder="Enter pickup location"
            placeholderTextColor={COLOR.grey}
            value={source}
            onChangeText={setSource}
            style={styles.input}
          />
        </View>

        {/* ---------- Destination ---------- */}
        <Text style={styles.label}>Destination</Text>
        <View style={styles.inputWrapper}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/854/854894.png',
            }}
            style={styles.icon}
          />
          <TextInput
            placeholder="Enter drop location"
            placeholderTextColor={COLOR.grey}
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
          />
        </View>

        {/* ---------- Date & Time ---------- */}
        <View style={styles.row}>
          <View style={[styles.inputWrapper, styles.halfInput]}>
            <TouchableOpacity
              style={styles.dateTimeTouchable}
              onPress={() => setShowDatePicker(true)}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.dateTimeText}>
                {date.toISOString().split('T')[0]}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputWrapper, styles.halfInput]}>
            <TouchableOpacity
              style={styles.dateTimeTouchable}
              onPress={() => setShowTimePicker(true)}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2088/2088617.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.dateTimeText}>
                {time.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}

        {/* ---------- Seats Available & Amount ---------- */}
        <View style={styles.row}>
          <View style={[styles.inputWrapper, styles.halfInput]}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
              }}
              style={styles.icon}
            />
            <TextInput
              placeholder="Seats Available"
              placeholderTextColor={COLOR.grey}
              value={seats}
              onChangeText={setSeats}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={[styles.inputWrapper, styles.halfInput]}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/25/25473.png',
              }}
              style={styles.icon}
            />
            <TextInput
              placeholder="Amount per Seat"
              placeholderTextColor={COLOR.grey}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        {/* ---------- Pickup Notes / Message ---------- */}
        <Text style={styles.label}>Pickup Notes (optional)</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Meet near the lobby entrance. Text on arrival."
            placeholderTextColor={COLOR.grey}
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            multiline
          />
        </View>

        {/* ---------- Preview Card ---------- */}
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Confirm Ride</Text>
          <Text style={styles.previewText}>From: {source || '---'}</Text>
          <Text style={styles.previewText}>To: {destination || '---'}</Text>
          <Text style={styles.previewText}>
            Date: {date.toISOString().split('T')[0]}
          </Text>
          <Text style={styles.previewText}>
            Time:{' '}
            {time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </Text>
          <Text style={styles.previewText}>Seats: {seats || '0'}</Text>
          <Text style={styles.previewText}>
            Price/seat: {amount ? `$${amount}` : '$0'}
          </Text>
        </View>

        {/* ---------- Offer Ride Button ---------- */}
        <TouchableOpacity style={styles.offerButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png',
            }}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Offer Ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OfferRide;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.textDark,
    marginBottom: 6,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    minHeight: 45,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLOR.textDark,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  halfInput: {
    width: '48%',
  },
  dateTimeTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateTimeText: {
    fontSize: 14,
    color: COLOR.textDark,
  },
  previewCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLOR.lightBlue,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: COLOR.textDark,
  },
  previewText: {
    fontSize: 14,
    color: COLOR.textLight,
    marginBottom: 4,
  },
  offerButton: {
    marginTop: 25,
    backgroundColor: COLOR.primary,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: COLOR.white,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.white,
  },
});
