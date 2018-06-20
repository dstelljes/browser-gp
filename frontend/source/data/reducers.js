import { CREATE_RUN, CREATE_SOLUTION, TOGGLE_MENU } from './actions'
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
            return
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

    case TOGGLE_MENU:
      return { ...state,
        ui: { ...state.ui,
          menuExpanded: !state.ui.menuExpanded
        }
      }

    default:
      return state
  }
}
