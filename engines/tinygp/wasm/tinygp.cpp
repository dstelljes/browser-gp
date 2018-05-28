#include "tinygp.h"

TinyGP::TinyGP(std::vector<test_case> cases, parameters parameters, long seed) :
  crossover_probability(parameters.crossover_probability),
  depth_limit(parameters.depth_limit),
  generation_limit(parameters.generation_limit),
  length_limit(parameters.length_limit),
  mutation_probability(parameters.mutation_probability),
  population_size(parameters.population_size),
  tournament_size(parameters.tournament_size)
{

}

double TinyGP::calculate_fitness(individual individual) const {
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
  return this->generation;
}

std::vector<individual> TinyGP::get_population() const {
  return this->population;
};
