import {xeno} from './globalXeno';
import {Xeno} from './xeno';
import {IEvents} from '../types';
export class IService {
  xeno: Xeno<IEvents>;
  _unlistens: Function[] = [];
  constructor() {
    this.xeno = xeno;
  }
  on = <K extends keyof IEvents>(eventName: K, handler: Function) => {
    const unlisten = this.xeno.on(eventName, handler);
    this._unlistens.push(unlisten);
    return unlisten;
  };
  trigger = xeno.trigger;
  cleanListeners = () => {
    this._unlistens.forEach(unlisten => unlisten());
  };
  static new(args: any) {}
}
