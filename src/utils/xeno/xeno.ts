import {ReplaySubject, of, from} from 'rxjs';
import {mergeMap, switchMap, take} from 'rxjs/operators';
import {TFutureTask} from './type';
import {map2Array, toObservable, isDev} from './util';

const log = (
  target: 'LISTENER' | 'SENDER',
  eventName: string | any,
  ...args: any[]
) => {
  if (isDev) {
    console.log('[XENO]', `[${target}]`, eventName, ...args);
  }
};
class Handlers {
  _key: number = 0;
  _count: number = 0;
  _handlers: Map<number, Function> = new Map();
  _name: string;
  constructor(name: string) {
    this._name = name;
  }
  addHandler = (handler: Function) => {
    const key = this._getKey();
    this._handlers.set(key, handler);
    const removeListener = () => {
      if (!this._handlers.has(key)) return;
      this._handlers.delete(key);
      this._count--;
      log('LISTENER', this._name, 'UNLISTEN', 'REAMINING', this._count);
    };
    return removeListener;
  };
  getHandlers = () => {
    return map2Array(this._handlers, v => v[1]);
  };
  get numOfListeners() {
    return this._count;
  }
  _getKey = () => {
    this._count++;
    return ++this._key;
  };
}

/**
 *
 *
 * @class Xeno3
 * implementation 2: each time create a new subject
 */

type HandlerFunction<T, K extends keyof T> = (params: T[K]) => void;
export class Xeno<T> {
  events: Map<string, Handlers> = new Map();
  _futureEvents: Map<string, TFutureTask> = new Map();

  _cleanFutureEvent = <K extends keyof T>(eventName: K) => {
    // const task = this._futureEvents.get(eventName);
    // if (!task?.subject.closed) task?.subject.unsubscribe();
    this._futureEvents.delete(eventName as string);
  };
  _addFutureEvent = <K extends keyof T>(
    subject: ReplaySubject<any>,
    eventName: K,
    params?: T[K],
  ) => {
    if (this._futureEvents.has(eventName as string)) {
      // already existed a future event, will replace the old one
      this._cleanFutureEvent(eventName);
    }
    this._futureEvents.set(eventName as string, {
      params,
      subject,
    });
  };
  _executeFutureEvent = <K extends keyof T>(
    eventName: K,
    handler: HandlerFunction<T, K>,
  ) => {
    //only first listener will receive event
    const task = this._futureEvents.get(eventName as string)!;
    of(handler(task.params))
      .pipe(switchMap(toObservable))
      .subscribe({
        next: res => {
          if (!task.subject.closed) task.subject.next(res);
        },
        complete: () => this._cleanFutureEvent(eventName),
      });
  };

  _checkIfHasFutureEvent = <K extends keyof T>(
    eventName: K,
    handler: HandlerFunction<T, K>,
  ) => {
    if (this._futureEvents.has(eventName as string)) {
      log('LISTENER', eventName, 'FUTURE TASK TRIGGERED');
      this._executeFutureEvent(eventName, handler);
    }
  };

  on = <K extends keyof T>(eventName: K, handler: HandlerFunction<T, K>) => {
    if (!this.events.get(eventName as string)) {
      this.events.set(eventName as string, new Handlers(eventName as string));
    }
    this._checkIfHasFutureEvent(eventName, handler);
    const unlisten = this.events.get(eventName as string)!.addHandler(handler);
    log(
      'LISTENER',
      eventName,
      'TOTAL',
      this.events.get(eventName as string)!.numOfListeners,
    );

    return unlisten;
  };

  /**
   *
   *
   * @memberof Xeno3
   * implementation 2: each time create a new subject
   */
  trigger = <K extends keyof T>(eventName: K, params?: T[K]) => {
    const handlerIns = this.events.get(eventName as string);
    const sub = new ReplaySubject<any>();
    if (!handlerIns || handlerIns.numOfListeners === 0) {
      log('SENDER', eventName, 'FUTURE TASK');
      // no handlers
      this._addFutureEvent(sub, eventName, params);
      return sub.pipe(take(1));
    }
    // exist handlers
    from(
      // listeners are notified in this step
      handlerIns.getHandlers().map(_handler => _handler(params)),
    )
      .pipe(
        // if senders want to know results, this line will be executed
        mergeMap(toObservable),
      )
      .subscribe({
        next: res => {
          if (!sub.closed) {
            sub.next(res);
          }
        },
      });
    log('SENDER', eventName, 'LISTENERS TRIGGERED', handlerIns.numOfListeners);
    return sub.pipe(take(handlerIns.numOfListeners));
  };
}
