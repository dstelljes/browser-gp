export const COMPLETION = 'COMPLETION'
export const GENERATION = 'GENERATION'
export const INITIALIZATION = 'INITIALIZATION'

export const defaultParameters = {
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
}
