import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import FONT from '../../Constants/Font';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to OneRoute',
    description:
      'Join a community of people sharing rides on similar routes.\nSave money, reduce traffic, and help the environment',
    image:
      'https://cdn3d.iconscout.com/3d/premium/thumb/road-trip-with-car-3d-icon-png-download-10192654.png',
  },
  {
    id: '2',
    title: 'Track Your Journey',
    description:
      'Easily find people traveling on the same route.\nTrack your ride in real-time and stay informed every step of the way.',
    image:
      'https://img.freepik.com/free-psd/3d-illustration-with-travel-tourists-characters_23-2151303980.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: '3',
    title: 'Stay Connected',
    description:
      'Stay connected with riders and Companion.\nPlan trips, chat, and enjoy a safe and social travel experience.',
    image:
      'https://cdn3d.iconscout.com/3d/premium/thumb/car-3d-icon-png-download-8650446.png',
  },
];

const OnBoarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  /** Handles scroll event to detect current slide */
  const handleScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  /** Go to next slide on button press */
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation?.navigate('Login'); // navigate to Home or Login
    }
  };

  /** Renders each slide item */
  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Slide List */}
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
        scrollEventThrottle={16}
      />

      {/* Dots */}
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width,
    height: windowHeight / 1.8,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: FONT.SemiBold,
    color: COLOR.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: COLOR.textLight,
    textAlign: 'center',
    paddingHorizontal: 15,
    lineHeight: 22,
    fontFamily: FONT.Regular,
    // marginBottom: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: COLOR.inactiveDot,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLOR.primary,
    width: 20,
  },
  button: {
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: windowHeight * 0.1,
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 18,
    fontFamily: FONT.Medium,
  },
});
