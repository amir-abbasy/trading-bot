import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import {Layout, Switch} from '../components';
import BTButton from '../components/Button';
import Input from '../components/Input';
import {default_url} from '../global/Config';
import {colors} from '../global/Theme';
// import * as utils from '../global/utils';

const Settings = props => {
  const [email, setEmail] = useState('');
  const [pk, setPk] = useState('');
  const [sk, setSk] = useState('');
  const navigation = useNavigation();
  const [err, seterr] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    _getUserData();
  }, [user]);

  const _getUserData = async (id = null) => {
    if (!user?.pk == null) return;
    // setLoading(true);
    let body = {user_id: id ? id : JSON.parse(user)['user_id']};
    console.log('GET', body);
    axios
      .post(default_url + '/user', body)
      .then(function (response) {
        console.log('response', response.data);
        if (response.data.status) {
          setUser(response.data.data[0]);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  // console.log(user.username);

  const setNewAPIKeys = () => {
    setLoading(true);

    if (pk.length < 1 || sk.length < 1) {
      seterr('* set public and privete keys!');
      setLoading(false);
      return;
    }
    let body = {
      user_id: user?.user_id ?? JSON.parse(user)['user_id'],
      data: {pk, sk},
    };
    console.log('POST', body);
    axios
      .post(default_url + '/updateUser', body)
      .then(function (response) {
        if (response.data.status) {
          seterr();
          // console.log('response', response.data);
          setIsEditMode(false);
          _getUserData(user?.user_id);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  console.log(user);

  return (
    <Layout getUserData={data => data && setUser(JSON.parse(data))}>
      {user && (
        <View style={styles.container}>
          {/* <Image style={styles.logo} /> */}

          <Text style={styles.title}>API Keys</Text>
          {!user?.pk || isEditMode ? (
            <View style={styles.formContainer}>
              <Input
                placeholder="Public Key"
                value={pk}
                onChange={val => setPk(val)}
              />
              <Input
                placeholder="Private Key"
                value={sk}
                onChange={val => setSk(val)}
                // keyboardType={}
              />
              {err && <Text style={{color: 'tomato', margin: 5}}>{err}</Text>}
              <BTButton
                text="Submit"
                onPress={() => setNewAPIKeys()}
                loading={loading}
                style={{backgroundColor: colors.warn}}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Input
                placeholder="Public Key"
                value={user?.pk ?? '_'}
                editable={user?.pk ? true : false}
                style={user?.pk ? {opacity: 0.5} : {}}
                // onChange={val => setPk(val)}
              />
              <BTButton
                text={'Update keys'}
                onPress={() => setIsEditMode(!isEditMode)}
                loading={loading}
                style={{backgroundColor: colors.secondary}}
              />
            </View>
          )}

          <View style={styles.formContainer}>
            <Text style={styles.title}>Invest</Text>
            <Input
              placeholder="Private Key"
              value={user?.invest + ''}
              onChange={val => null}
              keyboardType="number-pad"
            />
            <BTButton
              text="Submit"
              onPress={() => null}
              loading={loading}
            />

            <Text style={styles.title}>Enable Bot</Text>
            <Switch mode={user?.BotStatus} />
          </View>

          <Text style={styles.title}>Cancel current trade</Text>
          <BTButton
            text="Cancel"
            onPress={() => null}
            loading={loading}
            style={{backgroundColor: colors.light+20}}
          />

        <Text style={styles.title}>View Logs</Text>
          <BTButton
            text="Logs <>"
            onPress={() => navigation.navigate("Logs")}
            loading={loading}
            style={{backgroundColor: colors.info+60}}
          />

        </View>
      )}

      {/* <BTButton text="Submit" 
         onPress={()=> {
          storeRemoveData("@user")
          navigation.navigate("login")}}
         /> */}
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
    width: 100,
    height: 100,
  },
  title: {
    color: colors.light,
    fontSize: 20,
    margin: 10,
    marginLeft: 0,
    marginTop: 20,
  },
  formContainer: {
    // width: '100%',
    marginBottom: 20,
  },
};

export default Settings;
