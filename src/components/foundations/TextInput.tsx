import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import {COLORS, flattenStyles} from '@/utils';

const DEFAULT_PROPS: TextInputProps = {
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
};

interface IProps extends TextInputProps {}

export const TextInput = ({style, onFocus, onBlur, ...restProps}: IProps) => {
  const _textInputRef = useRef<RNTextInput>(null);
  const [focused, setFocus] = useState<Boolean>(false);
  const clearInput = () => {
    _textInputRef.current?.clear();
  };
  const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(true);
    onFocus && onFocus(e);
  };
  const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(false);
    onBlur && onBlur(e);
  };
  return (
    <RNTextInput
      style={[styles.textInput, flattenStyles(style)]}
      onFocus={_onFocus}
      onBlur={_onBlur}
      ref={_textInputRef}
      {...DEFAULT_PROPS}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.white,
    // borderBottomWidth: 1,
    height: 30,
    padding: 0,
    margin: 0,
  },
});
