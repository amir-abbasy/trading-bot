import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../global/Theme';

// {"index": 3, "item": {"entryPrice": 0.4061, "exitPrice": 0.4086, "height": 0.6118453255017187, "pl": 0.5979600848789535,
// "roi": "12.24%", "status": true, "symbol": "XRP/USDT", "time": "2023-01-27 22:05:00", "trade_id":
//  "1d0ab55b"}, "separators": {"highlight": [Function highlight], "unhighlight": [Function unhighlight],
//  "updateProps": [Function updateProps]}}

const FutureCard = props => {
  var info = props.data.item;
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.text}>FUTURES</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {color: colors.success}]}>Long</Text>
          <Text style={styles.text}>20x</Text>
          <Text style={styles.text}>{info?.symbol}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={[styles.text, {color: colors.light + 70}]}>
            Entry Price{' '}
          </Text>
          <Text style={styles.text}>{info?.entryPrice}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {color: colors.light + 70}]}>
            Exit Price
          </Text>
          <Text style={styles.text}>{info?.exitPrice}</Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={[
              styles.text,
              {
                margin: 0,
                marginRight: 3,
                fontSize: 10,
                color: colors.light + 70,
              },
            ]}>
           {(parseFloat(info?.height)).toFixed(1)+'%'}
          </Text>
          <Ionicons
            name="trending-up-outline"
            color={colors.success}
            size={18}
            onPress={() => setShow(null)}
          />
        </View>
        <Text style={[styles.text, styles.roi]}>+ {info?.roi}</Text>
        <Text
          style={[
            styles.text,
            {color: colors.light + 70, textAlign: 'center'},
          ]}>
          {/* {info?.time.split(' ')[0]} */}
          {info?.time}
        </Text>
      </View>
    </View>
  );
};

export default FutureCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.5,
    borderColor: colors.light + 50,
    backgroundColor: colors.light + 10,
    padding: 15,
    marginVertical: 5,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  text: {
    color: colors.light,
    marginRight: 10,
  },
  roi: {
    fontSize: 35,
    color: colors.success,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
