import { combineReducers } from 'redux'

import { CREATE_SOLUTION } from './actions'

const initialNavigationState = {
  menuExpanded: true
}

const initialSolutionState = {
  library: {}
}

export const navigationReducer = (state = initialNavigationState, action) => {
  switch (action) {
    default:
      return state
  }
}

export const solutionReducer = (state = initialSolutionState, action) => {
  switch (action.type) {
    case CREATE_SOLUTION:
      return Object.assign({}, state, {
        library: Object.assign({}, state.library, {
          [action.id]: {
            engine: action.engine
          }
        })
      })

    default:
      return state
  }
}

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  solution: solutionReducer
})
