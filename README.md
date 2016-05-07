browser-gp
==

This project is an attempt at a browser-based genetic programming system. It's
inspired in part by [TinyGP][tinygp] and was initially developed by
[Tom Harren][tom] and [Dan Stelljes][dan] for [Nic McPhee][nic]'s Evolutionary
Computation class at [UMM][mo-sweet-mo].

Building
--
If you want to...

*   Build the web frontend:
  1. `npm install` to install tooling. We recommend using [nvm][nvm] to install
  a 5.*  version of npm.
  2. `bower install` to install frontend dependencies.
  Requires global install of [Bower][bower] (`npm install -g bower`).
  3. `brunch watch --server` to serve the app locally.
  Requires global install of [Brunch][brunch] (`npm install -g brunch`).


*   Run tests: `npm test`. Requires global install of [Jasmine][jasmine].

*   Generate documentation: `jsdoc -c jsdoc.json`.
    Requires global install of [JSDoc][jsdoc].

Build artifacts (documentation and frontend files) are dumped into the `build`
directory.

License
--

Project code is released under the MIT License, the Denny's of free software
licenses.

[brunch]: http://brunch.io/
[bower]: http://bower.io/
[dan]: https://github.com/dstelljes
[jasmine]: https://jasmine.github.io/
[jsdoc]: http://usejsdoc.org/
[mo-sweet-mo]: http://morris.umn.edu/
[nic]: http://facultypages.morris.umn.edu/~mcphee/
[nvm]: https://github.com/creationix/nvm/blob/master/README.markdown
[tinygp]: http://cswww.essex.ac.uk/staff/rpoli/TinyGP/
[tom]: https://github.com/harre096
