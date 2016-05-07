#!/usr/bin/python

import math

size = 250

for i in range(-size, size):
  x = math.pi * i / size
  print x, math.sin(x)
