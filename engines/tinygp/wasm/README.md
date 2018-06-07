# TinyGP

This is a C++ implementation of [Riccardo Poli’s TinyGP][tinygp]. It’s compatible with the original Java implementation, meaning that both will evolve the same result given the same input file and seed.

The Java implementation (and Poli’s C implementation, which preceded it) aimed to minimize the size of the executable. The C++ implementation was written to favor readability over efficiency, which motivated a few choices:

-   use of vectors instead of primitive arrays
-   conventional object-oriented structure
-   exclusion of formatting and output-related functions

(Because of that last point, the C++ implementation may pick a different best program than the Java implementation if there’s a tie. That won’t affect the results.)

The shapes of the C++ functions are generally similar to those of their Java counterparts, mostly so that calls to the random number generator are ordered correctly. Some notable departures include the crossover function, condensed with the help of the vector erase/insert methods, and the evaluation and traversal algorithms, adjusted for simplicity.

## Building and running

The command line interface (**cli.cpp**) mimics the Java executable:

```
$ gcc -O3 -o cli random.cpp tinygp.cpp cli.cpp
$ ./cli 23 sin-data.txt
Generation 0
  average fitness:  3454.67
  best fitness:     24.0222
  average size:     10.9834
...
```

And, [with **emcc**](emsdk), you can create Wasm bindings…

```bash
$ emcc --bind -O3 -o tinygp.js random.cpp tinygp.cpp binding.cpp
```

… and use the result in the browser:

```html
<script type="text/javascript" src="tinygp.js"></script>
<script type="text/javascript">
  const cases = [
    [0, 0],
    [0.1, 0.0998334166468282],
    [0.2, 0.198669330795061]
  ].reduce((cv, c) => {
    cv.push_back(c.reduce((dv, d) => {
      dv.push_back(d);
      return dv;
    }, new Module.TestCase()));
    return cv;
  }, new Module.TestCaseVector());

  const parameters = {
    constantCount: 4,
    constantMaximum: 5,
    constantMinimum: -5,
    crossoverProbability: 0.9,
    depthLimit: 5,
    generationLimit: 100,
    lengthLimit: 10000,
    mutationProbability: 0.05,
    populationSize: 100000,
    tournamentSize: 2,
    variableCount: 1
  };

  const gp = Module.TinyGP(cases, parameters, 23);
</script>
```

## Performance

The C++ implementation (compiled with `-O3`) is slower than the Java implementation, but uses significantly less memory. On an Intel i7-6700K (4 GHz):

| Implementation | Data       | Seed | Generations | Elapsed time (s) | Max. memory (MB) |
| :------------- | :--------- | :--- | ----------: | ---------------: | ---------------: |
| C++            | *sin*(*x*) | 42   | 10          |  5.53            |  12.23           |
| Java           | *sin*(*x*) | 42   | 10          |  3.58            |  92.46           |
| C++            | *sin*(*x*) | 42   | 25          | 39.36            |  35.64           |
| Java           | *sin*(*x*) | 42   | 25          | 34.23            | 268.81           |

[emsdk]: https://github.com/juj/emsdk#installation-instructions
[tinygp]: http://cswww.essex.ac.uk/staff/rpoli/TinyGP/
