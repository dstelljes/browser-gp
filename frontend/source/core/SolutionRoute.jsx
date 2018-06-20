import React from 'react'

import { PageTitle } from '../core/PageTitle'
import { CREATE_RUN } from '../data/actions'
import { connect } from '../utilities/router'

const mapDispatchToProps = dispatch => {
  return {
    createRun: solution => () => dispatch({
      solution: solution,
      type: CREATE_RUN
    })
  }
}

const mapStateToProps = state => {
  return {
    solutions: state.solutions
  }
}

export const SolutionRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(function ({ createRun, match, solutions }) {
  const solution = solutions.find(s => s.id === match.params.id)

  if (!solution) {
    return (
      <main>
        <PageTitle>Invalid solution</PageTitle>

        <p>
          The solution could not be loaded. (Currently, solutions don’t survive
          a reload.)
        </p>
      </main>
    )
  }

  switch (solution.engine) {
    case 'tinygp':
      return (
        <main>
          <PageTitle>
            {solution.name || 'Untitled solution'}
          </PageTitle>

          {solution.runs.map((run, index) =>
            <section>
              <h2>Run {index}</h2>
            </section>
          )}

          <button onClick={createRun(solution.id)}>
            Create a new run
          </button>
        </main>
      )

    default:
      return (
        <main>
          <PageTitle>Invalid solution</PageTitle>

          <p>
            This solution is a <strong>{solution.engine}</strong> solution,
            which isn’t supported by this app.
          </p>
        </main>
      )
  }
})
