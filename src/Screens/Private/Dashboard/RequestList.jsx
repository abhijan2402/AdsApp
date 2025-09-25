import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';

const RequestList = ({navigation}) => {
  // Dummy request data (replace with API data later)
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Amit Sharma',
      phone: '+91 9876543210',
      pickup: 'Sector 22, Gurugram',
      drop: 'Cyber Hub, Gurugram',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      name: 'Priya Verma',
      phone: '+91 9988776655',
      pickup: 'Huda City Center, Gurugram',
      drop: 'IGI Airport, Delhi',
      profilePic: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      phone: '+91 9123456789',
      pickup: 'DLF Phase 3, Gurugram',
      drop: 'Connaught Place, Delhi',
      profilePic: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  ]);

  // Handle accept
  const handleAccept = id => {
    Alert.alert('Request Accepted', `You accepted request #${id}`);
    setRequests(prev => prev.filter(item => item.id !== id));
  };

  // Handle reject
  const handleReject = id => {
    Alert.alert('Request Rejected', `You rejected request #${id}`);
    setRequests(prev => prev.filter(item => item.id !== id));
  };

  // Open Google Maps with static coordinates
  const openGoogleMaps = () => {
    const latitude = 28.4595;
    const longitude = 77.0266;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to open Google Maps', err),
    );
  };

  const renderRequestItem = ({item}) => (
    <View style={styles.card}>
      {/* Profile Picture */}
      <Image source={{uri: item.profilePic}} style={styles.profileImage} />

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/1370/1370907.png',
                }}
                style={styles.iconSmall}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.location} numberOfLines={1}>
          📍 Pickup: {item.pickup}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          🎯 Drop: {item.drop}
        </Text>

        {/* Actions Row */}
        <View style={styles.actionRow}>
          {/* Accept Button */}
          <TouchableOpacity
            style={[styles.button, {backgroundColor: COLOR.green}]}
            onPress={() => handleAccept(item.id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>

          {/* Reject Button */}
          <TouchableOpacity
            style={[styles.button, {backgroundColor: COLOR.danger}]}
            onPress={() => handleReject(item.id)}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>

          {/* Directions */}
          <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
              }}
              style={styles.iconMedium}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <Header
        title={'Request List'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      {requests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/4076/4076549.png',
            }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No ride requests yet</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          renderItem={renderRequestItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 20, paddingTop: 10}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default RequestList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  /* ---------- Card ---------- */
  card: {
    flexDirection: 'row',
    backgroundColor: COLOR.white,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontFamily: FONT.SemiBold,
    color: COLOR.textDark,
  },
  phone: {
    fontSize: 13,
    fontFamily: FONT.Regular,
    color: COLOR.textLight,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    fontFamily: FONT.Medium,
    color: COLOR.textLight,
    marginTop: 4,
  },

  /* ---------- Icons ---------- */
  iconSmall: {
    width: 20,
    height: 20,
    // tintColor: COLOR.royalBlue,
  },
  iconMedium: {
    width: 24,
    height: 24,
    tintColor: COLOR.royalBlue,
  },

  /* ---------- Buttons ---------- */
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: COLOR.white,
    fontFamily: FONT.Medium,
    fontSize: 14,
  },

  /* Map Button */
  mapButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: COLOR.lightGrey,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ---------- Empty State ---------- */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 90,
    height: 90,
    marginBottom: 15,
    tintColor: COLOR.grey,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONT.Medium,
    color: COLOR.textLight,
  },
});
