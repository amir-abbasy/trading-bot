import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color, getStore} from '../global/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../global/Theme';

export default function Header(props) {
  const [user, setUser] = useState();
  const nav = useNavigation();
  useEffect(() => {
    if (!user) getUser();
  }, []);

  useEffect(()=>{
    props?.getUserData && props.getUserData(user)
  },[user])

  var getUser = async () => {
    var user_ = await getStore('@user');
    setUser(JSON.parse(user_));
  };


  return (
    <View
      style={{
        padding: 10,
        position: props?.homeHeader ? 'absolute' : 'relative',
        top: 0,
        zIndex: 999,
        width: '100%',
        paddingRight: 20,
        borderColor: '#444444',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          {props?.canGoBack && (
            <Ionicons
              name="arrow-back-outline"
              color="#444444"
              size={20}
              style={{marginLeft: 10}}
              onPress={() => nav.goBack()}
            />
          )}
          {props?.title && (
            <Text
              style={{
                ...styles.appName,
                color: colors.success,
              }}>
              {props.title}
            </Text>
          )}
        </View>
        {!props?.canGoBack && user && (
          <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding:5, borderRadius: 50, paddingHorizontal: 10}}>
           <Ionicons
           onPress={() => nav.navigate('Profile')}
           name="stop-circle-outline"
           color={ JSON.parse(user).BotStatus ? colors.success : colors.error}
           size={15}
           style={{marginRight: 5}}
         /> 
          <Text style={{color: colors.success, fontSize: 25}}>
          </Text>
            <Text style={{color: colors.light, marginRight: 15}}>{JSON.parse(user).username}</Text>
            <Ionicons
              onPress={() => nav.navigate('Profile')}
              name="person-outline"
              color={colors.light}
              size={20}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});
