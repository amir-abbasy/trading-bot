import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../global/Theme';
const FutureCard = () => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.text}>FUTURES</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {color: colors.success}]}>Long</Text>
          <Text style={styles.text}>20x</Text>
          <Text style={styles.text}>TRX/USDT</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={[styles.text, {color: colors.light + 70}]}>
            Entry Price{' '}
          </Text>
          <Text style={styles.text}>0.004577</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {color: colors.light + 70}]}>
            Exit Price
          </Text>
          <Text style={styles.text}>0.004687</Text>
        </View>
      </View>


      <View style={{alignItems: 'center'}}>
     <View style={{flexDirection:'row', alignItems: 'center'}}>
     <Text style={[styles.text,{margin: 0, marginRight: 3, fontSize: 10, color: colors.light+70}]}>
          0.8%
        </Text>
        <Ionicons
          name="trending-up-outline"
          color={colors.success}
          size={18}
          onPress={() => setShow(null)}
        />
     </View>
        <Text style={[styles.text, styles.roi]}>
          + {(Math.random() * 50).toFixed(1)}%
        </Text>
        <Text
          style={[
            styles.text,
            {color: colors.light + 70, textAlign: 'center'},
          ]}>
          {new Date().toISOString().split('T')[0]}
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
    margin: 15,
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
