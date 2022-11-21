# vanix

Vanix is a light weight JavaScript frontend framework with zero dependency
I use myself, which use a structured object to construct the element tree.

```bash
npm install pseudocc/vanix
```

## Purpose

- Basic

    Write very few HTML but reusable `Vanix.Arch` object will bring you to the
    next level of dry code rule.

    Define properties with `get` and `set` which interact directly with HTMLElent's
    properties, then make it a `Vanix.Ctor`.

- Advanced

    Server holds configuration files (like JSON, YAML) which can fully describe
    how the website would perform and act.

    Client holds a lot of transformers the convert the JSON to `Vanix.Arch`, then
    use `vanix(arch)` to create the `HTMLElement`, and add them into the document.

## Examples

See `*.test.js` under `test/` directory.

## Test

100% code coverage.