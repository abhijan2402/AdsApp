import React, { useRef } from 'react';
import {
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
    ActivityIndicator,
    Animated,
    View,
} from 'react-native';
import { COLOR } from '../Constants/Colors';
import { windowWidth } from '../Constants/Dimensions';
import FONT from '../Constants/Font';

const CustomButton = ({ title, onPress, style, textStyle, loading }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    /** Shrink button slightly on press in */
    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            speed: 20,
            bounciness: 10,
            useNativeDriver: true,
        }).start();
    };

    /** Return button to normal size on press out */
    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            speed: 15,
            bounciness: 6,
            useNativeDriver: true,
        }).start(() => {
            if (!loading && onPress) {
                onPress();
            }
        });
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={loading} // Prevent multiple presses while loading
        >
            <Animated.View style={[styles.button, style, { transform: [{ scale: scaleAnim }] }]}>
                {loading ? (
                    <ActivityIndicator size="small" color={COLOR.white} />
                ) : (
                    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                )}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLOR.primary,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth / 1.3,
        alignSelf: 'center',
        elevation: 3,
    },
    buttonText: {
        color: COLOR.white,
        fontSize: 16,
        // fontWeight: '600',
        fontFamily: FONT.SemiBold,
    },
});
