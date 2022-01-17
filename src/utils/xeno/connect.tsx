import React, {useEffect, useRef} from 'react';
import {Xeno} from './xeno';
import {IReactComponent} from './type';
import {Subject} from 'rxjs';
export const connectXeno = (xeno: Xeno) => (Comp: IReactComponent<any>) => {
  const EnhancedComp = (props: any) => {
    const subjects = useRef<Subject<any>[]>([]);
    const unlistens = useRef<Function[]>([]);
    const trigger = (eventName: string, params?: any) => {
      const subject = xeno.trigger(eventName, params);
      subjects.current.push(subject);
      return subject;
    };
    const on = (eventName: string, handler: Function) => {
      const unlisten = xeno.on(eventName, handler);
      unlistens.current.push(unlisten);
      return unlisten;
    };
    useEffect(() => {
      const cleanListeners = () => {
        unlistens.current.forEach(func => func());
      };
      const cleanSubjects = () => {
        subjects.current.forEach(sub => {
          if (!sub.closed) sub.unsubscribe();
        });
      };
      return () => {
        cleanListeners();
        cleanSubjects();
      };
    }, []);

    return <Comp {...props} on={on} trigger={trigger} />;
  };
  EnhancedComp.displayName = 'Xeno-connected-' + Comp.displayName;
  return EnhancedComp;
};
