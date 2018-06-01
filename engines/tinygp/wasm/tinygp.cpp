#include <cmath>
#include <stack>

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
  double result = 0;

  for (auto c : cases) {
    result -= std::abs(run_individual(individual, c) - c[0]);
  }

  return result;
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
  uint8_t primitive = random.next_int(2);
  int size = individual.size();

  if (size >= length_limit) {
    return true;
  }

  if (size == 0) {
    primitive = 1;
  }

  if (primitive == 0 || depth_limit == 0) {
    primitive = random.next_int(constant_count + variable_count);
    individual.push_back(primitive);

    return false;
  }
  else {
    primitive = random.next_int(FUNCTION_SET_END - FUNCTION_SET_START + 1) + FUNCTION_SET_START;
    individual.push_back(primitive);

    int child = grow_individual(individual, length_limit, depth_limit - 1);

    return child < 0
      ? true
      : grow_individual(individual, length_limit, depth_limit - 1);
  }
}

double TinyGP::run_individual(const individual &individual, const test_case &test_case) const {
  std::stack<double> stack;

  for (int i = individual.size(); i-- > 0;) {
    uint8_t primitive = individual[i];

    if (individual[i] < FUNCTION_SET_START) {
      stack.push(primitive < variable_count ? test_case[primitive + 1] : constants[primitive]);
      continue;
    }

    double a = stack.top(); stack.pop();
    double b = stack.top(); stack.pop();

    switch (individual[i]) {
      case operations::add:
        stack.push(a + b);
        break;

      case operations::subtract:
        stack.push(a - b);
        break;

      case operations::multiply:
        stack.push(a * b);
        break;

      case operations::divide:
        stack.push(std::abs(b) <= 0.001 ? a : a / b);
        break;

      default:
        throw;
    }
  }

  return stack.top();
}
