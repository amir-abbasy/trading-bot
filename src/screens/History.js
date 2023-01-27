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
    _getTrades();
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
    <Layout onRefresh={() => _getTrades()} toast={'Login Success'} >
      <View style={styles.container}>
          <Text style={styles.title}>Trade History</Text>
      {/* <FlatList data={[1,2,3,4,5,6,7]} renderItem={(item)=> <FutureCard/>} /> */}
        {trades && <FlatList data={trades} renderItem={(item)=> <FutureCard data={item} />} />}
        </View>
    </Layout>
  );
};

const styles = {
  container: {
    backgroundColor: colors.primary,
    margin: 15,

    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    color: colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10
  },
 
};

export default Home;
