import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';
import FONT from '../../../Constants/Font';
import AddVehicleModal from '../../../Modals/AddVehicleModal';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: '1',
      branch: 'Hyundai',
      carNumber: 'RJ14 XX 1234',
      model: 'Creta',
      launchYear: '2022',
      images: [
        'https://cdni.autocarindia.com/Features/_New%20Sedans%20%20Sports%20Cars%20Web%20Resized%20%20Watermarked._008.jpeg',
        'https://cdni.autocarindia.com/Features/_New%20Sedans%20%20Sports%20Cars%20Web%20Resized%20%20Watermarked._008.jpeg',
      ],
    },
    {
      id: '2',
      branch: 'Toyota',
      carNumber: 'RJ20 YY 5678',
      model: 'Fortuner',
      launchYear: '2023',
      images: [
        'https://cdni.autocarindia.com/Features/_New%20Sedans%20%20Sports%20Cars%20Web%20Resized%20%20Watermarked._008.jpeg',
        'https://cdni.autocarindia.com/Features/_New%20Sedans%20%20Sports%20Cars%20Web%20Resized%20%20Watermarked._008.jpeg',
      ],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  /** Handle Add / Update Vehicle */
  const handleSaveVehicle = vehicle => {
    if (editingVehicle) {
      // Update
      setVehicles(prev =>
        prev.map(item =>
          item.id === editingVehicle.id
            ? {...vehicle, id: editingVehicle.id}
            : item,
        ),
      );
    } else {
      // Add new
      setVehicles(prev => [...prev, {...vehicle, id: Date.now().toString()}]);
    }
    setEditingVehicle(null);
    setModalVisible(false);
  };

  /** Handle Delete Vehicle */
  const handleDelete = id => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setVehicles(prev => prev.filter(item => item.id !== id));
          },
        },
      ],
    );
  };

  /** Render vehicle card */
  const renderVehicle = ({item}) => (
    <View style={styles.vehicleCard}>
      {/* Horizontal Scroll for multiple images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroll}>
        {item.images.map((img, index) => (
          <Image key={index} source={{uri: img}} style={styles.vehicleImage} />
        ))}
      </ScrollView>

      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={styles.vehicleTitle}>{item.branch}</Text>
        <Text style={styles.vehicleDetails}>
          Model: {item.model} | Year: {item.launchYear}
        </Text>
        <Text style={styles.vehicleDetails}>Car No: {item.carNumber}</Text>
      </View>

      <View style={styles.actionIcons}>
        <TouchableOpacity
          onPress={() => {
            setEditingVehicle(item);
            setModalVisible(true);
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1159/1159633.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png',
            }}
            style={[styles.icon, {tintColor: COLOR.red}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={'Vehicle'} showBack />

      {/* List of Vehicles */}
      <FlatList
        data={vehicles}
        keyExtractor={item => item.id}
        renderItem={renderVehicle}
        contentContainerStyle={{padding: 16}}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No vehicles added yet</Text>
        }
      />

      {/* Add Vehicle Floating Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingVehicle(null);
          setModalVisible(true);
        }}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingVehicle(null);
        }}
        onSave={handleSaveVehicle}
        editingVehicle={editingVehicle}
      />
    </View>
  );
};

export default Vehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  vehicleCard: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    elevation: 1,
  },
  imageScroll: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  vehicleImage: {
    width: 90,
    height: 70,
    borderRadius: 8,
    marginRight: 8,
  },
  vehicleTitle: {
    fontFamily: FONT.SemiBold,
    fontSize: 16,
    color: COLOR.textDark,
  },
  vehicleDetails: {
    fontFamily: FONT.Regular,
    fontSize: 13,
    color: COLOR.textLight,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 12,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: COLOR.primary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 14,
    color: COLOR.grey,
    fontFamily: FONT.Medium,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLOR.primary,
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: COLOR.white,
    fontSize: 30,
    lineHeight: 32,
    fontFamily: FONT.Medium,
  },
});
