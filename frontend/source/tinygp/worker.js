/* eslint-env worker */

import binding from 'engines/tinygp/wasm/binding.cpp'

import { COMPLETION, GENERATION, INITIALIZATION } from './messages'

const module = binding.initialize()

const run = (cases, parameters, seed) => {
  module.then(({ TestCase, TestCaseVector, TinyGP }) => {
    cases = cases.reduce((cv, c) => {
      cv.push_back(c.reduce((dv, d) => {
        dv.push_back(d)
        return dv
      }, new TestCase()))
      return cv
    }, new TestCaseVector())

    parameters = Object.assign({
      constantCount: 4,
      constantMaximum: 5,
      constantMinimum: -5,
      crossoverProbability: 0.9,
      depthLimit: 5,
      generationLimit: 100,
      lengthLimit: 10000,
      mutationProbability: 0.05,
      populationSize: 100000,
      tournamentSize: 2,
      variableCount: 1
    }, parameters)

    const gp = new TinyGP(cases, parameters, seed)

    do {
      postMessage({
        averageFitness: gp.averageFitness,
        averageLength: gp.averageLength,
        bestFitness: gp.bestFitness,
        generation: gp.generation,
        type: GENERATION
      })
    }
    while (gp.evolve())

    postMessage({
      type: COMPLETION
    })
  })
}

self.addEventListener('message', ({ data }) => {
  switch (data.type) {
    case INITIALIZATION:
      run(data.cases, data.parameters, data.seed)
      break
  }
})
