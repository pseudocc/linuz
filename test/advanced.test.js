'use strict';

import vanix from '../';

describe('ctor', () => {
  const TEXT = 'jest';
  const ID = 'dope';
  const CLASSES = 'stay cool';
  const TEXTS = Array.from({ length: 3 }).map((v, i) => TEXT + i);

  function span_ctor(text = TEXT) {
    /** @type {Vanix.Arch} */
    const span_arch = {
      tag: 'span',
      props: [{ name: 'innerText', value: text }]
    };
    const [elem, voix] = vanix(span_arch);
    const vrap = {};
    Object.defineProperty(vrap, 'text', {
      get: () => voix.native.innerText
    });
    return [elem, vrap];
  }

  /** @type {Vanix.Arch<Vanix.Ctor>[]} */
  const children = [
    {
      name: 'single',
      ctor: span_ctor,
      props: [
        { name: 'className', value: CLASSES },
        { name: 'id', value: ID }
      ]
    },
    {
      name: 'g0',
      ctor: span_ctor,
      ctor_args: TEXTS.map(v => [v]),
      count: TEXTS.length
    },
    {
      name: 'g1',
      ctor: span_ctor,
      ctor_args: i => [TEXTS[i]],
      count: TEXTS.length
    }
  ];

  /** @type {Vanix.Arch} */
  const container_arch = {
    tag: 'div',
    children
  };

  const [elem, voix] = vanix(container_arch);
  test('root', () => {
    expect(elem.children.length).toBe(1 + (TEXTS.length << 1));
  });

  describe('single', () => {
    const single = elem.children[0];
    test('vrap', () => {
      expect(voix.single.text).toBe(TEXT);
    });
    test('additional props', () => {
      expect(single.className).toBe(CLASSES);
      expect(single.id).toBe(ID);
    });
  });

  test('args: array', () => {
    const bias = 1;
    for (let i = 0; i < TEXTS.length; i++) {
      const text = TEXTS[i];
      const child = elem.children[bias + i];
      expect(child.innerText).toBe(text);
      expect(voix.g0[i].text).toBe(text);
    }
  });

  test('args: function', () => {
    const bias = 1 + TEXTS.length;
    for (let i = 0; i < TEXTS.length; i++) {
      const text = TEXTS[i];
      const child = elem.children[bias + i];
      expect(child.innerText).toBe(text);
      expect(voix.g1[i].text).toBe(text);
    }
  });
});

test('hijack', () => {
  const ID = 'CHILL';
  function internal_id(id) {
    this['@id'] = id;
  }

  /** @type {Vanix.Arch} */
  const span_arch = {
    tag: 'span',
    props: [{ name: 'innerText', value: 'jest' }],
    hijack: internal_id,
    hijack_args: [ID]
  };

  const [elem, voix] = vanix(span_arch);

  expect(elem).toBe(voix.native);
  expect(voix['@id']).toBe(ID);
});