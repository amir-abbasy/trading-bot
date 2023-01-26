import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../global/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Toast = props => {
  const [show, setShow] = useState((props?.message || props?.message != '') ? true : false);

  useEffect(()=>{
    setTimeout(() => {
      setShow(false)
    }, 4000);
  },[props?.message])

  if (!show) return;

  return (
    <View style={styles.toast}>
      <Text
        style={[
          styles.text,
          {color: props?.type == 'success' ? colors.success : colors.white},
        ]}>
        {props?.message}
      </Text>
      <Ionicons name="close" color={colors.white} size={18} 
      onPress={()=> setShow(null)}
      />

    </View>
  );
};

export default Toast;

Toast.defaultProps = {
  message: 'No message!',
  type: 'info',
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: colors.light + 50,
    padding: 10,
    margin: 22,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: colors.success,
  },
});
