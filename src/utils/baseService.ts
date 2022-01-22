import {xeno} from './globalXeno';
import {Xeno} from './xeno';
import {IEvents} from '../types';
import {Observer, Subscription} from 'rxjs';
export class IService {
  xeno: Xeno<IEvents>;
  _unlistens: Function[] = [];
  _subscriptions: Subscription[] = [];
  constructor() {
    this.xeno = xeno;
  }
  on = <K extends keyof IEvents>(eventName: K, handler: Function) => {
    const unlisten = this.xeno.on(eventName, handler);
    this._unlistens.push(unlisten);
    return unlisten;
  };
  trigger = <K extends keyof IEvents>(eventName: K, params?: IEvents[K]) => {
    const obs = this.xeno.trigger(eventName, params);
    return {
      subscribe: (observer?: Partial<Observer<any>>) => {
        const subscription = obs.subscribe(observer);
        this._subscriptions.push(subscription);
        return subscription;
      },
      pipe: obs.pipe,
    };
  };
  cleanListeners = () => {
    this._unlistens.forEach(unlisten => unlisten());
    this._subscriptions.forEach(sub => !sub.closed && sub.unsubscribe());
  };
  static new(args: any) {}
}
