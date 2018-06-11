import React from 'react'
import { Redirect } from 'react-router-dom'

import { createRandomId } from '../utilities/id'
import { connect } from '../utilities/router'

import { CREATE_SOLUTION } from './actions'

const mapDispatchToProps = dispatch => {
  return {
    createSolution: engine => {
      const id = createRandomId(4)

      dispatch({
        engine: engine,
        id: id,
        type: CREATE_SOLUTION
      })

      return id
    }
  }
}

export const NewSolutionRoute = connect(
  undefined,
  mapDispatchToProps
)(function ({ createSolution, match }) {
  return (
    <Redirect to={`/solution/${createSolution(match.params.engine)}`} />
  )
})
