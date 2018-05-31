#pragma once

#include <vector>

#include "random.h"

using individual = std::vector<char16_t>;
using test_case = std::vector<double>;

/**
 * All parameters needed for a TinyGP run.
 */
struct parameters {

  /** The number of random constants to generate. */
  int constant_count;

  /** The maximum value of a random constant. */
  int constant_maximum;

  /** The minimum value of a random constant. */
  int constant_minimum;

  /** The probability of creating a new individual by crossover. */
  double crossover_probability;

  /** The maximum allowed depth of a generated individual. */
  int depth_limit;

  /** The maximum number of generations allowed. */
  int generation_limit;

  /** The maximum allowed length of any individual. */
  int length_limit;

  /** The point mutation probability. */
  double mutation_probability;

  /** The size of the population. */
  int population_size;

  /** The size of the tournament. */
  int tournament_size;

  /** The number of variables in a test case. */
  int variable_count;

};

/**
 * A TinyGP run.
 */
class TinyGP {
public:

  /**
   * Initializes a run.
   * 
   * @param cases
   * The test cases used to rate the fitness of an individual.
   * 
   * @param parameters
   * The run parameters.
   * 
   * @param seed
   * An optional random seed. If less than 0, a seed will be generated.
   */
  TinyGP(const std::vector<test_case> &cases, const parameters &parameters, long seed = -1);

  /**
   * Calculates the fitness of an individual.
   * 
   * @return
   * The sum of the absolute differences between the individual output and the
   * desired output.
   */
  double calculate_fitness(const individual &individual) const;

  /**
   * Evolves a generation.
   * 
   * @return
   * Whether another generation was able to be evolved (i.e., if the maximum
   * number of generations had not been reached or the problem had not been
   * solved).
   */
  bool evolve();

  /**
   * @return
   * The average fitness score of the population.
   */
  double get_average_fitness() const;

  /**
   * @return
   * The average length of the population.
   */
  double get_average_length() const;

  /**
   * @return
   * The individual with the best fitness score.
   */
  individual get_best_individual() const;

  /**
   * @return
   * The current generation.
   */
  int get_generation() const;

  /**
   * @return
   * Individuals in the population.
   */
  std::vector<individual> get_population() const;

private:
  enum operations { add = 110, subtract, multiply, divide };

  static const int FUNCTION_SET_START = operations::add;
  static const int FUNCTION_SET_END = operations::divide;

  int constant_count;
  double crossover_probability;
  int depth_limit;
  int generation_limit;
  int length_limit;
  double mutation_probability;
  int population_size;
  int tournament_size;
  int variable_count;

  int generation = 0;

  std::vector<test_case> cases;
  std::vector<double> constants = {};
  std::vector<individual> population = {};

  Random random;

  individual create_random_individual(int depth_limit);
  bool grow_individual(individual &individual, int length_limit, int depth_limit);
};
