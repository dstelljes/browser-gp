#include <chrono>

#include "random.h"

Random::Random() {
  using namespace std::chrono;

  uint64_t now = high_resolution_clock::now().time_since_epoch().count();
  uint64_t seed = get_seed_uniquifier() ^ now;

  set_seed(seed);
}

Random::Random(long seed) {
  set_seed(seed);
}

double Random::next_double() {
  return (((uint64_t)(next(26)) << 27) + next(27)) / (double)(1ULL << 53);
}

int Random::next_int() {
  return next(32);
}

int Random::next_int(int bound) {
  int r = next(31);
  int m = bound - 1;

  if ((bound & m) == 0) {
    r = (bound * (uint64_t)r) >> 31;
  }
  else {
    int u = r;

    while (u - (r = u % bound) + m < 0) {
      u = next(31);
    }
  }

  return r;
}

long Random::next_long() {
  return ((uint64_t)next(32) << 32) + next(32);
}

uint64_t Random::get_seed_uniquifier() {
  static uint64_t uniquifier = 8682522807148012ULL;
  return uniquifier *= 181783497276652981ULL;
}

uint64_t Random::scramble(uint64_t seed) {
  return (seed ^ MULTIPLIER) & MASK;
}

uint32_t Random::next(uint32_t bits) {
  seed = (seed * MULTIPLIER + ADDEND) & MASK;
  return seed >> (48 - bits);
}

void Random::set_seed(uint64_t seed) {
  this->seed = scramble(seed);
}
