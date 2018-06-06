# TinyGP

This is a C++ implementation of [Riccardo Poli’s TinyGP][tinygp]. It’s compatible with the Java original, meaning that both implementations will evolve the same results given the same input file and seed.

Minor differences in the C++ version include:

-   the use of vectors instead of primitive arrays
-   non-recursive functions for determining subtree sizes and evaluating programs
-   the exclusion of formatting and output-related functions

Because of that last point, the C++ implementation may pick a different best program than the Java implementation if there’s a tie. (That won’t affect the results.)

## Building and running

A command-line interface is in the works. To compile to Wasm, run:

```bash
$ emcc --bind random.cpp tinygp.cpp binding.cpp -o tinygp.js
```

Then, use in the browser:

```html
<script type="text/javascript" src="tinygp.js"></script>
<script type="text/javascript">
  const cases = Module.TestCaseVector();
  const parameters = {};
  const seed = 23;

  const gp = Module.TinyGP(cases, parameters, seed);
</script>
```

## Performance

The C++ implementation is a bit slower than the original. It’s primarily written for readability, though, and there’s probably a lot of low-hanging fruit.

[tinygp]: http://cswww.essex.ac.uk/staff/rpoli/TinyGP/
