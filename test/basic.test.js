'use strict';

import vanix from '../x';

describe('single element', () => {
  const TEXT = 'jest';
  /** @type {Vanix.Arch} */
  const span_arch = {
    tag: 'span',
    name: 'text',
    props: [
      { name: 'innerText', value: TEXT }
    ]
  };

  const [elem, voix] = vanix(span_arch);
  test('native', () => {
    expect(elem).toBe(voix.text.native);
  });

  test('content', () => {
    expect(elem.innerText).toBe(TEXT);
  });
});

describe('flat container', () => {
  const TEXT0 = 'zero';
  const TEXT1 = 'one';
  /** @type {Vanix.Arch} */
  const container_arch = {
    tag: 'div',
    children: [
      {
        name: 't0',
        tag: 'span',
        props: [
          { name: 'innerText', value: TEXT0 }
        ]
      },
      {
        name: 't1',
        tag: 'span',
        count: 2,
        props: [
          { name: 'innerText', value: TEXT1 }
        ]
      }
    ]
  };

  const [elem, voix] = vanix(container_arch);
  test('root', () => {
    expect(voix.native).toBe(elem);
  });

  describe('children', () => {
    test('count', () => {
      expect(elem.children.length).toBe(3);
    });
    test('elements', () => {
      expect(elem.children[0]).toBe(voix.t0.native);
      expect(elem.children[1]).toBe(voix.t1[0].native);
      expect(elem.children[2]).toBe(voix.t1[1].native);
      expect(elem.children[0].innerText).toBe(TEXT0);
      expect(elem.children[1].innerText).toBe(TEXT1);
    });
  })
});

describe('depth', () => {
  const URL = 'about:blank'
  const TEXT = 'jest';
  /** @type {Vanix.Arch} */
  const depth_arch = {
    tag: 'div',
    name: 'd0',
    children: [
      {
        tag: 'div',
        name: 'd1',
        children: [{
          tag: 'a',
          name: 'link',
          props: [
            { name: 'href', value: URL }
          ]
        }]
      },
      {
        tag: 'div',
        children: [{
          tag: 'p',
          name: 'text',
          props: [
            { name: 'innerText', value: TEXT }
          ]
        }]
      }
    ]
  };

  const [elem, voix] = vanix(depth_arch);
  test('root', () => {
    expect(voix.d0.native).toBe(elem);
  });

  test('named parent', () => {
    expect(voix.d0.d1.link.native.href).toBe(URL);
  });

  test('anonymous parent', () => {
    expect(voix.d0.text.native).toBe(voix.d0.native.children[1].children[0]);
    expect(voix.d0.text.native.innerText).toBe(TEXT);
  });
});