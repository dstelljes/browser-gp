#include <fstream>
#include <iostream>
#include <string>

#include "tinygp.h"

using namespace std;

int main(int argc, const char **argv) {
  string filename = "problem.dat";
  long seed = -1;

  if (argc == 3) {
    filename = string(argv[2]);
    seed = stol(argv[1]);
  }

  if (argc == 2) {
    filename = string(argv[1]);
  }

  ifstream file(filename);

  if (!file.is_open()) {
    cerr << "error: couldn't open data file\n";
    return 2;
  }

  int case_count;
  parameters parameters = {};

  if (!(file
    >> parameters.variable_count
    >> parameters.constant_count
    >> parameters.constant_minimum
    >> parameters.constant_maximum
    >> case_count
  )) {
    cerr << "error: couldn't parse header\n";
    return 2;
  }

  vector<test_case> cases(case_count);

  for (int i = 0; i < case_count; i++) {
    test_case c(parameters.variable_count + 1);

    for (int j = 0; j < c.size(); j++) {
      if (!(file >> c[j])) {
        cerr << "error: couldn't parse test cases\n";
        return 2;
      }
    }

    cases[i] = c;
  }

  parameters.crossover_probability = 0.9;
  parameters.depth_limit = 5;
  parameters.generation_limit = 100;
  parameters.length_limit = 10000;
  parameters.mutation_probability = 0.05;
  parameters.population_size = 100000;
  parameters.tournament_size = 2;

  TinyGP gp(cases, parameters, seed);

  do {
    cout << "Generation " << gp.get_generation() << "\n";
    cout << "  average fitness:  " << gp.get_average_fitness() << "\n";
    cout << "  best fitness:     " << gp.get_best_fitness() << "\n";
    cout << "  average size:     " << gp.get_average_length() << "\n\n";
  } while (gp.evolve());

  if (gp.get_best_fitness() < TinyGP::SUCCESS_THRESHOLD) {
    cout << "Problem solved!\n";
    return 0;
  }
  else {
    cout << "Problem not solved!\n";
    return 1;
  }
}
