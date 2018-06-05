#pragma once

#include <stdint.h>

/**
 * A pseudorandom number generator compatible with java.util.Random.
 */
class Random {
public:

  /**
   * Creates a new random number generator without specifying a seed.
   */
  Random();

  /**
   * Creates a new random number generator.
   * 
   * @param seed
   * The seed value.
   */
  Random(long seed);

  /**
   * @return
   * A pseudorandom, uniformly distributed double value in [0.0, 1.0).
   */
  double next_double();

  /**
   * @return
   * A pseudorandom, uniformly distributed int value.
   */
  int next_int();

  /**
   * @return
   * A pseudorandom, uniformly distributed int value in [0, bound).
   */
  int next_int(int bound);

  /**
   * @return
   * A pseudoranom, uniformly distributed long value.
   */
  long next_long();

private:
  static const uint64_t ADDEND = 11ULL;
  static const uint64_t MASK = (1ULL << 48) - 1;
  static const uint64_t MULTIPLIER = 25214903917ULL;

  static uint64_t get_seed_uniquifier();
  static uint64_t scramble(uint64_t seed);

  uint64_t seed;

  uint32_t next(uint32_t bits);
  void set_seed(uint64_t seed);
};
