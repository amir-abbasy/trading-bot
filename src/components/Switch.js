import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button} from '../components';
import {colors} from '../global/Theme';
const Switch = (props) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 3
      }}
      // onPress={()=> null}
      >
      <Button
        text="ON"
        onPress={() => props?.mode == true ? null : props?.onSwitch(true)}
        loading={false}
        style={{width: '50%', backgroundColor: props?.mode == true ? colors.success :  colors.secondary}}
      />
        <Button
        text="OFF"
          onPress={() => props?.mode == false ? null : props?.onSwitch(false)}
        loading={false}
        style={{width: '50%', backgroundColor: props?.mode == false ? colors.error :  colors.secondary}}
      />
     
    </TouchableOpacity>
  );
};

export default Switch;

const styles = StyleSheet.create({});
