import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import {useEffect, useState} from 'react';
const axios = require('axios');
import {colors} from '../global/Theme';
import {default_url} from '../global/Config';
import {Layout, FutureCard} from '../components';

const History = props => {
  const [trades, setTrades] = useState();
  const [err, seterr] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _getTrades();
  }, []);

  const _getTrades = async () => {
    setLoading(true);
    let body = {};
    axios
      .post(default_url + '/trades', body)
      .then(function (response) {
        // console.log(response.data);
        if (response.data.status) {
          setTrades(response.data.data.filter(_ => _.status != 'active'));
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
      onRefresh={() => _getTrades()}
      toast={'Login Success'}
      title="Trade History">
      <View style={styles.container}>
        <Text style={styles.title}>Last (50) Trades</Text>
        {/* <FlatList data={[1,2,3,4,5,6,7]} renderItem={(item)=> <FutureCard/>} /> */}
        {trades ? (
          <FlatList
            data={trades}
            renderItem={item => <FutureCard data={item} />}
          />
        ) : (
          <ActivityIndicator
            color={colors.light + 50}
            style={{marginVertical: '10%'}}
          />
        )}
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
    marginBottom: 10,
  },
};

export default History;
