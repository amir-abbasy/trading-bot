import React, {useState} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
const axios = require('axios');
import BTButton from '../components/Button';
import {Input, Layout} from '../components';
import {colors} from '../global/Theme';
import {default_url} from '../global/Config';
import Service from '../global/Service';
import {storeData} from '../global/utils';

const Login = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [err, seterr] = useState();
  const [loading, setLoading] = useState(false);
  // const nav = useNavigation();

  const handleLogin = () => {
    if (
      email.length < 1 ||
      password.length < 1 ||
      name.length < 1 ||
      conPassword.length < 1
    ) {
      seterr({color: colors.error, message: 'All fileds are required!'});
      return false;
    } else {
      if (password.length < 6) {
        seterr({
          color: colors.warn,
          message: 'Password must be 6 characters or more',
        });
        return false;
      } else {
        if (password !== conPassword) {
          seterr({color: colors.error, message: `Password don't match`});
          return false;
        }
        seterr();
        _login();
        return true;
      }
    }
  };

  const _login = async () => {
    true;
    let body = {
      username: name,
      email: email,
      password: password,
      pk: null,
      sk: null,
      balanceUSDT: 0,
      invest: 10,
      leverage: 20,
    };
    // console.log(body);
    axios
      .post(default_url + '/createAccount', body)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status) {
          seterr({color: colors.success, message: response.data.message});
          setTimeout(() => props.navigation.navigate('Login'), 2000);
          console.log('success');
        } else {
          seterr({color: colors.error, message: response.data.message});
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <Layout toast={err?.message ?? false}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Login</Text>
        </View>
        <Input
          placeholder="Email"
          value={email}
          onChange={val => setEmail(val)}
        />
        <Input placeholder="Name" value={name} onChange={val => setName(val)} />
        <Input
          placeholder="Password"
          value={password}
          onChange={val => setPassword(val)}
        />
        <Input
          placeholder="Confirm Password"
          value={conPassword}
          onChange={val => setConPassword(val)}
        />
        {err?.message && (
          <Text style={{color: err.color, margin: 5}}>{err.message}</Text>
        )} 
        <BTButton text="Login" onPress={handleLogin} loading={loading} />
        <Text
          style={styles.text}
          onPress={() => props.navigation.navigate('Login')}>
          Already have an account!
        </Text>
      </View>
    </Layout>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 22,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: colors.light,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  formContainer: {
    width: '80%',
  },
  signupText: {
    alignItems: 'end',
    marginBottom: '3%',
  },
  text: {
    color: colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 25,
  },
};

export default Login;
