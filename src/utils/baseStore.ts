export class IStore {
  name?: string;
  private static reservedStoreKey = 'reserved';
  private static _stores: Map<string, any> = new Map();
  static instance<K extends keyof IStore>(initialParams?: Pick<IStore, K>) {
    return new this({...initialParams});
  }
  static get getReservedStore() {
    return this.getNamedStore(this.reservedStoreKey);
  }
  static getNamedStore(name: string) {
    if (!this._stores.has(name)) {
      const ins = new this();
      ins.name = name;
      this._stores.set(name, ins);
      return ins;
    }
    return this._stores.get(name);
  }
  static removeNamedStore(name: string) {
    if (this._stores.has(name)) this._stores.delete(name);
  }
  constructor(initialParams?: any) {
    if (typeof initialParams !== 'undefined') {
      Object.assign(this, initialParams);
    }
  }
  reset() {}
}
