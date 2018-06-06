#include <algorithm>
#include <cmath>
#include <numeric>
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
    population.push_back(score_program(create_random_program(depth_limit)));
  }
}

double TinyGP::calculate_fitness(const program &program) const {
  double result = 0;

  for (auto c : cases) {
    result += std::abs(run_program(program, c) - c[c.size() - 1]);
  }

  return result;
}

bool TinyGP::evolve() {
  // the stats function in the Java version asks for an int, so do it here for
  // compatibility:
  random.next_int(population.size());

  if (get_best_fitness() < SUCCESS_THRESHOLD) {
    return false;
  }

  if (generation >= generation_limit - 1) {
    return false;
  }

  for (int i = 0; i < population.size(); i++) {
    program n;

    if (random.next_double() < crossover_probability) {
      program a = population[select_fit_index()].second;
      program b = population[select_fit_index()].second;

      n = combine(a, b);
    }
    else {
      n = mutate(population[select_fit_index()].second);
    }

    population[select_unfit_index()] = score_program(n);
  }

  generation++;
  return true;
}

double TinyGP::get_average_fitness() const {
  return std::accumulate(population.begin(), population.end(), 0.0, [](double r, scored_program p) {
    return r + p.first;
  }) / (double)population.size();
}

double TinyGP::get_average_length() const {
  return std::accumulate(population.begin(), population.end(), 0, [](int r, scored_program p) {
    return r + p.second.size();
  }) / (double)population.size();
}

double TinyGP::get_best_fitness() const {
  return (*std::min_element(population.begin(), population.end())).first;
}

program TinyGP::get_best_program() const {
  return (*std::min_element(population.begin(), population.end())).second;
}

int TinyGP::get_generation() const {
  return generation;
}

std::vector<program> TinyGP::get_population() const {
  std::vector<program> result(population.size());

  std::transform(population.begin(), population.end(), result.begin(), [](scored_program p) {
    return p.second;
  });

  return result;
}

program TinyGP::combine(const program &a, const program &b) {
  program n = a;

  int position = random.next_int(a.size());
  int graft = random.next_int(b.size());

  n.erase(n.begin() + position, n.begin() + position + get_subtree_size(n, position));
  n.insert(n.begin() + position, b.begin() + graft, b.begin() + graft + get_subtree_size(b, graft));

  return n;
}

program TinyGP::create_random_program(int depth_limit) {
  program result = {};

  while (grow_program(result, length_limit, depth_limit));

  return result;
}

int TinyGP::get_subtree_size(const program &program, int root) {
  int count = 0, end = root;

  do {
    count += program[end] < FUNCTION_SET_START ? -1 : 1;
    end++;
  } while (count > -1);

  return end - root;
}

bool TinyGP::grow_program(program &program, int length_limit, int depth_limit) {
  uint8_t primitive = random.next_int(2);
  int size = program.size();

  if (size >= length_limit) {
    return true;
  }

  if (size == 0) {
    primitive = 1;
  }

  if (primitive == 0 || depth_limit == 0) {
    primitive = random.next_int(constant_count + variable_count);
    program.push_back(primitive);

    return false;
  }
  else {
    primitive = random.next_int(FUNCTION_SET_END - FUNCTION_SET_START + 1) + FUNCTION_SET_START;
    program.push_back(primitive);

    int child = grow_program(program, length_limit, depth_limit - 1);

    return child < 0
      ? true
      : grow_program(program, length_limit, depth_limit - 1);
  }
}

program TinyGP::mutate(const program &a) {
  program n = a;

  for (int i = 0; i < n.size(); i++) {
    if (random.next_double() < mutation_probability) {
      n[i] = n[i] < FUNCTION_SET_START
        ? random.next_int(constant_count + variable_count)
        : random.next_int(FUNCTION_SET_END - FUNCTION_SET_START + 1) + FUNCTION_SET_START;
    }
  }

  return n;
}

double TinyGP::run_program(const program &program, const test_case &test_case) const {
  std::stack<double> stack;

  for (int i = program.size(); i-- > 0;) {
    uint8_t primitive = program[i];

    if (program[i] < FUNCTION_SET_START) {
      stack.push(primitive < variable_count ? test_case[primitive] : constants[primitive]);
      continue;
    }

    double a = stack.top(); stack.pop();
    double b = stack.top(); stack.pop();

    switch (program[i]) {
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

std::pair<double, program> TinyGP::score_program(const program &program) const {
  return std::make_pair(calculate_fitness(program), program);
}

int TinyGP::select_fit_index() {
  double min = 100000;
  int result = random.next_int(population.size());

  for (int i = 0; i < tournament_size; i++) {
    int competitor = random.next_int(population.size());
    double fitness = population[competitor].first;

    if (min > fitness) {
      min = fitness;
      result = competitor;
    }
  }

  return result;
}

int TinyGP::select_unfit_index() {
  double max = -1;
  int result = random.next_int(population.size());

  for (int i = 0; i < tournament_size; i++) {
    int competitor = random.next_int(population.size());
    double fitness = population[competitor].first;

    if (max < fitness) {
      max = fitness;
      result = competitor;
    }
  }

  return result;
}
