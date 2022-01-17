import {toArray} from 'rxjs';
import {Xeno} from '../xeno';

let xeno = new Xeno();
const listener1 = (data: number) => {
  return 'listener1 ' + data;
};
const listener2 = (data: number) => {
  return 'listener2 ' + data;
};
beforeEach(() => {
  xeno = new Xeno();
});
test('should has two listeners', done => {
  xeno.on('event1', listener1);
  xeno.on('event1', listener2);
  const handler = xeno.events.get('event1');
  expect(handler?.numOfListeners).toBe(2);
  done();
});

test('should receive single result', done => {
  xeno.on('event1', listener1);
  xeno.trigger('event1', 1).subscribe({
    next: res => {
      expect(res).toBe('listener1 1');
      done();
    },
  });
});

test('listener should be removed', done => {
  const remove = xeno.on('event1', listener1);
  xeno.on('event1', listener2);
  remove();
  expect(xeno.events.get('event1')?.numOfListeners).toBe(1);
  xeno.trigger('event1', 1).subscribe(res => {
    expect(res).toBe('listener2 1');
    done();
  });
});

test('should receive multi results', done => {
  xeno.on('event1', listener1);
  xeno.on('event1', listener2);
  const complete = jest.fn();
  const sub = xeno
    .trigger('event1', 1)
    .pipe(toArray())
    .subscribe({
      next: res => {
        expect(res).toEqual(['listener1 1', 'listener2 1']);
      },
      complete: () => {
        complete();
        expect(complete).toBeCalled();
        done();
      },
    });
});

test('should receive result of first listener', done => {
  xeno.trigger('event1', 1).subscribe(res => {
    expect(res).toBe('listener2 1');
  });
  setTimeout(() => {
    xeno.on('event1', listener2);
    xeno.on('event1', listener1);
    expect(xeno._futureEvents.get('event1')).toBeUndefined();
    xeno
      .trigger('event1', 1)
      .pipe(toArray())
      .subscribe(res => {
        expect(res).toEqual(['listener2 1', 'listener1 1']);
        done();
      });
  }, 100);
});
