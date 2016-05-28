browser-gp
==

This project is an attempt at a browser-based genetic programming system. It's
inspired in part by [TinyGP][tinygp] and was initially developed by
[Tom Harren][tom] and [Dan Stelljes][dan] for [Nic McPhee][nic]'s Evolutionary
Computation class at [UMM][mo-sweet-mo].

Contributing and building
--

After cloning, run `npm install` to install tooling and frontend dependencies.
Node 5.x or better recommended. Also check out [nvm][nvm].

If you want to...

*   Play with the web frontend:

    1.  `npm run watch` to rebuild on changes and `npm run serve` to serve the
        app locally.

    2.  `npm run build:app` to build the frontend for release.

*   Run tests: `npm test`

*   Generate documentation: `npm run build:docs`

Build artifacts (documentation and frontend files) are dumped into the `build`
directory.

License
--

Project code is released under the MIT License, the Denny's of free software
licenses.

[dan]: https://github.com/dstelljes
[mo-sweet-mo]: http://morris.umn.edu/
[nic]: http://facultypages.morris.umn.edu/~mcphee/
[nvm]: https://github.com/creationix/nvm/blob/master/README.markdown
[tinygp]: http://cswww.essex.ac.uk/staff/rpoli/TinyGP/
[tom]: https://github.com/harre096
