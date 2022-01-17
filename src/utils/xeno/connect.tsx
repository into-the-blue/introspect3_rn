import React, {useEffect, useRef} from 'react';
import {Xeno} from './xeno';
import {IReactComponent} from './type';
export const connectXeno = (xeno: Xeno) => (Comp: IReactComponent<any>) => {
  const EnhancedComp = (props: any) => {
    const unlistens = useRef<Function[]>([]);
    const on = (eventName: string, handler: Function) => {
      const unlisten = xeno.on(eventName, handler);
      unlistens.current.push(unlisten);
      return unlisten;
    };
    useEffect(() => {
      const cleanListeners = () => {
        unlistens.current.forEach(func => func());
      };
      return () => {
        cleanListeners();
      };
    }, []);

    return <Comp {...props} on={on} trigger={xeno.trigger} />;
  };
  EnhancedComp.displayName = 'Xeno-connected-' + Comp.displayName;
  return EnhancedComp;
};
