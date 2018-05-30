#pragma once

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
  Random(unsigned long seed);

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

  /**
   * @param
   * The new seed for the random number generator.
   */
  void set_seed(unsigned long seed);

private:
  static const unsigned long ADDEND = 11L;
  static const unsigned long MASK = (1L << 48) - 1;
  static const unsigned long MULTIPLIER = 25214903917L;

  static unsigned long get_seed_uniquifier();
  static unsigned long scramble(unsigned long seed);

  unsigned long seed;

  int next(int bits);
};
