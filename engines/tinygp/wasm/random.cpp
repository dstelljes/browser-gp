#include <chrono>

#include "random.h"

Random::Random() {
  using namespace std::chrono;

  long now = high_resolution_clock::now().time_since_epoch().count();
  long seed = this->get_seed_uniquifier() ^ now;

  set_seed(seed);
}

Random::Random(unsigned long seed) {
  set_seed(seed);
}

double Random::next_double() {
  return (((long)(next(26)) << 27) + next(27)) / (double)(1L << 53);
}

int Random::next_int() {
  return next(32);
}

long Random::next_long() {
  return ((long)next(32) << 32) + next(32);
}

void Random::set_seed(unsigned long seed) {
  this->seed = scramble(seed);
}

unsigned long Random::get_seed_uniquifier() {
  static unsigned long uniquifier = 8682522807148012L;
  return uniquifier *= 181783497276652981L;
}

unsigned long Random::scramble(unsigned long seed) {
  return (seed ^ multiplier) & mask;
}

int Random::next(int bits) {
  seed = (seed * multiplier + addend) & mask;
  return seed >> (48 - bits);
}
