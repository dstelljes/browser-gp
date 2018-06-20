# browser-gp

This is an experimental web app that aims to make it easier to mess around with genetic programming.

[Tom Harren][tom] and [Dan Stelljes][dan] initially developed a [JavaScript genetic programming library with an AngularJS frontend][v0] as a final project for [Nic McPhee][nic]’s Evolutionary Computation class at [UMM][umm]. Now the whole thing is being recreated as a broader way to learn about different approaches to evolutionary computation.

## Solution types

*   [TinyGP][tinygp-engine]: A C++ implementation of Riccardo Poli’s tree-based [TinyGP][tinygp-site].

## Building and running

Because the project relies on C++ compiled to WebAssembly, you’ll need [Emscripten installed and **emcc** in your PATH][emsdk]. Aside from that, it’s the regular web app stuff.

To clone and install dependencies:

```bash
$ git clone git@github.com:dstelljes/browser-gp.git
$ cd browser-gp/frontend
$ npm install
```

To serve locally:

```bash
$ npm run serve
```

To build for release:

```bash
$ npm run build
```

[dan]: https://github.com/dstelljes
[emsdk]: https://github.com/juj/emsdk#installation-instructions
[nic]: https://github.com/NicMcPhee
[tinygp-engine]: engines/tinygp/wasm/README.md
[tinygp-site]: http://cswww.essex.ac.uk/staff/rpoli/TinyGP/
[tom]: https://github.com/harre096
[umm]: https://www4.morris.umn.edu/
[v0]: https://github.com/dstelljes/browser-gp/tree/v0
