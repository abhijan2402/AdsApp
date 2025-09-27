import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {AuthContext} from '../Backend/AuthContent';
import RootNavigation from './RootNavigation';
import AuthStack from './AuthNavigation';
import {ToastProvider} from '../Constants/ToastContext';

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  // const {currentStatus} = useContext(AuthContext);

  if (!auth) {
    console.error('AuthContext not found');
    return null;
  }

  const {user, loading} = auth;

  const [manageLogin, setManageLogin] = useState(user?true:false)

  useEffect(()=>{
    setManageLogin(user?true:false)
  },[user])

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ToastProvider>{manageLogin ? <RootNavigation /> : <AuthStack />}</ToastProvider>
    </View>
  );
};

export default MainNavigation;
