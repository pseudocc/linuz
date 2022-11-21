'use strict';

import vanix from '../x';

test('null', () => {
  expect(() => vanix(null)).toThrow(/arch/);
});

test('count without name', () => {
  /** @type {Vanix.Arch} */
  const anonymous_repeat = {
    tag: 'div',
    children: [{
      count: 2,
      tag: 'p'
    }]
  };
  expect(() => vanix(anonymous_repeat)).toThrow(/name/);
});

describe('required', () => {
  test('ctor is not a function', () => {
    expect(() => vanix({ ctor: 1 })).toThrow(/ctor/);
  });
  test('tag is invalid', () => {
    expect(() => vanix({})).toThrow(/tag/);
    expect(() => vanix({ tag: 1 })).toThrow(/tag/);
  });
});