import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import {flattenStyles} from '@/utils';

const DEFAULT_PROPS: TextInputProps = {
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
};

interface IProps extends TextInputProps {}

export const TextInput = ({style, ...restProps}: IProps) => {
  const _textInputRef = useRef<RNTextInput>(null);
  const clearInput = () => {
    _textInputRef.current?.clear();
  };
  return (
    <RNTextInput
      style={[styles.textInput, flattenStyles(style)]}
      ref={_textInputRef}
      {...DEFAULT_PROPS}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    height: 30,
    padding: 0,
    margin: 0,
  },
});
