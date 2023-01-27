import React from 'react';
import { TextInput } from 'react-native';
import { colors } from '../global/Theme';

const InputField = (props) => {
  return (
    <TextInput
      style={{ ...styles.input, ...props.style }}
      value={props.value}
      onChangeText={props?.onChange}
      placeholder={props.placeholder}
      placeholderTextColor="#aaa"
      autoCapitalize="none"
      keyboardType="email-address"
      editable={props?.editable}
    />
  );
};
InputField.defaultProps = {
  placeholder: 'Enter the value',
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    color: colors.light,
    borderRadius: 5,
    backgroundColor: colors.secondary
  },
};

export default InputField;
