import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Svg, {
  Rect,
  Line,
  G,
  Text,
  TSpan,
  LinearGradient,
  Stop,
  Defs,
} from 'react-native-svg';
// import data from './data.json';

// var data_ = [
//   25, 45, 95, 32, 65, 54, 87, 65, 32, 54, 65, 0, 87, 54, 32, 65, 54, 87, 65,
//   65, 32, 21, 54, 65,100,
// ];
// var data__ = [
//   0.345, 0.345, 0.395, 0.332, 0.365, 0.354, 0.387, 0.365, 0.332, 0.3125,
// ];
// var data_ = [0.3431,0.3435,0.3441,0.3437,0.3435,0.3436,0.3438,0.344,0.3439,0.345]
// var time = kandles.map(_=> _[1])

const price_percentage = (num, per = 0.1) => (num / 100) * per;
const percentage_ = (num1, num2) => (num1 / num2) * 100;

export default function Graph(props) {
  var data_ = props?.kandles.map(_ => _[4]);
  var high = Math.max(...data_);
  var low = Math.min(...data_);
  const volume = high - low;
  const perc = val => ((high - val) / volume) * 100;

  // test vars
  var entryPrice = props?.data.entryPrice;
  // var entryPrice = 0.4000;
  var target = entryPrice + price_percentage(entryPrice, 0.6);
  var stopLoss = entryPrice + price_percentage(entryPrice, -2);

  // console.log('RESULT', high, low, volume);
  // console.log("TEST", high,volume, high-0.3440, (0.0005/0.001) * 100)

  // return
  //   console.log("data_", data_);

  return (
    <View style={styles.container}>
      <View style={styles.graph}>
        <Svg
          height="100%"
          width="100%"
          viewBox={`100 0 ${Dimensions.get('screen').width} 200`}
          // viewBox={`0 0 60 60`}
          style={{}}>
          <G style={{}}>
            {true &&
              data_.map((_, k) => {
                if (k < 1) return;
                var x1 = k * (100 / data_.length);
                var x2 = (k + 1) * (100 / data_.length);
                var y1 = ((high - data_[k - 1]) / volume) * 100;
                var y2 = ((high - data_[k]) / volume) * 100;
                // var y1 = 100 - percentage_(data_[k - 1], low);
                // var y2 = 100 - percentage_(data_[k], low);
                // var y1 = data_[k - 1];
                // var y2 = data_[k];

                // console.log(x1, y1, x2, y2);

                return (
                  <>
                    <Defs>
                      <LinearGradient
                        id={`market${k}`}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1">
                        <Stop
                          offset="0"
                          stopColor={
                            entryPrice < data_[k] ? '#85c795' : '#e65a5c'
                          }
                          stopOpacity={data_[k] < data_[k - 1] ? '0.5' : '1'}
                        />
                        <Stop
                          offset="1"
                          stopColor={
                            entryPrice < data_[k] ? '#85c795' : '#e65a5c'
                          }
                          stopOpacity={data_[k] < data_[k - 1] ? '1' : '0.5'}
                        />
                      </LinearGradient>
                    </Defs>
                    <Line
                      x1={x1 + '%'}
                      y1={perc(data_[k - 1]) + '%'}
                      x2={x2 + '%'}
                      y2={perc(data_[k]) + '%'}
                      // stroke={data_[k - 1] < data_[k] ? '#85c795' : '#e65a5c'}
                      // stroke={entryPrice < data_[k] ? '#85c795' : '#e65a5c'}
                      stroke={`url(#market${k})`}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />
                  </>
                );
              })}

            <Defs>
              <LinearGradient id="target" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#85c795" stopOpacity="0" />
                <Stop offset="1" stopColor="#85c795" stopOpacity="1" />
              </LinearGradient>
            </Defs>

            <Line
              x1={25 + '%'}
              y1={perc(target) + '%'}
              // y1={"50%"}
              x2={200 + '%'}
              y2={perc(target) + '%'}
              // y2={"50%"}
              //   stroke="#85c79570"
              stroke="url(#target)"
              //   fill="url(#path)"
              stroke-width={3}
              strokeDasharray="4, 3"
            />
            <Text
              x="110%"
              // y={perc(entryPrice) + 10 + '%'}
              y={perc(target) + '%'}
              fontSize="10"
              fontWeight="400"
              fill="#85c79590"
              transform="translate(0, -4)">
              {target}
            </Text>

            <Defs>
              <LinearGradient id="entry" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#cccccc50" stopOpacity="0" />
                <Stop offset="1" stopColor="#cccccc50" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Line
              x1={25 + '%'}
              y1={perc(entryPrice) + '%'}
              // y1={"50%"}
              x2={200 + '%'}
              y2={perc(entryPrice) + '%'}
              // y2={"50%"}
              //   stroke="#cccccc30"
              stroke="url(#entry)"
              stroke-width={3}
              // strokeDasharray="4, 3"
            />
            <Text
              x="110%"
              // y={perc(entryPrice) + 10 + '%'}
              y={perc(entryPrice) + '%'}
              fontSize="10"
              fontWeight="400"
              fill="#cccccc90"
              transform="translate(0, -4)">
              {entryPrice}
            </Text>

            <Defs>
              <LinearGradient id="stopLoss" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#e65a5c" stopOpacity="0" />
                <Stop offset="1" stopColor="#e65a5c" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Line
              x1={25 + '%'}
              y1={perc(stopLoss) + '%'}
              // y1={"50%"}
              x2={200 + '%'}
              y2={perc(stopLoss) + '%'}
              // y2={"50%"}
              //   stroke="#e65a5c70"
              stroke="url(#stopLoss)"
              stroke-width={3}
              strokeDasharray="4, 3"
            />
            <Text
              x="110%"
              // y={perc(entryPrice) + 10 + '%'}
              y={perc(stopLoss) + '%'}
              fontSize="10"
              fontWeight="400"
              fill="#e65a5c90"
              transform="translate(0, -4)">
              {stopLoss}
            </Text>

            {/* <Defs>
              <LinearGradient id="footer" x1="0" y1="1" x2="0" y2="0">
                <Stop offset="0" stopColor="#000" stopOpacity="1" />
                <Stop offset="1" stopColor="#000" stopOpacity="0" />
              </LinearGradient>
            </Defs>

            <Rect
              x="25%"
              y={'60%'}
              width="125%"
              height="40%"
              fill="url(#footer)"
              rx={0}></Rect> */}

            {/* {console.log(entryPrice, perc(entryPrice))} */}
            {/* <G
              onPress={() => {
                alert('click', entryPrice);
              }}>
              <Rect
                x="50%"
                // y={perc(entryPrice) + '%'}
                width="50"
                height="30"
                fill="#85c795"
                rx={5}></Rect>
              <Text
                x="52%"
                // y={perc(entryPrice) + 10 + '%'}
                y="10%"
                fontSize="14"
                fontWeight="400"
                fill="#fff"
                // transform="translate(132.558 43.385)"
              >
                {entryPrice}
                <TSpan 
                x="66%"
                //  y={perc(entryPrice) + 10 + '%'} fill="#85c795"
                >
                  LONG
                </TSpan>
              </Text>
            </G> */}
          </G>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  graph: {
    justifyContent: 'center',
    // backgroundColor: '#ffffff05',
    height: 200,
    width: Dimensions.get('screen').width / 1.1,
    // marginTop: 200,
    // borderWidth: 0.1,
    // borderColor: '#fff',
    // borderRadius: 5,
    // padding: 10,
  },
});
