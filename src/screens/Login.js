import React, {useState} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
const axios = require('axios');
import BTButton from '../components/Button';
import {Input} from '../components';
import {colors} from '../global/Theme';
import {default_url} from '../global/Config';
import Service from '../global/Service';
import {storeData} from '../global/utils'

const Login = props => {
  const [email, setEmail] = useState('amirabbasyk2@gmail.com');
  const [password, setPassword] = useState('123456');
  const [err, seterr] = useState();
  const [loading, setLoading] = useState(false);
  // const nav = useNavigation();

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      seterr(`Enter ${email.length < 1 ? 'Email' : 'Password'}`);
      return false;
    } else {
      if (password.length < 6) {
        seterr(`Password must be 6 characters or more`);
        return false;
      } else {
        seterr();
        _login();
        return true;
      }
    }
  };

  const _login = async () => {
    setLoading(true);
    let body = {email: email, password: password};
    // console.log(body);
    axios
      .post(default_url + '/user', body)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status && response.data.data.length > 0) {
          // Alert.alert('Success', 'You have successfully logged in!');
          storeData('@user', JSON.stringify(response.data.data[0]));
          props.navigation.navigate('Main');
        } else {
          seterr(`No user found!`);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Login</Text>
      </View>
      <Input
        placeholder="Email"
        value={email}
        onChange={val => setEmail(val)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={val => setPassword(val)}
      />
      {err && <Text style={{color: 'tomato', margin: 5}}>{err}</Text>}
      <BTButton text="Login" onPress={handleLogin} loading={loading} />
      <Text
        style={styles.text}
        onPress={() => props.navigation.navigate('SignUp')}>
        Create new account
      </Text>
    </View>
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
