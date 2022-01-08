import {observer} from 'mobx-react';
import React from 'react';
import {IReactComponent} from '@/types';

export const connect = (stores?: any) => (Comp: IReactComponent<any>) => {
  function Composed(props?: any) {
    const ObsComp = observer(Comp);
    return <ObsComp {...props} {...stores} />;
  }
  return Composed;
};
