import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import {Layout, Switch} from '../components';
import BTButton from '../components/Button';
import Input from '../components/Input';
import {default_url} from '../global/Config';
import {colors} from '../global/Theme';
import { storeData } from '../global/utils';
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
          storeData('@user', JSON.stringify(response.data.data[0]));
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

  const updateBot = params => {
    setLoading(true);
    let body = {
      user_id: user?.user_id ?? JSON.parse(user)['user_id'],
      data: params,
    };
    console.log('UPDATE POST', body);
    axios
      .post(default_url + '/updateUser', body)
      .then(function (response) {
        if (response.data.status) {
          seterr();
          console.log('response', response.data);
          // setIsEditMode(false);
          _getUserData(user?.user_id);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <Layout
      getUserData={data => data && setUser(JSON.parse(data))}
      onRefresh={() => null}
      title="Settings"
      >
      {user && (
        <View style={styles.container}>
          {/* <Image style={styles.logo} /> */}
          <View style={styles.card}>
            <Text style={styles.title}>API Keys</Text>
            {!user?.pk || isEditMode ? (
              <View style={{}}>
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
              <View style={{}}>
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
          </View>

          {/* INVEST */}
          <View style={styles.card}>
            <Text style={styles.title}>Invest</Text>
            <View style={[styles.row]}>
              <Input
                placeholder={user?.invest + ''}
                // value={user?.invest + ''}
                onChange={val => null}
                keyboardType="number-pad"
                style={{
                  width: '40%',
                  marginBottom: 0,
                  textAlign: 'center',
                  fontWeight: '900',
                }}
              />
              <BTButton
                text="Submit"
                onPress={() => updateBot({invest: 6})}
                loading={loading}
                style={{width: '60%'}}
              />
            </View>
          </View>

          {/* DISABLE BOT */}
          <View style={styles.card}>
            <Text style={styles.title}>Enable Bot</Text>
            <Switch
              mode={user?.BotStatus}
              onSwitch={bool => updateBot({BotStatus: bool})}
            />
          </View>

          {/* EXIT TRADE */}
          {user?.isOrderPlaced && <View style={styles.card}>
            <Text style={styles.title}>Exit current trade</Text>
            <BTButton
              text="Exit Position"
              onPress={() => {
                updateBot({isOrderPlaced: false});
              }}
              loading={loading}
              style={{backgroundColor: colors.error}}
            />
            <Text style={{fontSize: 10, color: colors.warn, marginTop: 5}}>
              Close position manually on your exchange
            </Text>
          </View>}

          {/* VIEW LOGS */}
          <View style={styles.card}>
            <Text style={styles.title}>View Logs</Text>
            <BTButton
              text="Logs <>"
              onPress={() => navigation.navigate('Logs')}
              loading={loading}
              style={{backgroundColor: colors.info + 60}}
            />
          </View>
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
  },
  card: {
    backgroundColor: colors.light+10,
    padding: 10,
    margin: 10,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: colors.light+50,
    paddingBottom:20

  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: colors.light,
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 0,
    // marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 3,
  },
};

export default Settings;
