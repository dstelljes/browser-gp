#include <emscripten/bind.h>

#include "tinygp.h"

EMSCRIPTEN_BINDINGS(tinygp) {
  emscripten::register_vector<individual>("IndividualVector");
  emscripten::register_vector<test_case>("TestCaseVector");

  emscripten::value_object<parameters>("Parameters")
    .field("constantCount", &parameters::constant_count)
    .field("constantMaximum", &parameters::constant_maximum)
    .field("constantMinimum", &parameters::constant_minimum)
    .field("crossoverProbability", &parameters::crossover_probability)
    .field("depthLimit", &parameters::depth_limit)
    .field("generationLimit", &parameters::generation_limit)
    .field("lengthLimit", &parameters::length_limit)
    .field("mutationProbability", &parameters::mutation_probability)
    .field("populationSize", &parameters::population_size)
    .field("tournamentSize", &parameters::tournament_size)
    .field("variableCount", &parameters::variable_count);

  emscripten::class_<TinyGP>("TinyGP")
    .constructor<std::vector<test_case>, parameters, long>()
    .property("averageFitness", &TinyGP::get_average_fitness)
    .property("averageLength", &TinyGP::get_average_length)
    .property("bestFitness", &TinyGP::get_best_fitness)
    .property("bestIndividual", &TinyGP::get_best_individual)
    .property("generation", &TinyGP::get_generation)
    .property("population", &TinyGP::get_population)
    .function("calculateFitness", &TinyGP::calculate_fitness)
    .function("evolve", &TinyGP::evolve);
}
