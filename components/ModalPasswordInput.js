import React from "react";
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ModalPasswordInput = ({ props }) => {
  const { hidePassword, onChange, onBlur, value, onPressIn, onPressOut, onFocus } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        secureTextEntry={hidePassword}
        onChangeText={(text) => onChange(text)}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        style={{
          flex: 1,
        }}
      />
      <TouchableWithoutFeedback
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <FontAwesome5 name="eye" size={15} color="#888" />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ModalPasswordInput;