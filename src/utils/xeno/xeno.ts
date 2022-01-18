import {ReplaySubject, of, from} from 'rxjs';
import {mergeMap, switchMap, take} from 'rxjs/operators';
import {TFutureTask} from './type';
import {map2Array, toObservable} from './util';

class Handlers {
  _key: number = 0;
  _count: number = 0;
  _handlers: Map<number, Function> = new Map();
  addHandler = (handler: Function) => {
    const key = this._getKey();
    this._handlers.set(key, handler);
    const removeListener = () => {
      if (!this._handlers.has(key)) return;
      this._handlers.delete(key);
      this._count--;
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
 * @class Xeno2
 * implementation 1: use global subject
 */
//   class Xeno2 {
//     events: {[key: string]: Handlers} = {};
//     _$center: Subject<TXenoMessage> = new Subject();
//     _futureEvents: Map<string, TFutureTask> = new Map();

//     _cleanFutureEvent = (eventName: string) => {
//       this._futureEvents.delete(eventName);
//     };
//     _addFutureEvent = (eventName: string, uniqKey?: string, params?: any) => {
//       if (this._futureEvents.has(eventName)) {
//         // already existed a future event, will replace the old one
//         this._cleanFutureEvent(eventName);
//       }
//       this._futureEvents.set(eventName, {
//         params,
//         uniqKey,
//       });
//     };
//     _executeFutureEvent = (eventName: string, handler: Function) => {
//       //only first listener will receive event
//       const task = this._futureEvents.get(eventName)!;
//       of(handler(task.params))
//         .pipe(switchMap(toObservable))
//         .subscribe({
//           next: res =>
//             this._$center.next({
//               eventName,
//               uniqKey: task.uniqKey,
//               payload: res,
//             }),
//           complete: () => this._cleanFutureEvent(eventName),
//         });
//     };

//     _checkIfHasFutureEvent = (eventName: string, handler: Function) => {
//       if (this._futureEvents.has(eventName)) {
//         this._executeFutureEvent(eventName, handler);
//       }
//     };

//     on = (eventName: string, handler: Function) => {
//       if (!this.events[eventName]) {
//         this.events[eventName] = new Handlers();
//       }
//       this._checkIfHasFutureEvent(eventName, handler);
//       return this.events[eventName].addHandler(handler);
//     };

//     /**
//      *
//      *
//      * @memberof Xeno2
//      * implementation 1: use global subject
//      */
//     trigger = (uniqKey: string) => (eventName: string, params?: any) => {
//       const handlerIns = this.events[eventName];
//       if (!handlerIns || handlerIns.numOfListeners === 0) {
//         // no handlers
//         this._addFutureEvent(eventName, uniqKey, params);
//         return this.listen(eventName, uniqKey);
//       }
//       // exist handlers
//       from(
//         // listeners are notified in this step
//         handlerIns.getHandlers().map(_handler => _handler(params)),
//       )
//         .pipe(
//           // if senders want to know results, this line will be executed
//           mergeMap(toObservable),
//         )
//         .subscribe(res => this._$center.next({eventName, uniqKey, payload: res}));
//     };

//     /**
//      *
//      *
//      * @memberof Xeno2
//      * listen to results of triggered event
//      */
//     listen = (eventName: string, uniqKey?: string) => {
//       return this._$center.pipe(
//         filter(msg => {
//           return msg.eventName === eventName;
//         }),
//         filter(msg => {
//           if (uniqKey) return msg.uniqKey === uniqKey;
//           return true;
//         }),
//       );
//     };
//   }

/**
 *
 *
 * @class Xeno3
 * implementation 2: each time create a new subject
 */
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
    handler: Function,
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
    handler: Function,
  ) => {
    if (this._futureEvents.has(eventName as string)) {
      this._executeFutureEvent(eventName, handler);
    }
  };

  on = <K extends keyof T>(eventName: K, handler: Function) => {
    if (!this.events.get(eventName as string)) {
      this.events.set(eventName as string, new Handlers());
    }
    this._checkIfHasFutureEvent(eventName, handler);
    return this.events.get(eventName as string)!.addHandler(handler);
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
    return sub.pipe(take(handlerIns.numOfListeners));
  };
}
