import { CREATE_RUN, CREATE_SOLUTION, REPORT_GENERATION, SET_RUNNER_ACTIVE, SET_RUNNER_FAILED, SET_RUNNER_FINISHED, TOGGLE_MENU, UPDATE_PARAMETERS } from './actions'
import { defaultParameters as tinygpDefaults } from '../tinygp/constants'

const initialState = {
  solutions: [],
  ui: {
    menuExpanded: false
  }
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RUN:
      return { ...state,
        solutions: state.solutions.map(solution => {
          if (solution.id !== action.solution) {
            return solution
          }

          const run = {
            created: new Date()
          }

          if (solution.engine === 'tinygp') {
            run.generations = []
            run.parameters = { ...tinygpDefaults }
            run.runner = null
          }

          return { ...solution,
            runs: [ ...solution.runs,
              run
            ]
          }
        })
      }

    case CREATE_SOLUTION:
      return { ...state,
        solutions: [ ...state.solutions,
          {
            created: new Date(),
            engine: action.engine,
            id: action.id,
            name: '',
            runs: []
          }
        ]
      }

    case REPORT_GENERATION:
      return { ...state,
        solutions: state.solutions.map(solution => {
          if (solution.id !== action.solution) {
            return solution
          }

          return { ...solution,
            runs: solution.runs.map((run, index) => {
              if (index !== action.run) {
                return run
              }

              return { ...run,
                generations: [ ...run.generations,
                  {
                    averageFitness: action.averageFitness,
                    averageLength: action.averageLength,
                    bestFitness: action.bestFitness
                  }
                ]
              }
            })
          }
        })
      }

    case SET_RUNNER_ACTIVE:
      return { ...state,
        solutions: state.solutions.map(solution => {
          if (solution.id !== action.solution) {
            return solution
          }

          return { ...solution,
            runs: solution.runs.map((run, index) => {
              if (index !== action.run) {
                return run
              }

              return { ...run,
                generations: [],
                runner: {
                  error: null,
                  subscription: action.subscription
                }
              }
            })
          }
        })
      }

    case SET_RUNNER_FAILED:
      return { ...state,
        solutions: state.solutions.map(solution => {
          if (solution.id !== action.solution) {
            return solution
          }

          return { ...solution,
            runs: solution.runs.map((run, index) => {
              if (index !== action.run) {
                return run
              }

              return { ...run,
                runner: { ...run.runner,
                  error: action.error,
                  subscription: null
                }
              }
            })
          }
        })
      }

    case SET_RUNNER_FINISHED:
      return { ...state,
        solutions: state.solutions.map(solution => {
          if (solution.id !== action.solution) {
            return solution
          }

          return { ...solution,
            runs: solution.runs.map((run, index) => {
              if (index !== action.run) {
                return run
              }

              return { ...run,
                runner: { ...run.runner,
                  error: null,
                  subscription: null
                }
              }
            })
          }
        })
      }

    case TOGGLE_MENU:
      return { ...state,
        ui: { ...state.ui,
          menuExpanded: !state.ui.menuExpanded
        }
      }

    case UPDATE_PARAMETERS:
      return { ...state,
        solutions: state.solutions.map(solution => {
          if (solution.id !== action.solution) {
            return solution
          }

          return { ...solution,
            runs: solution.runs.map((run, index) => {
              if (index !== action.run) {
                return run
              }

              return { ...run,
                parameters: action.value
              }
            })
          }
        })
      }

    default:
      return state
  }
}
