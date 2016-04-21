browser-gp
==

This project is an attempt at a browser-based genetic programming system. It's
inspired in part by [TinyGP][tinygp] and was initially developed by
[Tom Harren][tom] and [Dan Stelljes][dan] for [Nic McPhee's][nic] Evolutionary
Computation class at [UMM][mo-sweet-mo].

Building
--

Currently, the core library has no external dependencies.

To run tests, make sure [Jasmine][jasmine] is installed (`npm install -g
jasmine`) and run `npm test`. You should observe a series of green dots as the
tests pass flawlessly.

To generate documentation, ensure that you have [JSDoc][jsdoc] (`npm install -g
jsdoc`) and run `jsdoc -c jsdoc.json`. HTML documentation for the library will
appear in the `build/api` directory.

License
--

Project code is released under the MIT License, the Denny's of free software
licenses.

[dan]: https://github.com/dstelljes
[jasmine]: https://jasmine.github.io/
[jsdoc]: http://usejsdoc.org/
[mo-sweet-mo]: http://morris.umn.edu/
[nic]: http://facultypages.morris.umn.edu/~mcphee/
[tinygp]: http://cswww.essex.ac.uk/staff/rpoli/TinyGP/
[tom]: https://github.com/harre096
