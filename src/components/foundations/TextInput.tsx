import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import {flattenStyles} from '@/utils';
import {useTailwind} from 'tailwind-rn/dist';

const DEFAULT_PROPS: TextInputProps = {
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
};

interface IProps extends TextInputProps {}

export const TextInput = ({style, onFocus, onBlur, ...restProps}: IProps) => {
  const _textInputRef = useRef<RNTextInput>(null);
  const [focused, setFocus] = useState<Boolean>(false);
  const tw = useTailwind();
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
      style={[tw('bg-white h-8 px-2 py-1.5 m-0 rounded'), flattenStyles(style)]}
      onFocus={_onFocus}
      onBlur={_onBlur}
      ref={_textInputRef}
      {...DEFAULT_PROPS}
      {...restProps}
    />
  );
};
