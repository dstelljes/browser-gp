#include "tinygp.h"

TinyGP::TinyGP(const std::vector<test_case> &cases, const parameters &parameters, long seed) :
  cases(cases),
  constant_count(parameters.constant_count),
  crossover_probability(parameters.crossover_probability),
  depth_limit(parameters.depth_limit),
  generation_limit(parameters.generation_limit),
  length_limit(parameters.length_limit),
  mutation_probability(parameters.mutation_probability),
  population_size(parameters.population_size),
  tournament_size(parameters.tournament_size),
  variable_count(parameters.variable_count)
{
  random = seed > -1 ? Random(seed) : Random();

  int min = parameters.constant_minimum;
  int max = parameters.constant_maximum;

  for (int i = 0; i < FUNCTION_SET_START; i++) {
    constants.push_back((max - min) * random.next_double() + min);
  }

  for (int i = 0; i < population_size; i++) {
    population.push_back(create_random_individual(depth_limit));
  }
}

double TinyGP::calculate_fitness(const individual &individual) const {
  return 0;
}

bool TinyGP::evolve() {
  return false;
}

double TinyGP::get_average_fitness() const {
  return 0;
}

double TinyGP::get_average_length() const {
  return 0;
}

individual TinyGP::get_best_individual() const {
  return {};
}

int TinyGP::get_generation() const {
  return generation;
}

std::vector<individual> TinyGP::get_population() const {
  return population;
}

individual TinyGP::create_random_individual(int depth_limit) {
  individual result = {};

  while (grow_individual(result, length_limit, depth_limit));

  return result;
}

bool TinyGP::grow_individual(individual &individual, int length_limit, int depth_limit) {
  char16_t primitive = random.next_int(2);
  int size = individual.size();

  if (size >= length_limit) {
    return true;
  }

  if (size == 0) {
    primitive = 1;
  }

  if (primitive == 0 || depth_limit == 0) {
    primitive = (char16_t)random.next_int(constant_count + variable_count);
    individual.push_back(primitive);

    return false;
  }
  else {
    primitive = (char16_t)(random.next_int(FUNCTION_SET_END - FUNCTION_SET_START + 1) + FUNCTION_SET_START);
    individual.push_back(primitive);

    int child = grow_individual(individual, length_limit, depth_limit - 1);

    return child < 0
      ? true
      : grow_individual(individual, length_limit, depth_limit - 1);
  }
}
