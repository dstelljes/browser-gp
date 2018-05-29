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
   * A pseudoranom, uniformly distributed long value.
   */
  long next_long();

  /**
   * @param
   * The new seed for the random number generator.
   */
  void set_seed(unsigned long seed);

private:
  const static unsigned long addend = 11L;
  const static unsigned long mask = (1L << 48) - 1;
  const static unsigned long multiplier = 25214903917L;

  unsigned static long get_seed_uniquifier();
  unsigned static long scramble(unsigned long seed);

  unsigned long seed;

  int next(int bits);
};
