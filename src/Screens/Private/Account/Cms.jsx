import React from 'react';
import {StyleSheet, View, ScrollView, useWindowDimensions} from 'react-native';
import Header from '../../../Components/FeedHeader';
import RenderHTML from 'react-native-render-html';
import {COLOR} from '../../../Constants/Colors';

const Cms = ({navigation}) => {
  const {width} = useWindowDimensions();

  // Later this HTML will come from API
  const termsHTML = `
    <h2>Terms & Conditions</h2>
    <p>
      Welcome to our app. By accessing or using our services, you agree to be bound by these 
      <strong>Terms and Conditions</strong>. 
    </p>
    <h3>1. Use of Service</h3>
    <p>
      You must use the service only for lawful purposes. Misuse of the app is strictly prohibited.
    </p>
    <h3>2. Payments</h3>
    <p>
      All payments are secure and processed through authorized payment gateways.
    </p>
    <h3>3. Liability</h3>
    <p>
      We are not liable for any damages arising from misuse of the service.
    </p>
  `;

  return (
    <View style={styles.safeArea}>
      <Header
        title={'Terms & Condition'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <RenderHTML
          contentWidth={width}
          source={{html: termsHTML}}
          baseStyle={styles.htmlBase}
        />
      </ScrollView>
    </View>
  );
};

export default Cms;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    padding: 16,
  },
  htmlBase: {
    fontSize: 14,
    color: COLOR.textDark,
    lineHeight: 22,
  },
});
