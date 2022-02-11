import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
export const connect =
  (
    generator: (props: any) => {
      controller: any; // TODO: accept drived class of some base class
      store: any;
    } & {[key: string]: any},
  ) =>
  (Comp: React.FC<any>) => {
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
