'use strict';

import { vanix_frag } from '../';

describe('frag', () => {
  const root = document.createElement('div');
  /** @type {Vanix.Arch} */
  const frag_arch = {
    tag: 'p',
    name: 'items',
    count: 3
  };

  const [elem, voix] = vanix_frag(root, frag_arch);

  test('root', () => {
    expect(elem).toBe(root);
    expect(elem).toBe(voix.native);
  });

  test('children', () => {
    expect(elem.children.length).toBe(frag_arch.count);
    expect(voix.items.length).toBe(frag_arch.count);
  });
});