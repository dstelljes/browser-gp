import { CREATE_SOLUTION } from '../data/actions'

const initialState = {
  solutions: {},
  ui: {
    menuExpanded: true
  }
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SOLUTION:
      return { ...state,
        solutions: { ...state.solutions,
          [action.id]: {
            engine: action.engine
          }
        }
      }

    default:
      return state
  }
}
