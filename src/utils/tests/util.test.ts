import {toCamelCase, toSnakeCase} from '../util';

test('should convert object to camel case', done => {
  const obj = {
    a_a: 1,
    b_b: 2,
    cC: 3,
    dd: 4,
    _ee: 5,
  };
  expect(toCamelCase(obj)).toStrictEqual({
    aA: 1,
    bB: 2,
    cC: 3,
    dd: 4,
    ee: 5,
  });
  done();
});

test('should convert nested object to camel case', done => {
  const obj = {
    a_a: 1,
    b_b: {
      c_c: 2,
    },
  };
  expect(toCamelCase(obj)).toStrictEqual({
    aA: 1,
    bB: {
      cC: 2,
    },
  });
  done();
});

test('should convert nested array item to camel case', done => {
  const obj = {
    a_a: 1,
    b_b: [
      {
        c_c: 2,
      },
      {dd: 3},
      {eE: 4},
    ],
  };
  expect(toCamelCase(obj)).toStrictEqual({
    aA: 1,
    bB: [
      {
        cC: 2,
      },
      {dd: 3},
      {eE: 4},
    ],
  });
  done();
});
