import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import {useEffect, useState} from 'react';
const axios = require('axios');
import {colors} from '../global/Theme';
import {default_url} from '../global/Config';
import {Layout, FutureCard, Graph} from '../components';
import {useIsFocused} from '@react-navigation/native';
import kandles_test from '../global/kandles.json';


const Home = props => {
  const [trades, setTrades] = useState();
  const [err, seterr] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState();
  const [kandles, setKandles] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    _getTrades();
    userId && _balance(userId);
    // _kandles();
  }, [isFocused]);

  useEffect(() => {
    let interval = setInterval(async () => {
      _kandles();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const _kandles = async _ => {
    // https://api4.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&startTime=1675103140
    console.log('GET CANDLES');
    axios
      .get(
        `https://api4.binance.com/api/v3/klines?symbol=XRPUSDT&interval=5m&limit=50`,
      )
      .then(function (response) {
        // console.log(response.data);
        setKandles(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const _balance = async user_id => {
    console.log('BALANCE CHEKING');
    // if (loading) return;
    setLoading(true);
    let body = {user_id: user_id ?? userId};
    console.log(body);
    axios
      .post(default_url + '/balance', body)
      .then(function (response) {
        if (response.data.status) {
          console.log(response.data);
          setBalance(response.data.data);
        } else {
          console.log('balance API Error');
          setBalance();
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  const _getTrades = async () => {
    console.log('GET TRADES');
    if (loading) return;
    setLoading(true);
    let body = {};
    // console.log(body);
    axios
      .post(default_url + '/trades', body)
      .then(function (response) {
        // console.log(response.data);
        if (response.data.status) {
          var dataToday = response.data.data.filter(
            _ => _.time.split(' ')[0] == new Date().toISOString().split('T')[0],
          );
          setTrades(dataToday.reverse());
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };
  // console.log("kandles", kandles);

  return (
    <Layout
      onRefresh={() => {
        _getTrades();
        userId && _balance(userId);
      }}
      toast={'Login Success'}
      getUserData={data => {
        if (data && !userId) {
          setUserId(JSON.parse(data)['user_id']);
          _balance(JSON.parse(data)['user_id']);
        }
      }}>
      <View style={styles.container}>

        {balance ? (
          <>
            <View style={[styles.center, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
              <View>
                <Text style={styles.usdtbalance}>USDT BALANCE</Text>
              {balance && (
                <Text style={styles.balance}>${balance?.total.toFixed(4)}</Text>
              )}

              </View>
              {balance?.used != 0 && (<View style={[{marginLeft: '5%'}]}>
              <View >
                  <Text style={[styles.usdtbalance, {fontSize: 10}]}>USED</Text>
                  <Text
                    style={[
                      styles.balance,
                      {fontSize: 15},
                    ]}>
                    ${balance?.used.toFixed(4)}
                  </Text>
                </View>

                <View style={[{borderTopWidth: 1, borderColor: colors.light+'30', marginTop: 3}]}>
                  <Text style={[styles.usdtbalance, {fontSize: 10}]}>FREE</Text>
                  <Text
                    style={[
                      styles.balance,
                      {fontSize: 15},
                    ]}>
                    ${balance?.free.toFixed(4)}
                  </Text>
                </View>
              </View>)}
            </View>
          </>
        ) : (
          <ActivityIndicator color={colors.light + 50} style={{marginVertical:'10%'}} />
        )}

        {/* {console.log(trades.filter(_=>_.status != 'active'))} */}
        {/* GRAPH */}

        {trades && kandles ? (
          <>
            {trades
              .filter(_ => _.status == 'active')
              .map((TRADE, KEY) => {
                // console.log("TRADE", TRADE);
                var _color =
                  kandles[kandles.length - 1][4] > TRADE['entryPrice']
                    ? '#85c795'
                    : '#e65a5c';
                return (
                  <View
                    key={KEY}
                    style={{
                      borderWidth: 0.5,
                      borderColor: _color + 50,
                      // borderLeftWidth: 0,
                      // borderRightWidth: 0,
                      // paddingVertical: 10,
                      marginVertical: '10%',
                      backgroundColor: _color + '10',
                      borderRadius: 3,
                    }}>
                    <View style={{height: 200}}>
                     <Graph kandles={kandles} data={TRADE} />
                    </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 20,
                          width:'100%',
                          position: 'absolute',
                          bottom: 10,                        }}>
                        <View>
                          <Text style={{color: colors.light}}>
                            {TRADE['symbol']}
                          </Text>
                          <Text style={{color: colors.light + 80}}>
                            Leverage: 20x
                          </Text>
                          <Text
                            style={{color: colors.light + 80, fontSize: 12}}>
                            {TRADE['time']}
                          </Text>
                        </View>
                        <View>
                        
                            <Text
                              style={{
                                color: _color,
                                fontSize: 50,
                                textAlign: 'right',
                              }}>
                              {(
                                (100 -
                                  (TRADE['entryPrice'] /
                                    kandles[kandles.length - 1][4]) *
                                    100) *
                                20
                              ).toFixed(1)}
                              %
                            </Text>
                        </View>
                      </View>
                    </View>
                );
              })}
          </>
        ) : (
          <ActivityIndicator color={colors.light + 50} style={{marginVertical:'10%'}} />
        )}

        {/* <FlatList data={[1,2,3,4,5,6,7]} renderItem={(item)=> <FutureCard/>} /> */}
        <Text style={styles.title}>Positions today</Text>
        {trades ? (
          <FlatList
            data={trades.filter(_ => _.status != 'active')}
            renderItem={item => <FutureCard data={item} />}
            ListEmptyComponent={<Text style={styles.empty}>No Data</Text>}
          />
        ) : (
          <ActivityIndicator color={colors.light + 50} style={{marginVertical:'10%'}} />
        )}
      </View>
    </Layout>
  );
};

const styles = {
  container: {
    backgroundColor: colors.primary,
    margin: 15,
  },
  center: {
    alignItems: 'center',
  },
  title: {
    color: colors.light,
    fontSize: 14,
    marginLeft: 0,
    margin: 10,
  },
  balance: {
    color: colors.light+'99',
    fontSize: 35,
    fontWeight: 'bold',
    // letterSpacing: 3,
  },
  usdtbalance: {
    color: colors.light + 80,
    fontSize: 14,
    letterSpacing: 3,
  },
  empty: {
    backgroundColor: colors.info + 10,
    borderWidth: 0.5,
    borderColor: colors.light + 50,
    borderRadius: 5,
    color: colors.light + 90,
    textAlign: 'center',
    marginVertical: 20,
    padding: 7,
  },
};

export default Home;
