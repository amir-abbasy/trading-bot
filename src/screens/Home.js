import {View, Text, Image, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
const axios = require('axios');
import {colors} from '../global/Theme';
import {default_url} from '../global/Config';
import {Layout, FutureCard} from '../components';

const Home = props => {
  const [trades, setTrades] = useState();
  const [err, seterr] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // _getTrades();
  }, []);

  const _getTrades = async () => {
    setLoading(true);
    let body = {};
    // console.log(body);
    axios
      .post(default_url + '/trades', body)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status) {
          setTrades(response.data.data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <Layout onRefresh={() => alert('onRefresh')} toast={'Login Success'} >
      <View style={styles.container}>
      <View style={styles.logoContainer}>
          <Image style={styles.logo} />
          <Text style={styles.logoText}>Home</Text>
        </View>
      <FlatList data={[1,2,3,4,5,6,7]} renderItem={(item)=> <FutureCard/>} />
        {trades && <FlatList data={trades} renderItem={(item)=> <FutureCard/>} />}
      
      </View>
    </Layout>
  );
};

const styles = {
  container: {
    backgroundColor: colors.primary,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    // width: 100,
    // height: 100,
  },
  logoText: {
    color: colors.light,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
 
};

export default Home;
