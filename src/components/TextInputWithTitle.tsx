import React from 'react';
import {TextInputProps} from 'react-native';
import {TextInput} from './foundations/TextInput';
import {WithTitle} from './WithTitle';

interface IProps {
  title: string;
  inputValue: string;
  onChangeText: (text: string) => void;
  textInputProps?: Omit<TextInputProps, 'value' | 'onChangeText'>;
}
export const TextInputWithTitle = ({
  title,
  inputValue,
  onChangeText,
  textInputProps,
}: IProps) => {
  return (
    <WithTitle title={title}>
      <TextInput
        value={inputValue}
        onChangeText={onChangeText}
        {...textInputProps}
      />
    </WithTitle>
  );
};
