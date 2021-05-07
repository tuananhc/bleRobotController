import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
const Button = props => {
  const loading = props.loading ? true : false;
  const styleButton = props.style ? props.style : styles.styleButton;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styleButton}
      onPress={() => props.onPress()}>
      {loading ? (
        <ActivityIndicator size="small" color={'#fff'} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: '100%',
    borderRadius: 10,
  },
});
export default Button;
