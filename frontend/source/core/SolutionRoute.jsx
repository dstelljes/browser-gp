import React from 'react'

import { connect } from '../utilities/router'

const mapStateToProps = state => {
  return {
    solutions: state.solutions
  }
}

export const SolutionRoute = connect(
  mapStateToProps,
  undefined
)(function ({ match, solutions }) {
  const solution = solutions[match.params.id]

  return (
    <div>
      <h2>Solution</h2>
      Type: {solution.engine}
    </div>
  )
})
