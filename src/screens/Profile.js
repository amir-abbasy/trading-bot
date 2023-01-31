import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import {Layout, Button} from '../components';
import Input from '../components/Input';
import {default_url} from '../global/Config';
import {colors} from '../global/Theme';
import { storeRemoveData } from '../global/utils';
// import * as utils from '../global/utils';

const Settings = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  // useEffect(() => {
  //   _getUserData();
  // }, [user]);

  const _getUserData = async (id = null) => {};

  console.log('user', user);

  return (
    <Layout
      title="Profile"
      getUserData={data => data && setUser(JSON.parse(data))}>
      {user && (
        <View style={styles.container}>
          <Image style={styles.logo} />
          <Text style={styles.title}>{user.username}</Text>
          <Text style={[styles.text,{marginTop: 15, color: colors.light+70}]}>EMAIL : </Text>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={[styles.text,{marginTop: 15, color: colors.light+70}]}>INVEST : </Text>
          <Text style={styles.text}>${user.invest} </Text>

          <Button
                text={'Logout'}
                onPress={() => {
                    storeRemoveData('@user')
                    props.navigation.navigate('Login')
                }}
                style={{backgroundColor: colors.warn, marginTop: 50}}
                color={{color: 'red'}}
              />
        </View>
      )}
    </Layout>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 22,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 70,
    height: 70,
    backgroundColor: colors.light + 20,
    borderRadius: 2,
  },
  title: {
    color: colors.light,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 0,
  },
  text: {
    color: colors.light,
    fontSize: 14,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
};

export default Settings;
