import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { COLOR } from '../Constants/Colors';
import FONT from '../Constants/Font';

const ActionButtons = ({ onOfferRidePress, onLookingRidePress }) => {
    return (
        <View style={styles.actionButtons}>
            {/* Offer Ride Button */}
            <TouchableOpacity
                onPress={onOfferRidePress}
                style={[styles.smallPrimaryButton, { backgroundColor: COLOR.green }]}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png',
                    }}
                    style={styles.smallButtonIcon}
                />
                <Text style={styles.smallButtonText}>Offer a Ride</Text>
            </TouchableOpacity>

            {/* Looking for Ride Button */}
            <TouchableOpacity
                onPress={onLookingRidePress}
                style={[
                    styles.smallPrimaryButton,
                    { backgroundColor: COLOR.lookingRide },
                ]}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/152/152356.png',
                    }}
                    style={styles.smallButtonIcon}
                />
                <Text style={styles.smallButtonText}>Looking for Ride</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ActionButtons;

const styles = StyleSheet.create({
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    smallPrimaryButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    smallButtonText: {
        fontSize: 14,
        fontFamily: FONT.SemiBold,
        color: COLOR.white,
    },
    smallButtonIcon: {
        width: 17,
        height: 17,
        marginRight: 6,
        tintColor: COLOR.white,
    },
});
