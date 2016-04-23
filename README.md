browser-gp
==

This project is an attempt at a browser-based genetic programming system. It's
inspired in part by [TinyGP][tinygp] and was initially developed by
[Tom Harren][tom] and [Dan Stelljes][dan] for [Nic McPhee][nic]'s Evolutionary
Computation class at [UMM][mo-sweet-mo].

Building
--

Currently, the core library has no external dependencies.

If you want to...

*   build the web frontend: `npm install` to install tooling, `bower install`
    to install frontend dependencies, and `brunch watch --server` to serve the
    app locally. Requires [Brunch][brunch].

*   run tests: `npm test`. Requires [Jasmine][jasmine].

*   generate documentation: `jsdoc -c jsdoc.json`. Requires [JSDoc][jsdoc].

Build artifacts (documentaion and frontend files) are dumped into the `build`
directory.

License
--

Project code is released under the MIT License, the Denny's of free software
licenses.

[brunch]: http://brunch.io/
[dan]: https://github.com/dstelljes
[jasmine]: https://jasmine.github.io/
[jsdoc]: http://usejsdoc.org/
[mo-sweet-mo]: http://morris.umn.edu/
[nic]: http://facultypages.morris.umn.edu/~mcphee/
[tinygp]: http://cswww.essex.ac.uk/staff/rpoli/TinyGP/
[tom]: https://github.com/harre096
