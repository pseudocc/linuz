'use strict';

/**
 * internal Voix assign method
 * @param {Vanix.Voix} vp 
 * @param {string?} name 
 * @param {Vanix.Voix} vc 
 */
function voix_assign(vp, name, vc) {
  if (name) {
    vp[name] = vc;
  } else {
    Object.assign(vp, vc);
  }
}

/**
 * internal FnArgs get method
 * @param {Vanix.Arch & Vanix.Arch<Vanix.Ctor>} arch 
 * @param {'ctor_args' | 'hijack_args'} key 
 * @param {number} i
 * @returns {any[]}
 */
function fn_args_get(arch, key, i) {
  const args_get = typeof arch[key] === 'function'
    ? arch[key]
    : i => i == null ? arch[key] : arch[key][i];
  return args_get(i);
}

/**
 * main entry of this package.
 * @param {Vanix.Arch & Vanix.Arch<Vanix.Ctor>} arch architecture of the tree.
 * @param {number?} i index which would take effect when
 *  both arch.ctor and arch.ctor_args are functions.
 * @returns {Vanix.Return}
 */
export default function vanix(arch, i) {
  if (arch == null)
    throw new Error('arch should not be null!');

  /** @type {HTMLElement} */
  let he;
  /** @type {Vanix.Voix} */
  let vn;
  /** @type {Vanix.Voix} */
  const vt = {};

  if (arch.ctor) {
    if (typeof arch.ctor !== 'function')
      throw new Error('ctor should be a function!');
    const args = fn_args_get(arch, 'ctor_args', i);
    [he, vn] = arch.ctor.apply(arch, args);
  } else {
    if (typeof arch.tag !== 'string' || !arch.tag)
      throw new Error('tag should be a non-empty string!');
    he = document.createElement(arch.tag);
    vn = { native: he };
  }

  for (const p of arch.props || []) {
    he[p.name] = p.value;
  }

  for (const c of arch.children || []) {
    if (c.count) {
      if (!c.name)
        throw new Error("name should not be null when count > 0!");
      const cl = [];
      for (let i = 0; i < c.count; i++) {
        const [hce, vc] = vanix(c, i);
        cl.push(vc[c.name]);
        he.appendChild(hce);
      }
      voix_assign(vn, c.name, cl);
    } else {
      const [hce, vc] = vanix(c);
      he.appendChild(hce);
      // anonymous child won't overwrite parent's native property
      delete vc.native;
      voix_assign(vn, null, vc);
    }
  }

  if (arch.hijack) {
    const args = fn_args_get(arch, 'hijack_args', i);
    arch.hijack.apply(vn, args);
  }

  voix_assign(vt, arch.name, vn);
  return [he, vt];
}

/**
 * @template {HTMLElement} T
 * @param {T} parent 
 * @param {Vanix.Arch} arch 
 */
export function vanix_frag(parent, arch) {
  /** @type {Vanix.Return} */
  const frag_return = [parent, { native: parent }];
  /** @type {Vanix.Arch<Vanix.Ctor>} */
  const frag_arch = {
    ctor: () => frag_return,
    children: [arch]
  };

  return vanix(frag_arch);
}