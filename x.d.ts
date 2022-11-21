/// <reference types="node" />

type TagNames = keyof HTMLElementTagNameMap;

interface Main<T extends ArchGeneric = TagNames> {
  (arch: Vanix.Arch<T>): Vanix.Return;
  (arch: Vanix.Arch<T>, index: number): Vanix.Return;
}

interface Frag<T extends ArchGeneric = TagNames> {
  (parent: HTMLElement, arch: Vanix.Arch<T>): Vanix.Return;
}

declare global {
  declare namespace Vanix {
    type Return = [HTMLElement, Voix];

    type Fn<T1, T2> = (this: T1, ...args: any[]) => T2;
    type FnArgs = ((index: number) => any[]) | any[][] | any[];

    type Voix = {
      native: HTMLElement?;
      [name: string]: Voix | Voix[];
    };

    type Ctor = Fn<Arch, Return>;
    type Hijack = Fn<Voix, void>;

    type Prop<T extends HTMLElement = HTMLElement> = {
      name: keyof T;
      value: any;
    };

    type ArchGeneric = TagNames | Ctor;
    type Arch<T extends ArchGeneric = TagNames> =
      ArchRequired<T> & Partial<ArchOptional>;

    type TagArch<T = TagNames> = {
      tag: T;
    };
    type CtorArch = {
      ctor: Ctor;
      ctor_args: FnArgs;
    };

    type ArchRequired<T extends ArchGeneric> =
      T extends TagNames ? TagArch : CtorArch;

    type ArchOptional = {
      name: string;
      count: number;
      hijack: Hijack;
      hijack_args: FnArgs;
      props: Prop[];
      children: Arch[];
    };
  }
}

export {};

declare var vanix: Main;

export default vanix;
export var vanix_frag: Frag;