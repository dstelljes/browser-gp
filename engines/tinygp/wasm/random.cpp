#include <chrono>

#include "random.h"

Random::Random() {
  using namespace std::chrono;

  long now = high_resolution_clock::now().time_since_epoch().count();
  long seed = get_seed_uniquifier() ^ now;

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

int Random::next_int(int bound) {
  int r = next(31);
  int m = bound - 1;

  if ((bound & m) == 0) {
    r = (bound * (long)r) >> 31;
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
  return (seed ^ MULTIPLIER) & MASK;
}

int Random::next(int bits) {
  seed = (seed * MULTIPLIER + ADDEND) & MASK;
  return seed >> (48 - bits);
}
