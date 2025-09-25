import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import FONT from '../Constants/Font';

const VehicleCard = ({image, name, model, launchYear}) => {
  return (
    <View style={styles.vehicleCard}>
      <Image source={{uri: image}} style={styles.vehicleImage} />
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{name}</Text>
        <Text style={styles.vehicleDetails}>Model: {model}</Text>
        <Text style={styles.vehicleDetails}>Launch Year: {launchYear}</Text>
      </View>
    </View>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  vehicleImage: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 10,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontFamily: FONT.SemiBold,
    marginBottom: 4,
    color: '#333',
  },
  vehicleDetails: {
    fontSize: 14,
    color: '#777',
    fontFamily: FONT.Regular,
  },
});
