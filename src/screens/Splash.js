import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../global/Theme';

const Splash = props => {
  useEffect(() => {
    setTimeout(async () => {
      // var user = await getStore('@user')
      // if(user)nav.navigate('Main')
      // else nav.navigate('Login')
      props.navigation.navigate('Login');
    }, 1000);
  });
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
