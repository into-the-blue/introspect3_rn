export class IStore {
  private static reservedStoreKey = 'reserved';
  private static _stores: {[key: string]: any} = {};
  static instance<K extends keyof IStore>(initialParams?: Pick<IStore, K>) {
    return new this({...initialParams});
  }
  static get getReservedStore() {
    return this.getNamedStore(this.reservedStoreKey);
  }
  static getNamedStore(name: string) {
    if (!this._stores[name]) {
      this._stores[name] = new this();
    }
    return this._stores[name];
  }
  constructor(initialParams?: any) {
    if (typeof initialParams !== 'undefined') {
      Object.assign(this, initialParams);
    }
  }
  reset() {}
}
