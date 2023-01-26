import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { colors } from '../global/Theme';

const SubmitButton = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props.style]}
    onPress={props.onPress}
    >
      {props?.loading ? <ActivityIndicator color="#fff" loading={true} />
      :<Text style={styles.buttonText}>{props.text}</Text>}
    </TouchableOpacity>
  );
};
SubmitButton.defaultProps = {
  text: 'Submit',
  onPress: ()=> alert("no cation"),
  loading: true
};

const styles = {
  button: {
    backgroundColor: '#85c795',
    padding: 15,
    width: '100%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default SubmitButton;
