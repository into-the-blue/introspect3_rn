import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {IReactComponent} from '@/types';
export const connect =
  (
    generator: (props: any) => {
      controller: any; // TODO: accept drived class of some base class
      store: any;
    } & {[key: string]: any},
  ) =>
  (Comp: IReactComponent<any>) => {
    function Composed(props: any) {
      const ObsComp = observer(Comp);
      useEffect(() => {
        return () => {};
      }, []);
      return <ObsComp {...props} {...generator(props)} />;
    }
    Composed.displayName = 'Connected - ' + Comp.displayName;
    return Composed;
  };
