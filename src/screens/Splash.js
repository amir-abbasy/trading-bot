import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../global/Theme';
import { getStore } from '../global/utils';

const Splash = props => {
  useEffect(() => {
    _checkIsUserLogin()
  
  });

  _checkIsUserLogin = async()=>{
    var user_ = await getStore('@user');
    setTimeout(async () => {
      if(JSON.parse(user_)){
        props.navigation.navigate('Main');
      }else{
        props.navigation.navigate('Login');
      }
    }, 1000);

  }
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name={'trending-up-outline'} color={colors.success} size={50} />
      <Text style={{color: colors.success}}>Trading BOT</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
