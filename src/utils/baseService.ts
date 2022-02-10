import {xeno} from './globalXeno';
import {Xeno} from './xeno';
import {IEvents} from '../types';
import {Subscription} from 'rxjs';
export class IService {
  private xeno: Xeno<IEvents>;
  private _unlistens: Function[] = [];
  private _subscriptions: Subscription[] = [];
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
    const res: {subscribe: typeof obs.subscribe; pipe: typeof obs.pipe} = {
      subscribe: observer => {
        const subscription = obs.subscribe(observer as any);
        this._subscriptions.push(subscription);
        return subscription;
      },
      pipe: obs.pipe,
    };
    return res;
  };
  cleanListeners = () => {
    this._unlistens.forEach(unlisten => unlisten());
    this._subscriptions.forEach(sub => !sub.closed && sub.unsubscribe());
  };
  static new(args: any) {}
}
