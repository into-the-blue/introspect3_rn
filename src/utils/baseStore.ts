import {createContext} from 'react';
export class IStore {
  static _reserved?: IStore;
  static instance<K extends keyof IStore>(initialParams?: Pick<IStore, K>) {
    return new this({...initialParams});
    // return new IStore();
  }
  static get getReservedStore() {
    if (!this._reserved) {
      this._reserved = new this();
    }
    return this._reserved!;
  }
  constructor(initialParams?: any) {
    if (typeof initialParams !== 'undefined') {
      Object.assign(this, initialParams);
    }
  }
  useContextStore() {
    const context = createContext(IStore.getReservedStore);
    return context;
    // return useContext(context);
  }
}
