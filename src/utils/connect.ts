import {observer} from 'mobx-react';
import React from 'react';

export const connect = (Comp: React.FC) => {
  return observer(Comp);
};
