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
      }}
      onPress={()=> null}
      >
      <Button
        text="ON"
        //   onPress={() => setNewAPIKeys()}
        loading={false}
        style={{width: '50%', backgroundColor: props?.mode == true ? colors.success :  colors.secondary}}
      />
        <Button
        text="OFF"
        //   onPress={() => setNewAPIKeys()}
        loading={false}
        style={{width: '50%', backgroundColor: props?.mode == false ? colors.success :  colors.secondary}}
      />
     
    </TouchableOpacity>
  );
};

export default Switch;

const styles = StyleSheet.create({});
