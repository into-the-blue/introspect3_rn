import React from 'react';
import {TextInput} from './foundations/TextInput';
import {WithTitle} from './WithTitle';

interface IProps {
  title: string;
  inputValue: string;
  onChangeText: (text: string) => void;
}
export const TextInputWithTitle = ({
  title,
  inputValue,
  onChangeText,
}: IProps) => {
  return (
    <WithTitle title={title}>
      <TextInput value={inputValue} onChangeText={onChangeText} />
    </WithTitle>
  );
};
