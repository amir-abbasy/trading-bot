import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import BTButton from '../components/Button';
import Input from '../components/Input';
import { colors } from '../global/Theme';

const Settings = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      Alert.alert('Success', 'You have successfully logged in!');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} />
        <Text style={styles.logoText}>Set Keys</Text>
      </View>

      <View style={styles.formContainer}>
        <Input placeholder="Public key" />
        <Input placeholder="Private key" />
        <BTButton text="Submit" 
         onPress={()=> props.navigation.navigate("login")}
         />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 22
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
    width: '100%',
  },
};

export default Settings;
