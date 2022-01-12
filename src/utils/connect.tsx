import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {IReactComponent} from '@/types';

export const connect =
  (controllerCls: any, stores?: any) => (Comp: IReactComponent<any>) => {
    function Composed(props?: any) {
      const ObsComp = observer(Comp);
      useEffect(() => {
        return () => {};
      }, []);
      return (
        <ObsComp
          {...props}
          {...stores}
          controller={controllerCls.new(props?.navigation)}
        />
      );
    }
    Composed.displayName = 'Connected - ' + Comp.displayName;
    return Composed;
  };
